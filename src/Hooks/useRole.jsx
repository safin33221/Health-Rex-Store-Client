
import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import useAxiosPublic from './useAxiosPublic';


const useRole = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const axiosPublic = useAxiosPublic()
    const { data: role, isPending } = useQuery({
        queryKey: [user?.email, 'role'],
        enabled: !!user?.email,
        queryFn: async () => {

            const res = await axiosPublic.get(`/user/role/${user?.email}`)
            return res?.data?.role

        }
    })
    return [role, isPending]
};

export default useRole;