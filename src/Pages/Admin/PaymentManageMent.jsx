import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import useAuth from '../../Hooks/useAuth';
import { Helmet } from 'react-helmet-async';

const PaymentManageMent = () => {
    const axiosPublic = useAxiosPublic()
    const { user } = useAuth()
    const { data: payments, refetch } = useQuery({
        queryKey: ['payments', user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/manage-payments`)
            return res.data
        }
    })
    const handleAccept = id => {
        axiosPublic.patch(`/payment/${id}`)
            .then(res => {
                console.log(res.data);
                refetch()
            })
    }
    console.log(payments);
    return (
        <div className='w-10/12 mx-auto'>
            <Helmet title="HRS | MANAGE PAYMENTS"/>
            <h1 className='text-2xl font-bold py-3'>Manage payments</h1>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
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