import React from 'react';
import useAuth from '../../Hooks/useAuth';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';

const AdminHome = () => {
    const { user } = useAuth()
    const axiosPublic = useAxiosPublic()
    const { data: states } = useQuery({
        queryKey: ['states'],
        queryFn: async () => {
            const res = await axiosPublic.get('/admin/sales-states')
            return res.data
        }
    })
   
    return (
        <div className='lg:w-10/12 mx-auto'>
            <Helmet title="HRS | ADMIN HOME" />
            <h1 className='font-bold text-xl pt-10 ml-20'>Welcome '{user?.displayName}'</h1>

            <div className=" flex flex-col md:flex-row gap-5 min-w-[350px] mx-auto">
                {
                    states?.map((state, idx) => 
                    <div key={idx} className=" w-full border transition-all duration-200 ease-in-out  text-center p-4 rounded-lg hover:shadow-2xl  ">
                        <h1 className='text-xl font-bold'>{state._id}</h1>
                        <h1 className="text-2xl font-bold">{Number(state?.revenue)?.toFixed(2)} BTD</h1>

                        <p className="text-gray-500">Total sales: {state.quantity}</p> 
                        
                    </div>)
                }


            </div>
        </div>
    );
};

export default AdminHome;