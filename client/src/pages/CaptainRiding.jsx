import React, { useRef, useState } from 'react'
import logo from '../assets/images/logo.png'
import map from '../assets/images/map.gif'
import exit from '../assets/images/exit.png'
import { Link, useLocation } from 'react-router-dom'
import arrowUp from '../assets/images/arrowUp.png'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import FinishRide from '../components/FinishRide'
import LiveTracking from '../components/LiveTracking'


function CaptainRiding() {

  const [finishRidePanel, setFinishRidePanel] = useState(false)
  const finishRidePanelRef = useRef(null)
  const location = useLocation()
  const rideData = location.state?.ride

  useGSAP(function () {
    if (finishRidePanel) {
      gsap.to(finishRidePanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(finishRidePanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [finishRidePanel])

  return (
    <div className='h-screen relative'>

      <Link to='/captain-home' className='fixed  right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
        <img src={exit} alt="" />
      </Link>

      <div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
        <img className='w-16' src={logo} alt="" />
      </div>
      <div className='h-4/5'>
        <LiveTracking />
      </div>

      <div className='h-1/5 py-2 px-6 bg-yellow-500  '>

        <div className='w-fullp-2 mb-3 flex justify-center'>
          <img onClick={() => { setFinishRidePanel(true) }} className='h-8 w-8' src={arrowUp} alt="" />
        </div>
        <div className='flex items-center justify-between'>
          <h4 className='text-xl font-semibold'>4 KM away</h4>
          <button className=' bg-green-600 flex justify-center text-white font-semibold p-2 px-10 rounded-lg'>Complete Ride</button>
        </div>

      </div>

      <div ref={finishRidePanelRef} className='fixed w-full  z-[500] bottom-0 translate-y-full bg-white p-5'>
        <FinishRide ride={rideData} setFinishRidePanel={setFinishRidePanel} />
      </div>

    </div>
  )
}

export default CaptainRiding