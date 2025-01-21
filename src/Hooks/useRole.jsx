
import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';


const useRole = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { data: role } = useQuery({
        queryKey: [user?.email, 'isSeller'],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/role/${user?.email}`)
            return res?.data?.role
        }
    })
    return [role]
};

export default useRole;