import React from 'react';
import useAuth from '../../Hooks/useAuth';

import { Helmet } from 'react-helmet-async';
import { MdCamera } from 'react-icons/md';
import { FaCamera } from 'react-icons/fa';


const Profile = () => {
    const { user } = useAuth()
    // const handleChange =e =>{
    //     console.log(e.target.photo.value);
    // }
    return (
        
        <div>
            <Helmet>
                <title>HRS | PROFILE</title>
            </Helmet>

            <div className="w-11/12 h-96 relative mx-auto p-4 bg-base-300 border rounded-lg shadow-lg  flex items-center justify-center mt-24">
                <div className="flex items-center gap-10">
                    <div className="relative">
                        <img
                            className="w-52 h-52 mb-4 rounded-full shadow-lg"
                            src={user?.photoURL || "https://via.placeholder.com/150"}
                            alt="Profile"
                        />

                        {/* ক্যামেরা আইকন ইনপুট */}
                        {/* <label onClick={handleChange} className="absolute bottom-5 right-5 text-gray-400 text-4xl cursor-pointer">
                            <FaCamera />
                            <input
                                type="file"
                                className="absolute inset-0 opacity-0 cursor-pointer"
                                accept="image/*"
                                name='photo'
                            />
                        </label> */}
                    </div>

                    <div>
                        <h2 className="text-4xl font-semibold"> <span className="font-bold">{user?.displayName || "N/A"}</span></h2>
                        <h2 className="text-lg font-semibold">Email: <span className="font-bold">{user?.email || "N/A"}</span></h2>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;