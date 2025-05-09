import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "./CheckOutForm";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
const stripePromice = loadStripe(import.meta.env.VITE_Payment_gayway_pk)
const CheackOut = () => {
    const { user } = useAuth()
    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()
    const { data: carts =[], refetch } = useQuery({
        queryKey: ['carts', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/carts/${user?.email}`)
           
            return res.data
        }

    })
   
    const totalPrice = carts?.reduce((total, item) => total + item.pricePerUnit * item.quantity , 0)
   
    return (
        <div className=' my-12'>
            <Helmet title="HRS | CHEACK OUT"/>
           
            <div className="max-w-[800px] mx-auto border rounded-lg p-20 ">
            <h1 className="text-lg font-bold">Total Price: {totalPrice} BTD</h1>
                <h1 className="text-2xl border-b-2 border-black w-fit mx-auto font-bold text-center my-10">Secure Payments with Stripe</h1>
                <p className=" text-center mb-5">Enter your payment details below to complete your purchase securely</p>
                <Elements stripe={stripePromice}>
                    <CheckOutForm  />
                </Elements>
            </div>
        </div>
    );
};

export default CheackOut;