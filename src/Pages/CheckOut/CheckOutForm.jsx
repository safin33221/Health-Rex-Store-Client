import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import useAuth from '../../Hooks/useAuth';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import moment from 'moment/moment';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const CheckOutForm = () => {
    const { user, carts, setPaymentsDetails } = useAuth()
    const stripe = useStripe()
    const element = useElements()
    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()
    const [clientSecret, setClientSecret] = useState('')
    const [transtionId, setTranstionId] = useState('')
    const totalPrice = carts?.reduce((total, item) => total + parseInt(item.pricePerUnit * item.quantity), 0)
    console.log(totalPrice);

    useEffect(() => {
        if (totalPrice) {
            axiosSecure.post('/create-payment-intent', { price: totalPrice })
                .then(res => {
                    console.log(res);

                    setClientSecret(res.data.clientSecret)
                })
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!stripe || !element) {
            return
        }
        const card = element.getElement(CardElement)
        if (card === null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })
        if (error) {
            console.log(error);
            toast.success(error.message, {
                position: "top-right",
                autoClose: 1000,


            });
        }
        else {

        }


        const { paymentIntent, error: cardError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || "anonymous",
                    name: user?.displayName || "anonymous",
                }
            },
        });
        if (cardError) {
            console.log(cardError);
            toast.success(cardError.message, {
                position: "top-right",
                autoClose: 1000,


            });
        } else {

            if (paymentIntent.status === 'succeeded') {
                setTranstionId(paymentIntent.id)
                const payment = {
                    email: user?.email,
                    name: user?.displayName,
                    transtionId: paymentIntent.id,
                    data: moment().format('LLL'),
                    cartId: carts.map(cart => cart._id),
                    medicineId: carts.map(item => item.medicineId),
                    status: 'pending',
                    totalPrice: totalPrice,




                }
                axiosSecure.post('/payment', payment)
                    .then(res => {
                        console.log(res);

                        setPaymentsDetails(payment)
                        toast.success('Thank You for Your Payment!', {
                            position: "top-center",
                            autoClose: 1500,


                        });
                        navigate(`/invoice/${paymentIntent.id}`)
                    })
            }
        }

    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            // base: {
                            //     fontSize: "16px",
                               
                            // },
                            invalid: {
                                color: '#9e4146'
                            }
                        }
                    }}
                ></CardElement>
                {transtionId && <p>Transtion Id: {transtionId}</p>}
                <button disabled={!stripe || !clientSecret || !totalPrice} className="btn btn-xl py-2    mt-10 px-10 font-bold ">Pay</button>
            </form>
        </div>
    );
};

export default CheckOutForm;