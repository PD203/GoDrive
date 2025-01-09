import React from 'react'
import arrowdown from '../assets/images/arrowdown.png'
import car from '../assets/images/car.png'
import location from '../assets/images/location.png'
import userLocation from '../assets/images/userlocation.png'
import rupee from '../assets/images/rupee.png'

function WaitingforRider(props) {
    return (
        <div>
            <div className='w-full flex justify-center'>
                <img onClick={() => { props.setWaitingForDriver(false) }} className='' src={arrowdown} alt="" />
            </div>

            <div className='flex items-center justify-between '>
                <img className='h-20' src={car} alt="" />
                <div className='text-right'>
                    <h2 className='text-lg font-medium capitalize p-1'>{props.ride?.captain.fullname.firstname + " " + props.ride?.captain.fullname.lastname}
                    </h2>
                    <h4 className='text-xl font-semibold '>{props.ride?.captain.vehicle.plate}</h4>
                    <p className='text-sm text-gray-600'>Maruti Suzuki Alto</p>
                    <h1 className='text-lg font-semibold'>  {props.ride?.otp} </h1>
                </div>
            </div>

            <div className='flex gap-2 justify-between flex-col items-center'>
                <div className='w-full mt-5'>
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
                    <div className='flex items-center mb-5 p-3 border-b-2'>
                        <img className='h-8 pr-2' src={rupee} alt="" />
                        <div>
                            <h2 className='text-lg font-medium'>{props.ride?.fare}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WaitingforRider