import React, { useEffect, useState } from 'react';
import axios from 'axios';
import edit from '../assets/images/pencil.png';
import arrowLeft from '../assets/images/arrow-left.png';
import emptyprofile from '../assets/images/emptyProfile.jpg'; 
import { Link, useNavigate } from 'react-router-dom';

function UserProfile() {
    const [user, setUser] = useState(null); // State to hold user data
    const navigate = useNavigate(); // Navigation hook
    const [loading, setLoading] = useState(false);

    // Fetch user data
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/profile`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                console.log(response.data);
                setUser(response.data);
            } catch (error) {
                console.error(error);
                navigate('/login');
            }
        };
        fetchUser();
    }, [navigate]);

    const updateProfileImage = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            setLoading(true);
            const formData = new FormData();
            formData.append('image', file); 
            console.log(file)
            formData.append('firstname', user?.fullname.firstname); 
            formData.append('lastname', user?.fullname.lastname);
            formData.append('email', user?.email); 

            const response = await axios.put(
                `${import.meta.env.VITE_BASE_URL}/user/profile`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            console.log(response.data);
            setUser(prev => ({ ...prev, image: response.data.user.image }));
            setLoading(false);
            window.location.reload();
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    return (
        <div className='m-4'>
            <Link to='/home'>
                <img src={arrowLeft} alt="Go back" />
            </Link>
            <div className='flex flex-col items-center gap-5'>
                <h2 className='text-2xl font-semibold'>Profile</h2>
                <div className='flex justify-center items-center relative'>
                    <img
                        className='w-40 h-40 rounded-full object-cover'
                        src={user?.image || emptyprofile} 
                        alt="User"
                    />
                    <label className='absolute ml-36 mt-16 bg-white  rounded-full hover:bg-gray-300 cursor-pointer'>
                        <input
                            type='file'
                            accept='image/*'
                            onChange={updateProfileImage}
                            className='hidden'

                        />
                        <img className='' src={edit} alt="Edit profile" />
                    </label>
                </div>
                <div className='flex flex-col items-center'>
                    <h3 className='font-medium'>{user?.fullname?.firstname} {user?.fullname?.lastname}</h3>
                    <h3 className='text-slate-400'>{user?.email}</h3>
                </div>
            </div>
            <div className='bg-yellow-600 rounded-lg p-6 mt-4'>
                <h2 className='text-lg font-semibold'>Rides</h2>
                <div className='flex justify-between'>
                    <h3>From</h3>
                    <h3>To</h3>
                    <h3>Amount</h3>
                </div>

            </div>
        </div>
    );
}

export default UserProfile;
