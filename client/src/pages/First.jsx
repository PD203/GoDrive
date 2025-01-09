import React from 'react'
import logo from '../assets/images/logo.png'
import hero from '../assets/images/hero.gif'
import { Link } from 'react-router-dom'

function First() {
  return (
    <div>
      <div className=' h-screen pt-8 flex  justify-between flex-col w-full'>
        <img className="absolute bottom-5 top-0 left-0 w-full h-full object-cover -z-10 md:hidden lg:hidden" src={hero} alt="Hero Background" />
        <img className='w-20 ml-8 lg:w-24 lg:ml-12' src={logo} alt="" />
        <div className='bg-white py-4 px-4  md:ml-8 lg:ml-8 lg:absolute lg:top-1/2  lg:w-[40%] md:absolute md:top-1/3 md:w-[40%]' >
          <h2 className='text-2xl font-bold lg:text-5xl mb-3 md:text-4xl '>Get Started with GoDrive</h2>
          <p className='text-gray-700 text-xs lg:text-lg md:text-lg'>Go anywhere with Godrive.
             Request a ride, hop in, and go.</p>
          <Link to='/login' className='flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5'>Continue</Link>
        </div>
        <div className='absolute h-[90%] mx-6 right-0 hidden lg:block md:block lg:w-1/2 md:w-1/2'>
          <img className='w-full h-full object-cover rounded-lg ' src={hero} alt="Hero Background" />
        </div>
      </div>
    </div>
  )
}

export default First