import React from 'react'
import location from '../assets/images/location.png'
import userLocation from '../assets/images/userlocation.png'
import rupee from '../assets/images/rupee.png'
import { Link, useNavigate } from 'react-router-dom'
import arrowdown from '../assets/images/arrowdown.png'
import axios from 'axios'
function FinishRide(props) {

    const navigate = useNavigate()

    async function endRide() {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/ride/end-ride`, {

            rideId: props.ride._id

        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        if (response.status === 200) {
            navigate('/captain-home')
        }
    }

    return (
        <div>
            <div >
                <div className='w-full  flex justify-center'>
                    <img onClick={() => {  props.setFinishRidePanel(false)}} src={arrowdown} alt="" />
                </div>
                <h3 className='text-2xl font-semibold my-8'>Finish this Ride</h3>
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



                <button onClick={endRide} className=' bg-green-600 flex justify-center w-full text-white font-semibold p-2 px-10 rounded-lg'>Finish Ride</button>
            </div>

        </div>
    )
}

export default FinishRide