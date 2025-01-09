import React, { useContext, useEffect } from 'react'
import logo from '../assets/images/logo.png'
import map from '../assets/images/map.gif'
import car from '../assets/images/car.png'
import location from '../assets/images/location.png'
import rupee from '../assets/images/rupee.png'
import home from '../assets/images/home.png'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { SocketContext } from '../context/SocketContext'
import LiveTracking from '../components/LiveTracking'


function Riding() {

    const location = useLocation()
    const { ride } = location.state || {} 
    const { socket } = useContext(SocketContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (!location.state) navigate('/home') // Redirect if no state
    }, [])

    useEffect(() => {
        socket.on("ride-ended", () => {
            navigate('/home')
        })

        return () => socket.off("ride-ended")
    }, [socket, navigate])

    return (
        <div className='h-screen'>
            <Link to='/home' className='fixed  right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
                <img src={home} alt="" />
            </Link>

            <div>
                <img className='w-16 ml-8 absolute top-5' src={logo} alt="" />

                <div className='h-1/2'>
                   <img src={map} alt="" />
                   <LiveTracking/>
                </div>

                <div className='h-1/2 '>
                    <div className='flex items-center justify-between px-5'>
                        <img className='h-20 ' src={car} alt="" />
                        <div className=' text-right'>
                            <h2 className='text-lg font-medium capitalize p-1'>{ride?.captain.fullname.firstname + " " + ride?.captain.fullname.lastname}</h2>
                            <h4 className='text-xl font-semibold '>{ride?.captain.vehicle.plate}</h4>
                            <p className='text-sm text-gray-600'>Maruti Suzuki Alto</p>
                            {/* <h1 className='text-lg font-semibold'></h1> */}
                        </div>
                    </div>

                    <div className='flex gap-2 justify-between flex-col items-center'>
                        <div className='w-full mt-5'>

                            <div className='flex items-center mb-3 p-3 border-b-2'>
                                <img className='h-8 pr-2' src={location} alt="" />
                                <div>
                                    <h2 className='text-lg font-medium'>{ride?.destination}</h2>
                                    {/* <p className='text-gray-600 text-sm'>chandani chawlk</p> */}
                                </div>
                            </div>
                            <div className='flex items-center mb-3 p-3 border-b-2'>
                                <img className='h-8 pr-2' src={rupee} alt="" />
                                <div>
                                    <h2 className='text-lg font-medium'>{ride?.fare}</h2>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='h-1/2 p-4'>
                        <button className='w-full bg-green-600 font-semibold p-2 rounded-lg'>Make a Payment</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Riding