import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const SellerHome = () => {
    const { user } = useAuth()
    const axiosPublic = useAxiosPublic()
    const { data: states } = useQuery({
        queryKey: ['states', user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/seller/sales-states/${user?.email}`)
            return res.data;
        }
    })
    console.log(states);
    return (
        <div className="w-10/12 mx-auto">
            <Helmet title="HRS | SELLER HOME" />
            <div className="stats shadow mt-10 mx-auto ">
                {
                    states?.map((state,idx) => <div key={idx} className="stat">
                        
                        <div className="stat-title">{state._id}</div>
                        <div className="stat-value">{state.revenue} BTD</div>
                        <div className="stat-desc">Total sales: {state.quantity}</div>
                    </div>)
                }


            </div>
        </div>
    );
};

export default SellerHome;