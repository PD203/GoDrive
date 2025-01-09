import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import logo from '../assets/images/logo.png'
import person from '../assets/images/person.png'
import map from '../assets/images/map.gif'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import axios from 'axios';
import arrowdown from '../assets/images/arrowdown.png'
import LocationSearchPanel from '../components/LocationSearchPanel'
import VehiclePanel from '../components/VehiclePanel'
import LookingForRider from '../components/LookingForRider'
import ConfirmRidePanel from '../components/ConfirmRidePanel'
import WaitingforRider from '../components/WaitingforRider'
import { SocketContext } from '../context/SocketContext'
import { Link, useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext'
import LiveTracking from '../components/LiveTracking'

function UserHome() {

  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [panelOpen, setPanelOpen] = useState(false)
  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)
  const [vehiclePanel, setVehiclePanels] = useState(false)
  const vehiclePanelRef = useRef(null)
  const vehicleFoundRef = useRef(null)
  const [confirmRidePanel, setConfirmRidePanel] = useState(false)
  const confirmRidePanelRef = useRef(null)
  const [vehicleFound, setVehicleFound] = useState(false)
  const [waitingForDriver, setWaitingForDriver] = useState(false)
  const waitingForDriverRef = useRef(null)
  const [pickupSuggestions, setPickupSuggestions] = useState([])
  const [destinationSuggestions, setDestinationSuggestions] = useState([])
  const [activeField, setActiveField] = useState(null)
  const [fare, setFare] = useState({})
  const [vehicleType, setVehicleType] = useState(null)
  const [ride, setRide] = useState(null)
  const timeoutRefPickup = useRef(null);
  const timeoutRefDestination = useRef(null);
  const [rideConfirmed, setRideConfirmed] = useState(false);
  const [captainLocation, setCaptainLocation] = useState(null);

  const navigate = useNavigate()

  const { socket } = useContext(SocketContext)
  const { user } = useContext(UserDataContext)

  useEffect(() => {
    socket.emit("join", { userType: "user", userId: user._id })
  }, [user])

  socket.on('ride-confirmed', ride => {
    console.log('Ride confirmed:', ride);
    setRideConfirmed(true);
    setVehicleFound(false)
    setWaitingForDriver(true)
    setRide(ride)
    setCaptainLocation(ride.captainLocation);
  })

  socket.on('captain-location', (data) => {
    setCaptainLocation(data.location);
  });

  socket.on('ride-started', ride => {
    console.log("ride")
    setWaitingForDriver(false)
    navigate('/riding', { state: { ride } })
  })


  const handlePickupChange = useCallback((e) => {
    const value = e.target.value;
    setPickup(value);

    if (timeoutRefPickup.current) {
      clearTimeout(timeoutRefPickup.current);
    }

    timeoutRefPickup.current = setTimeout(async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
          params: { input: value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setPickupSuggestions(response.data);
      } catch (error) {
        console.error('Error fetching pickup suggestions:', error);
      }
    }, 1000);
  }, []);


  const handleDestinationChange = useCallback((e) => {
    const value = e.target.value;
    setDestination(value);

    if (timeoutRefDestination.current) {
      clearTimeout(timeoutRefDestination.current);
    }

    timeoutRefDestination.current = setTimeout(async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
          params: { input: value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setDestinationSuggestions(response.data);
      } catch (error) {
        console.error('Error fetching destination suggestions:', error);
      }
    }, 1000);
  }, []);


  const submitHandler = (e) => {
    e.preventDefault()
    console.log('Form submitted')
  }


  useGSAP(function () {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: '70%',
        padding: 24
      })
      gsap.to(panelCloseRef.current, {
        opacity: 1
      })
    } else {
      gsap.to(panelRef.current, {
        height: '0%',
        padding: 0
      })
      gsap.to(panelCloseRef.current, {
        opacity: 0
      })
    }
  }, [panelOpen])


  useGSAP(function () {
    if (vehiclePanel) {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [vehiclePanel])



  useGSAP(function () {
    if (confirmRidePanel) {
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [confirmRidePanel])


  useGSAP(function () {
    if (vehicleFound) {
      gsap.to(vehicleFoundRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(vehicleFoundRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [vehicleFound])


  useGSAP(function () {
    if (waitingForDriver) {
      gsap.to(waitingForDriverRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(waitingForDriverRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [waitingForDriver])


  async function findTrip() {
    setVehiclePanels(true)
    setPanelOpen(false)

    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/ride/get-fare`, {
      params: { pickup, destination },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    setFare(response.data)
    console.log('Fare:', response.data);
  }

  async function createRide() {
    console.log({ pickup, destination, vehicleType })

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/ride/create`, {
      pickup,
      destination,
      vehicleType

    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })

    console.log(response.data)
  }

  return (
    <div className='h-screen relative overflow-hidden'>

      <div onClick={() => { vehiclePanel(false) }} className='h-screen w-screen'>
        <LiveTracking captainLocation={captainLocation} rideConfirmed={rideConfirmed} />
      </div>

      <img className='w-16 ml-3 absolute top-14' src={logo} alt="" />

      <div className=' flex flex-col justify-end h-screen absolute top-0 w-full'>
        <Link to='/profile'>
          <img className='absolute top-16 right-3 bg-white p-1 rounded-full cursor-pointer' src={person} alt="" />
        </Link>
        <div className='h-[30%] p-6 bg-white relative'>

          <img ref={panelCloseRef} onClick={() => { setPanelOpen(false) }} className='absolute opacity-0 top-7 right-5' src={arrowdown} alt="" />

          <h4 className='text-2xl font-semibold'>Find a trip</h4>
          <form onSubmit={(e) => { submitHandler(e) }} action="">
            <div className="line absolute h-14 w-1 top-[65%] -translate-y-1/2 left-10 bg-gray-700 rounded-full"></div>
            <input
              onClick={() => {
                setPanelOpen(true)
                setActiveField('pickup')
              }}
              value={pickup}
              onChange={handlePickupChange}
              className='bg-[#eeee] px-12 py-2 text-lg rounded-lg w-full mt-5'
              type="text"
              placeholder='Add a pick-up location' />
            <input
              onClick={() => {
                setPanelOpen(true)
                setActiveField('destination')
              }}
              value={destination}
              onChange={handleDestinationChange}
              className='bg-[#eeee] px-12 py-2 text-lg rounded-lg w-full mt-3'
              type="text"
              placeholder='Enter your Destination' />
          </form>
          <button
            onClick={findTrip}
            className='bg-black text-white px-4 py-2 rounded-lg mt-3 w-full'>
            Find Trip
          </button>
        </div>
        <div ref={panelRef} className='h-[70%] bg-white p-5 '>
          <LocationSearchPanel
            suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
            activeField={activeField}
            setActiveField={setActiveField}
            setPickup={setPickup}
            setDestination={setDestination}
          />

        </div>
      </div>

      <div ref={vehiclePanelRef} className='fixed w-full z-10 bottom-0  bg-white p-3 translate-y-full'>
        <VehiclePanel
          fare={fare}
          selectVehicle={setVehicleType}
          setVehiclePanels={setVehiclePanels}
          setConfirmRidePanel={setConfirmRidePanel} />
      </div>


      <div ref={confirmRidePanelRef} className='fixed w-full z-10 bottom-0  bg-white p-3 translate-y-full'>
        <ConfirmRidePanel
          createRide={createRide}
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
          setConfirmRidePanel={setConfirmRidePanel}
          setVehicleFound={setVehicleFound} />
      </div>

      <div ref={vehicleFoundRef} className='fixed w-full z-10 bottom-0  bg-white p-3 translate-y-full'>
        <LookingForRider
          createRide={createRide}
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
          setVehicleFound={setVehicleFound}
        />
      </div>


      <div ref={waitingForDriverRef} className='fixed w-full  z-10 bottom-0  bg-white  p-5  '>
        <WaitingforRider
          ride={ride}
          setVehicleFound={setVehicleFound}
          setWaitingForDriver={setWaitingForDriver}
          waitingForDriver={waitingForDriver}
        />
      </div>

    </div>
  )
}

export default UserHome