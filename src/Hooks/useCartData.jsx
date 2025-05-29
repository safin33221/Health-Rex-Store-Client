import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';
import useAxiosPublic from './useAxiosPublic';

const useCartData = () => {
    const axiosSecure = useAxiosSecure()
    const {user} = useAuth()
    const axiosPublic = useAxiosPublic()

    const { data: cartsData = [], refetch, isPending } = useQuery({
        queryKey: ['cartsData', user?.email],
        enabled:!!user?.email,
        queryFn: async () => {
            const res = await axiosPublic.get(`/carts/${user?.email}`)
            return res.data
        }

    })
    return [cartsData, refetch, isPending]
};

export default useCartData;