import React from 'react'
import car from '../assets/images/car.png'
import motorcycle from '../assets/images/motorCycle.png'
import auto from '../assets/images/auto.png'
import person from '../assets/images/person.png'
import arrowdown from '../assets/images/arrowdown.png'


function VehiclePanel(props) {
  return (
    <div>
      <div className='w-fullp-2 flex justify-center'>
        <img onClick={() => { props.setVehiclePanels(false) }} className='' src={arrowdown} alt="" />
      </div>

      <h3 className='text-2xl font-semibold mb-5'>Choose a Vehicle</h3>

      {/* rides */}
      <div onClick={() => {
        props.setConfirmRidePanel(true)
        props.selectVehicle('car')
      }} className='border-2 border-stone-400 active:border-stone-900 rounded-xl w-full p-3 flex items-center justify-between mb-3'>
        <img className='h-20' src={car} alt="" />
        <div className='w-1/2'>
          <h4 className='font-bold flex gap-1 text-lg'>GoDrive <img src={person} alt="" /><span>4</span></h4>
          <h5 className='font-medium '>2 mins away</h5>
          <p className='font-normal text-xs text-gray-600'>Affordable, compat rides</p>
        </div>
        <h2 className='text-xl font-semibold'>₹{props.fare.car}</h2>
      </div>

      {/* rides */}
      <div onClick={() => {
        props.setConfirmRidePanel(true)
        props.selectVehicle('moto')
      }} className='border-2  border-stone-400 active:border-stone-900 rounded-xl w-full p-3 flex items-center justify-between mb-3'>
        <img className='h-20' src={motorcycle} alt="" />
        <div className='w-1/2'>
          <h4 className='font-bold flex gap-1 text-lg'>GoDrive <img src={person} alt="" /><span>4</span></h4>
          <h5 className='font-medium '>2 mins away</h5>
          <p className='font-normal text-xs text-gray-600'>Affordable, compat rides</p>
        </div>
        <h2 className='text-xl font-semibold'>₹{props.fare.moto}</h2>
      </div>

      {/* rides */}
      <div onClick={() => {
        props.setConfirmRidePanel(true)
        props.selectVehicle('auto')
      }} 
      className='border-2  border-stone-400 active:border-stone-900 rounded-xl w-full p-3 flex items-center justify-between mb-3'>
        <img className='h-20' src={auto} alt="" />
        <div className='w-1/2'>
          <h4 className='font-bold flex gap-1 text-lg'>GoDrive <img src={person} alt="" /><span>4</span></h4>
          <h5 className='font-medium '>2 mins away</h5>
          <p className='font-normal text-xs text-gray-600'>Affordable, compat rides</p>
        </div>
        <h2 className='text-xl font-semibold'>₹{props.fare.auto}</h2>
      </div>

    </div>
  )
}

export default VehiclePanel