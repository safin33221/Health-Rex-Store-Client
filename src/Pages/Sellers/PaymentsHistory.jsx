import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Helmet } from "react-helmet-async";


const PaymentsHistory = () => {
    const { user } = useAuth()
    const axiosPublic = useAxiosPublic()
    const { data: paymentsHistory =[] } = useQuery({
        queryKey: ['paymentsHistory', user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/payments-history/${user?.email}`)
            return res.data
        }
    })
 
    return (
        <div className="md:w-10/12 mx-auto py-10">
            <Helmet title="HRS | PAYMENT HISTORY" />
            {
                paymentsHistory.length === 0 ? <h1 className="text-3xl font-bold text-center mt-44">Payment History is Empty!</h1> :
                    <div className="overflow-x-auto">
                        <h1 className="text-lg md:text-2xl font-bold ml-20">Payment History</h1>
                        <table className="table">
                            {/* head */}
                            <thead className="font-bold">
                                <tr>
                                    <th>No.</th>
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
            }
        </div>
    );
};

export default PaymentsHistory;