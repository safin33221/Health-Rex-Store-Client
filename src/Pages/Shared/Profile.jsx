import React from 'react';
import useAuth from '../../Hooks/useAuth';
import { FaCamera, FaEdit } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';


const Profile = () => {
    const { user } = useAuth()
    return (
        <div>
            <Helmet title='HRS | PROFILE'/>
            <div className="max-w-xl relative mx-auto p-4 bg-base-300 border rounded-lg shadow-lg border-secondary flex items-center justify-center mt-44">
                <div className="flex flex-col items-center">
                    <div className=''>
                        <img
                            className="w-24 h-24 mb-4 rounded-full shadow-lg r"
                            src={user?.photoURL}

                        />

                    </div>
                    <h2 className="text-lg font-semibold  ">Name: <span className='font-bold'>{user?.displayName}</span></h2>
                    <h2 className="text-lg font-semibold  ">Email: <span className='font-bold'>{user?.email}</span></h2>
                </div>

            </div>
        </div>
    );
};

export default Profile;