import React from 'react'
import arrowdown from '../assets/images/arrowdown.png'
import car from '../assets/images/car.png'
import location from '../assets/images/location.png'
import userLocation from '../assets/images/userlocation.png'
import rupee from '../assets/images/rupee.png'

function RidePanel(props) {
    return (
        <div>
            <div>

                <h3 className='text-2xl font-semibold mb-8'>New Ride Available</h3>
                <div className='flex items-center justify-between bg-yellow-600 p-2 rounded-lg'>
                    <div className='flex items-center gap-3'>
                        <img className='h-16 w-16 rounded-full object-cover' src="https://cdn.shopify.com/s/files/1/0598/1837/7276/files/2-0585.jpg?v=1715752858" alt="" />
                        <h3 className='text-xl font-medium'>{props.ride?.user.fullname.firstname + " " + props.ride?.user.fullname.lastname}</h3>
                    </div>
                    <p>2.2 KM</p>
                </div>
                <div className='flex  flex-col items-center justify-between '>
                    <div className='w-full '>
                        <div className='flex items-center mb-5 p-3 border-b-2'>
                            <img className='h-8 pr-2' src={userLocation} alt="" />
                            <div>
                                <h2 className='text-lg font-medium'>{props.ride?.pickup}</h2>
                                {/* <p className='text-gray-600 text-sm'>chandani chawlk</p> */}
                            </div>
                        </div>
                        <div className='flex items-center mb-5 p-3 border-b-2'>
                            <img className='h-8 pr-2' src={location} alt="" />
                            <div>
                                <h2 className='text-lg font-medium'>{props.ride?.destination}</h2>
                                {/* <p className='text-gray-600 text-sm'>chandani chawlk</p> */}
                            </div>
                        </div>
                        <div className='flex items-center mb-5 p-3 '>
                            <img className='h-8 pr-2' src={rupee} alt="" />
                            <div>
                                <h2 className='text-lg font-medium'>{props.ride?.fare} </h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex gap-2'>
                    <button onClick={() => {
                        props.confirmRide();
                        props.setConfirmRidePanel(true)
                        props.setRidePanel(false);
                    }} className=' bg-green-600 w-full text-white font-semibold p-2 px-10 rounded-lg'>Accept</button>

                    <button onClick={() => {
                        props.setRidePanel(false)

                    }} className='w-full bg-gray-300 text-gray-700 font-semibold p-2 px-10 rounded-lg'>Ignore</button>
                </div>
            </div>

        </div>
    )
}

export default RidePanel