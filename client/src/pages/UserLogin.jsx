import React, { useContext, useState } from 'react'
import logo from '../assets/images/logo.png'
import userLoginScreen from '../assets/images/userLoginScreen.gif'
import { Link, useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext'
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function UserLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userData, setUserData] = useState({})

  const { user, setUser } = useContext(UserDataContext)
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault()

    const userData = {
      email: email,
      password: password
    }
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/login`, userData)

      if (response.status === 200) {
        const data = response.data
        console.log('Response:', response)
        console.log('Response Data:', data)
        setUser(data.user)
        localStorage.setItem('token', data.token)
        toast.success(data.message || 'Login successful!')
        navigate('/home')

      }
    } catch (error) {
      console.error(error)
      toast.error(error.response.data.message || error.response?.data?.errors?.[0]?.msg )
    }


    setEmail('')
    setPassword('')
  }

  return (
    <div className='h-screen flex'>
      <div className='hidden md:block w-1/2 '>
        <img
          src={userLoginScreen}
          alt="Login Image"
          className='w-full h-full object-cover '
        />
      </div>

      <div className='p-7 h-screen flex flex-col justify-between w-full md:w-1/2'>
        <img className='w-16 mb-6' src={logo} alt="" />
        <div>
          <form onSubmit={(e) => { submitHandler(e) }} action="">
            <h3 className='text-xl font-medium mb-2'>What's your Email</h3>
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
            <p className='text-center mb-7 font-medium'>New here?, <Link to='/signup' className='text-blue-600'>Create Account</Link></p>
          </form>
        </div>
        <div>
          <Link to='/captain-login' className='bg-yellow-600 flex items-center justify-center text-white font-semibold mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base' >Sign-in as Captain</Link>
        </div>
      </div>
    </div>

  )
}

export default UserLogin