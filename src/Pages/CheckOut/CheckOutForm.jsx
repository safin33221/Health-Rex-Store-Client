import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import useAuth from '../../Hooks/useAuth';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import moment from 'moment/moment';

const CheckOutForm = ({ totalPrice }) => {
    const { user, carts, setPaymentsDetails } = useAuth()
    const stripe = useStripe()
    const element = useElements()
    const axiosPublic = useAxiosPublic()
    const [clientSecret, setClientSecret] = useState('')
    const [transtionId, setTranstionId] = useState('')

    useEffect(() => {
        axiosPublic.post('/create-payment-intent', { price: totalPrice })
            .then(res => {
                console.log(res.data.clientSecret);
                setClientSecret(res.data.clientSecret)
            })
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
            console.log('error --------->', error);
        }
        else {
            console.log('payment methode -------------->', paymentMethod);
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
            console.log('confirm error----------->', cardError);
        } else {
            console.log("payment intents ------------->", paymentIntent);
            if (paymentIntent.status === 'succeeded') {
                setTranstionId(paymentIntent.id)
                const payment = {
                    email: user?.email,
                    name: user?.displayName,
                    transtionId: paymentIntent.id,
                    data: moment().format('LLL'),
                    cartId: carts.map(cart => cart._id),
                    medicineId: carts.map(item => item.medicineId),
                    status: 'pending'



                }
                axiosPublic.post('/payment', payment)
                    .then(res => {
                        console.log(res.data)
                        setPaymentsDetails(payment)
                    })
                console.log(payment);
            }
        }

    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: "16px",
                                color: "#422470",
                                '::placeholder': {
                                    color: '#aab7c4'
                                }
                            },
                            invalid: {
                                color: '#9e4146'
                            }
                        }
                    }}
                ></CardElement>
                {transtionId && <p>Transtion Id: {transtionId}</p>}
                <button disabled={!stripe || !clientSecret || !totalPrice} className="btn btn-xl py-2 text-black bg-blue-500 mt-10 px-5">Pay</button>
            </form>
        </div>
    );
};

export default CheckOutForm;