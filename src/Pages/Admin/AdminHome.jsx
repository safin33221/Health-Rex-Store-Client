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
    console.log(states);
    return (
        <div className='lg:w-10/12 mx-auto'>
            <Helmet title="HRS | ADMIN HOME" />
            <h1 className='font-bold text-xl'>Welcome '{user?.displayName}'</h1>

            <div className="stats border shadow-2xl mt-10 mx-auto flex flex-col  ">
                {
                    states?.map((state, idx) => 
                    <div key={idx} className="stat  ">

                        <div className="stat-title">{state._id}</div>
                        <div className="stat-value">{state.revenue} BTD</div>
                        <div className="stat-desc">Total sales: {state.quantity}</div>
                    </div>)
                }


            </div>
        </div>
    );
};

export default AdminHome;