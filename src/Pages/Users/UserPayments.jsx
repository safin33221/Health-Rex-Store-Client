import React from 'react';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';

const UserPayments = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { data: paymentsHistory } = useQuery({
        queryKey: ['paymentsHistory', user?.email],
        queryFn: async () => {
            if (user?.email) {
                const res = await axiosSecure.get(`/payments/${user?.email}`)
                return res.data
            }
        }
    })

    return (
        <div className='md:w-10/12 mx-auto py-9'>
            <Helmet title="HRS | PAYMENT HISTORY" />
            <h1 className="text-2xl font-bold ml-20">Payments History</h1>
            <div className="overflow-x-auto min-w-96 mt-10">
                <table className="table">
                    {/* head */}
                    <thead className="bg-secondary">
                        <tr>
                            <th></th>

                            <th>Transtion Id</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            paymentsHistory?.map((item, idx) => <tr key={idx}>
                                <th>{idx + 1}</th>


                                <td>{item?.transtionId}</td>
                                <td>{item?.status}</td>



                            </tr>)
                        }



                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserPayments;