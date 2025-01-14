import useAuth from '../Hooks/useAuth'
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from '../Hooks/useAxiosPublic'

const useSeller = () => {
    const { user } = useAuth()
    const axiosPublic = useAxiosPublic()
    const { data: isSeller } = useQuery({
        queryKey: [user?.email, 'isSeller'],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosPublic.get(`/users/seller/${user?.email}`)
            return res?.data?.seller
        }
    })
    return [isSeller]
};

export default useSeller;