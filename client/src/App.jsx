import React from 'react'
import { Route, Routes } from 'react-router-dom'
import First from './pages/First'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import Captainlogin from './pages/Captainlogin'
import CaptainSignup from './pages/CaptainSignup'
import UserHome from './pages/UserHome'
import UserProtectWrapper from './pages/UserProtectedWrapper'
import UserLogout from './pages/UserLogout'
import CaptainHome from './pages/CaptainHome'
import CaptainProtectWrapper from './pages/CaptainProtectWrapper'
import CaptainLogout from './pages/CaptainLogout'
import Riding from './pages/Riding'
import CaptainRiding from './pages/CaptainRiding'
import UserProfile from './pages/UserProfile'

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<First />} />
        <Route path='/home' element={<UserProtectWrapper><UserHome /></UserProtectWrapper>} />
        <Route path='/captain-home' element={<CaptainProtectWrapper><CaptainHome /></CaptainProtectWrapper>} />
        <Route path='/login' element={<UserLogin />} />
        <Route path='/signup' element={<UserSignup />} />
        <Route path='/captain-login' element={<Captainlogin />} />
        <Route path='/captain-signup' element={<CaptainSignup />} />
        <Route path='/profile' element={<UserProtectWrapper><UserProfile /></UserProtectWrapper>} />
        <Route path='/user-logout' element={<UserProtectWrapper><UserLogout /></UserProtectWrapper>} />
        <Route path='/captain-logout' element={<CaptainProtectWrapper><CaptainLogout /></CaptainProtectWrapper>} />
        <Route path='/riding' element={<Riding />} />
        <Route path='/captain-riding' element={<CaptainRiding />} />
      </Routes>
    </div>
  )
}

export default App