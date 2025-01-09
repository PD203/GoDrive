import React, { useContext } from 'react'
import time from '../assets/images/time.png'
import speed from '../assets/images/speed.png'
import booklet from '../assets/images/book.png'
import { CaptainDataContext } from '../context/CaptainContext'


function CaptainDetails() {

  const {captain} = useContext(CaptainDataContext)

  return (
    <div >
      <div className='h-2/5'>
        <div className='flex items-center justify-between p-5'>
          <div className='flex items-center justify-start gap-3'>
            <img className='h-20 w-20 rounded-full object-cover' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwLGMs0rN3kmPrzHe6GtSH-aTfBX7qRo2QyA&s" alt="" />
            <h2 className='text-2xl font-medium capitalize'>{captain.fullname.firstname + " " + captain.fullname.lastname}</h2>
          </div>
          <div>
            <h4 className='text-xl font-semibold'>₹349</h4>
            <p className='text-base font-medium text-slate-600'>Earned</p>
          </div>
        </div>
        <div className='flex justify-center gap-5 items-start p-2'>
          <div className='flex flex-col justify-center items-center gap-1'>
            <img className='h-10' src={time} alt="" />
            <h5 className='text-lg font-medium'>10.3</h5>
            <p className='text-gray-600'>Ride Complited</p>
          </div>
          <div className='flex flex-col justify-center items-center gap-1'>
            <img className='h-10' src={speed} alt="" />
            <h5 className='text-lg font-medium'></h5>
            <p className='text-gray-600'>Hours Online</p>
          </div>
          <div className='flex flex-col justify-center items-center gap-1'>
            <img className='h-10' src={booklet} alt="" />
            <h5 className='text-lg font-medium'>10.3</h5>
            <p className='text-gray-600'>Hours Online</p>
          </div>
        </div>
      </div>

    </div>

  )
}

export default CaptainDetails