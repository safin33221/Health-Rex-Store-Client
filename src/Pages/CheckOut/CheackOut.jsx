import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "./CheckOutForm";
const stripePromice = loadStripe(import.meta.env.VITE_Payment_gayway_pk)
const CheackOut = () => {
    const { user } = useAuth()
    const axiosPublic = useAxiosPublic()
    const { data: carts, refetch } = useQuery({
        queryKey: ['carts', user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/carts/${user?.email}`)
           
            return res.data
        }

    })
    const totalPrice = carts?.reduce((total, item) => total + item.pricePerUnit, 0)
    return (
        <div className='w-11/12 mx-auto'>
            <h1>Total Price :{totalPrice}</h1>
            <div className="max-w-[800px] mx-auto border-2 p-20 ">
                <Elements stripe={stripePromice}>
                    <CheckOutForm totalPrice={totalPrice} />
                </Elements>
            </div>
        </div>
    );
};

export default CheackOut;