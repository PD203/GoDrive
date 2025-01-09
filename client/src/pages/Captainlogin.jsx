import React, { useState } from 'react'
import logo from '../assets/images/logo.png'
import CaptainLoginScreen from '../assets/images/CaptainLoginScreen.gif'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from '../context/CaptainContext'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Captainlogin() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { captain, setCaptain } = React.useContext(CaptainDataContext)

  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault();
    const captain = {
      email: email,
      password
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/login`, captain)

      if (response.status === 200) {
        const data = response.data

        setCaptain(data.captain)
        localStorage.setItem('token', data.token)
        toast.success(data.message || 'Login successful!')
        navigate('/captain-home')

      }
    }
    catch (error) {
      console.error(error)
      toast.error(error.response.data.message || error.response?.data?.errors?.[0]?.msg)
    }

    setEmail('')
    setPassword('')
  }


  return (
    <div className='h-screen flex'>
      <div className='hidden md:block w-1/2'>
        <img
          src={CaptainLoginScreen}
          alt="Captain Login"
          className='w-full h-full object-cover'
        />
      </div>

      <div className='p-7 h-screen flex flex-col justify-between w-full md:w-1/2'>
        <img className='w-16 mb-6' src={logo} alt="" />
        <div>
          <form onSubmit={(e) => { submitHandler(e) }} action="">
            <h3 className='text-xl font-medium mb-2'>Captain's Email</h3>
            <input
              value={email}
              onChange={(e) => { setEmail(e.target.value) }}
              className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
              required
              type="email"
              placeholder='email@example.com' />
            <h3 className='text-xl font-medium  mb-2'>Enter Password</h3>
            <input
              value={password}
              onChange={(e) => { setPassword(e.target.value) }}
              className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
              required type="password"
              placeholder='Enter password' />
            <button className='bg-black text-white font-semibold my-3 rounded px-4 py-2 w-full text-lg placeholder:text-base' >Login</button>
            <p className='text-center mb-7 font-medium'>New here?, <Link to='/captain-signup' className='text-blue-600'>Register as a captain</Link></p>
          </form>
        </div>
        <div>
          <Link to='/login' className='bg-yellow-600 flex items-center justify-center text-white font-semibold mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base' >Sign-in as User</Link>
        </div>
      </div>
    </div>

  )
}

export default Captainlogin