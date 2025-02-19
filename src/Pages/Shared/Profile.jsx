import React from 'react';
import useAuth from '../../Hooks/useAuth';

import { Helmet } from 'react-helmet-async';
import { MdCamera } from 'react-icons/md';
import { FaCamera } from 'react-icons/fa';
import UpdateProfile from './UpdateProfile';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loader from '../../Components/Loader';


const Profile = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { data: userData, refetch, isPending } = useQuery({
        queryKey: ["userData", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/${user?.email}`)
            return res.data
        }

    })
    console.log(userData);
    const handledleUpdate = () => {

        document.getElementById('update_profile').showModal()
    }
    if (isPending) return <Loader />
    return (

        <div>
            <Helmet>
                <title>HRS | PROFILE</title>
            </Helmet>

            <div className="  relative mx-auto p-4  mt-20 border rounded-lg shadow-lg md:ml-20  flex items-center justify-center ">
                <button onClick={() => handledleUpdate()}
                    className="absolute top-5 right-2 z-10 md:right-10 btn btn-sm  btn-outline font-bold"> Update Profile</button>
                <div className="flex flex-col md:flex-row items-center gap-10">
                    <div className="relative">
                        <img
                            className=" w-44 h-44 mt-10 md:w-52 md:h-52 mb-4 rounded-full shadow-lg"
                            src={userData?.image || "https://via.placeholder.com/150"}
                            alt="Profile"
                        />

                        
                    </div>

                    <div>
                        <h2 className="text-xl md:text-4xl font-semibold"> <span className="font-bold">{userData?.name || "N/A"}({userData?.role})</span></h2>
                        <h2 className="text-lg font-semibold">Email: <span className="font-bold">{userData?.email || "N/A"}</span></h2>
                        <h2 className="text-lg font-semibold">Phone: <span className="font-bold">{userData?.phone || "N/A"}</span></h2>
                        <h2 className="text-lg font-semibold">Address: <span className="font-bold">{userData?.address || "N/A"}</span></h2>
                    </div>
                </div>
            </div>
            <UpdateProfile refetch={refetch} userData={userData} />
        </div>
    );
};

export default Profile;