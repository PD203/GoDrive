import React, { useContext, useState } from 'react'
import logo from '../assets/images/logo.png'
import UserRegScreen from '../assets/images/UserRegScreen.gif'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../context/UserContext.jsx'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UserSignup() {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userData, setUserData] = useState({})

  const navigate = useNavigate()

  const { user, setUser } = useContext(UserDataContext)


  const submitHandler = async (e) => {
    e.preventDefault()
    const newUser = {
      fullname: {
        firstname: firstName,
        lastname: lastName
      },
      email: email,
      password: password
    }
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/register`, newUser)

      if (response.status === 201) {
        const data = response.data
        setUser(data.user)
        localStorage.setItem('token', data.token)
        toast.success(data.message || 'Account created successfully!')
        navigate('/home')
      }
    } catch (error) {
      console.error(error)
      toast.error(error.response.data.message || error.response?.data?.errors?.[0]?.msg)
    }

    console.log(userData)
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('')
  }

  return (
    <div className='h-screen flex'>
      <div className='hidden md:block w-1/2'>
        <img
          src={UserRegScreen}
          alt="Signup Image"
          className='w-full h-full object-cover'
        />
      </div>

      {/* Signup Container */}
      <div className='p-7 h-screen flex flex-col justify-between w-full md:w-1/2'>
        <img className='w-16 mb-6' src={logo} alt="" />
        <div>
          <form onSubmit={(e) => { submitHandler(e) }} action="">
            <h3 className='text-lg font-medium mb-2'>What's your Name</h3>
            <div className='flex gap-2'>
              <input
                value={firstName}
                onChange={(e) => { setFirstName(e.target.value) }}
                className='bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base'
                required
                type="text"
                placeholder='First name' />
              <input
                value={lastName}
                onChange={(e) => { setLastName(e.target.value) }}
                className='bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base'
                required
                type="text"
                placeholder='Last name' />
            </div>
            <h3 className='text-lg font-medium mb-2'>What's your Email</h3>
            <input
              value={email}
              onChange={(e) => { setEmail(e.target.value) }}
              className='bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
              required
              type="email"
              placeholder='email@example.com' />
            <h3 className='text-lg font-medium  mb-2'>Enter Password</h3>
            <input
              value={password}
              onChange={(e) => { setPassword(e.target.value) }}
              className='bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
              required type="password"
              placeholder='Enter password' />
            <button className='bg-black text-white font-semibold my-3 rounded px-4 py-2 w-full text-lg placeholder:text-base' >Create Account</button>
            <p className='text-center mb-7 font-medium'>Already have an account?, <Link to='/login' className='text-blue-600'>Login here</Link></p>
          </form>
        </div>
        <div>
          <p className='text-[11px] leading-3'>By proceeding, you consent to get calls, SMS messages, including by automated means, from Godrive and its affiliates to the email provided.</p>
        </div>
      </div>
    </div>

  )
}

export default UserSignup