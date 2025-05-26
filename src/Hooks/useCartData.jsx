import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';

const useCartData = () => {
    const axiosSecure = useAxiosSecure()
    const {user} = useAuth()

    const { data: cartsData = [], refetch, isPending } = useQuery({
        queryKey: ['cartsData', user?.email],
        enabled:!!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/carts/${user?.email}`)
            return res.data
        }

    })
    return [cartsData, refetch, isPending]
};

export default useCartData;