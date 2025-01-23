import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Helmet } from "react-helmet-async";


const PaymentsHistory = () => {
    const { user } = useAuth()
    const axiosPublic = useAxiosPublic()
    const { data: paymentsHistory } = useQuery({
        queryKey: ['paymentsHistory', user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/payments-history/${user?.email}`)
            return res.data
        }
    })
    console.log(paymentsHistory);
    return (
        <div className="w-10/12 mx-auto py-20">
            <Helmet title="HRS | PAYMENT HISTORY"/>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead className="bg-secondary">
                        <tr>
                            <th></th>
                            <th>Buyer</th>
                            <th>Transtion Id</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            paymentsHistory?.map((item, idx) => <tr key={idx}>
                                <th>{idx + 1}</th>
                                
                                <td>{item?.email}</td>
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

export default PaymentsHistory;