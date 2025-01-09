import React, { useContext, useEffect, useRef, useState } from 'react'
import logo from '../assets/images/logo.png'
import map from '../assets/images/map.gif'
import exit from '../assets/images/exit.png'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import RidePanel from '../components/RidePanel'
import CaptainDetails from '../components/CaptainDetails'
import gsap from 'gsap'
import axios from 'axios';

import ConfirmRidePanel from '../components/ConfirmRidePanel'
import OTP from '../components/OTP'
import { SocketContext } from '../context/SocketContext'
import { CaptainDataContext } from '../context/CaptainContext'
import LiveTracking from '../components/LiveTracking'

function CaptainHome() {


  const [ridePanel, setRidePanel] = useState(false)
  const [confirmRidePanel, setConfirmRidePanel] = useState(false)
  const [ride, setRide] = useState(null)

  const ridePanelRef = useRef(null)
  const confirmRidePanelRef = useRef(null)

  const { socket } = useContext(SocketContext)
  const { captain } = useContext(CaptainDataContext)

  useEffect(() => {
    socket.emit('join', {
      userId: captain._id,
      userType: 'captain'
    })
    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {

          console.log('userId : ', captain._id, ' location : ',
            'ltd:', position.coords.latitude,
            'lng:', position.coords.longitude
          )

          socket.emit('update-location-captain', {
            userId: captain._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude
            }
          })
        })
      }
    }

    const locationInterval = setInterval(updateLocation, 10000)
    updateLocation()

    socket.on('new-ride', (data) => {
      console.log('New ride received:', data); // Log ride data when received
      setRide(data);           // Store the ride in state
      setRidePanel(true);      
    });

    // return () => clearInterval(locationInterval)
  }, [socket, captain._id])

  useGSAP(function () {
    if (ridePanel) {
      gsap.to(ridePanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(ridePanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [ridePanel])


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


  async function confirmRide() {

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/ride/confirm`, {

      rideId: ride._id,
      captainId: captain._id,

    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })

    setRidePanel(false)
    setConfirmRidePanel(true)

  }


  return (
    <div className='h-screen'>

      <Link to='/captain-login' className='fixed  right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
        <img src={exit} alt="" />
      </Link>

      <div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
        <img className='w-16' src={logo} alt="" />

      </div>
      <div className='h-3/5'>
        <LiveTracking />
      </div>

      <div className='fixed w-full z-10 bottom-0  bg-white  p-5  '>
        <CaptainDetails />
      </div>


      <div ref={ridePanelRef} className='fixed w-full  translate-y-full e z-10 bottom-0  bg-white  p-5  '>
        <RidePanel
          ride={ride}
          setRidePanel={setRidePanel}
          setConfirmRidePanel={setConfirmRidePanel} 
          confirmRide={confirmRide}
          />
      </div>

      <div ref={confirmRidePanelRef} className='fixed w-full  h-screen e z-10 bottom-0  bg-white p-5  '>
        <OTP
        ride={ride}
        setConfirmRidePanel={setConfirmRidePanel} 
        setRidePanel={setRidePanel} />
      </div>
    </div>

  )
}

export default CaptainHome