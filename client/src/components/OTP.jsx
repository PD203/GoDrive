import React, { useState } from 'react'
import arrowdown from '../assets/images/arrowdown.png'
import car from '../assets/images/car.png'
import location from '../assets/images/location.png'
import userLocation from '../assets/images/userlocation.png'
import rupee from '../assets/images/rupee.png'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'


function OTP(props) {

    const [otp, setOtp] = useState('')
    const navigate = useNavigate()

    const submitHander = async (e) => {
        e.preventDefault()

        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/ride/start-ride`, {
            params: {
                rideId: props.ride._id,
                otp: otp
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        if (response.status === 200) {
            props.setConfirmRidePanel(false)
            props.setRidePanel(false)
            navigate('/captain-riding', { state: { ride: props.ride } })
        }
    }

    return (
        <div>
            <div >
                <h3 className='text-2xl font-semibold my-8'>Confirm this ride to start</h3>
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
                                <h2 className='text-lg font-medium'>{props.ride?.fare}</h2>
                            </div>
                        </div>
                    </div>
                </div>

                <form onSubmit={submitHander}>
                    <input
                        value={otp} onChange={(e) => setOtp(e.target.value)}
                        className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
                        type="text"
                        placeholder='Enter OTP' />
                    <div className='flex gap-2'>

                        <button className=' bg-green-600 flex justify-center w-full text-white font-semibold p-2 px-10 rounded-lg'>Confirm</button>

                        <button onClick={() => {
                            props.setConfirmRidePanel(false)
                            props.setRidePanel(false)
                        }} className='w-full bg-red-500 text-white font-semibold p-2 px-10 rounded-lg'>Cancel</button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default OTP