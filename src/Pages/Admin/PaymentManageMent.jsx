import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import useAuth from '../../Hooks/useAuth';
import { Helmet } from 'react-helmet-async';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Loader from '../../Components/Loader';

const PaymentManageMent = () => {
    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const { data: payments =[], refetch,isPending } = useQuery({
        queryKey: ['payments', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/manage-payments`)
            return res.data
        }
    })
    const handleAccept = id => {
        axiosSecure.patch(`/payment/${id}`)
            .then(res => {
       
                refetch()
            })
    }
    if(isPending) return <Loader/>
    return (
        <div className='lg:w-10/12 mt-14 mx-auto overflow-x-hidden'>
            <Helmet title="HRS | MANAGE PAYMENTS"/>
            <h1 className='text-2xl font-bold py-3'>Manage payments</h1>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead className='text-lg'>
                        <tr>
                            <th>No.</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Transtion Id Color</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            payments?.map((payment, idx) => <tr key={idx}>
                                <th>{idx + 1}</th>
                                <td>{payment?.name}</td>
                                <td>{payment?.email}</td>
                                <td>{payment?.transtionId}</td>
                                <td>{payment?.status}</td>
                                <td>
                                    {
                                        payment.status === "pending" && <button onClick={() => handleAccept(payment._id)} className="btn btn-sm">Accept</button>
                                    }
                                </td>

                            </tr>)
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentManageMent;