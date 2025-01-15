
import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosPublic from './useAxiosPublic';


const useRole = () => {
    const { user } = useAuth()
    const axiosPublic = useAxiosPublic()
    const { data: role } = useQuery({
        queryKey: [user?.email, 'isSeller'],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosPublic.get(`/user/role/${user?.email}`)
            return res?.data?.role
        }
    })
    return [role]
};

export default useRole;