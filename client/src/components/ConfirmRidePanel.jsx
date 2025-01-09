import React from 'react'
import arrowdown from '../assets/images/arrowdown.png'
import car from '../assets/images/car.png'
import location from '../assets/images/location.png'
import userLocation from '../assets/images/userlocation.png'
import rupee from '../assets/images/rupee.png'


function ConfirmRidePanel(props) {
    return (
        <div>
            <div className='w-full p-2 flex justify-center'>
                <img onClick={() => { props.setConfirmRidePanel(false) }} className='' src={arrowdown} alt="" />
            </div>
            <h3 className='text-2xl font-semibold mb-5'>Confirm Your Ride</h3>
            <div className='flex  flex-col items-center justify-between '>
                <img className='h-32' src={car} alt="" />
                <div className='w-full '>
                    <div className='flex items-center mb-5 p-3 border-b-2'>
                        <img className='h-8 pr-2' src={userLocation} alt="" />
                        <div>
                            <h2 className='text-lg font-medium'>{props.pickup}</h2>
                            <p className='text-gray-600 text-sm'>chandani chawlk</p>
                        </div>
                    </div>
                    <div className='flex items-center mb-5 p-3 border-b-2'>
                        <img className='h-8 pr-2' src={location} alt="" />
                        <div>
                            <h2 className='text-lg font-medium'>{props.destination}</h2>
                            <p className='text-gray-600 text-sm'>chandani chawlk</p>
                        </div>
                    </div>
                    <div className='flex items-center mb-5 p-3 '>
                        <img className='h-8 pr-2' src={rupee} alt="" />
                        <div>
                            <h2 className='text-lg font-medium'>{props.fare[props.vehicleType]}</h2>
                        </div>
                    </div>
                </div>
            </div>
            <button onClick={() => {
                props.setVehicleFound(true)
                props.setConfirmRidePanel(false)
                props.createRide()
            }} className='w-full bg-green-600 font-semibold p-2 rounded-lg mb-14'>Confirm</button>
        </div>

    )
}

export default ConfirmRidePanel