import { useEffect, useRef, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import logo from '../../assets/logo.png'

import { usePDF } from 'react-to-pdf';

const Invoice = () => {
    const { paymentDetails } = useAuth()
    const axiosPublic = useAxiosPublic()
    const [medicine, setMedicines] = useState([])
    const medicineIds = paymentDetails.medicineId
    console.log(medicineIds);
    useEffect(() => {
        if (medicineIds) {
            axiosPublic.post('/invoice/medicine', medicineIds)
                .then(res => {
                    setMedicines(res.data);
                })
        }
    }, [medicineIds])

    const { toPDF, targetRef } = usePDF({ filename: 'page.pdf' });
    return (
        <div className="w-10/12 mx-auto my-16">
            <div className="flex justify-end">
                <button onClick={() => toPDF()}>Download PDF</button>
            </div>
            <div className=" ">
                <div ref={targetRef} className="max-w-4xl mx-auto p-6  border shadow-md rounded-lg">
                    {/* Invoice Header */}
                    <div className="flex justify-between items-center border-b pb-4">
                        <div className="flex gap-3 items-center ">
                            <img className="w-24" src={logo} alt="" />
                            <div>
                                <h1 className="text-2xl font-bold ">HealthRxStore</h1>
                                <p className="">Your Trusted Medicine Partner</p>
                            </div>
                        </div>
                        <div>
                            <p className="text-sm >
                                {/* <strong>Date:</strong> {date} */}
                            </p>
                            <p className="text-sm >
                                {/* <strong>Invoice ID:</strong> {invoiceId} */}
                            </p>
                        </div>
                    </div>

                    {/* Customer Info */}
                    <div className="mt-4">
                        <h2 className="text-lg font-semibold ">Customer Details</h2>
                        <p className="">
                            <strong>Name:</strong>  {paymentDetails?.name}
                        </p>
                        <p className="">
                            <strong>Email:</strong>  {paymentDetails?.email}
                        </p>

                    </div>

                    {/* Order Details */}
                    <div className="mt-6">
                        <h2 className="text-lg font-semibold ">Order Summary</h2>
                        <table className="w-full border-collapse border  mt-4">
                            <thead className="">
                                <tr>
                                    <th className="border  p-2 text-left">#</th>
                                    <th className="border  p-2 text-left">Item Name</th>
                                    <th className="border  p-2 text-left">Quantity</th>
                                    <th className="border  p-2 text-left">Price</th>
                                    <th className="border  p-2 text-left">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {medicine?.map((item, index) => (
                                    <tr key={item.id} className="">
                                        <td className="border  p-2">{index + 1}</td>
                                        <td className="border  p-2">{item.itemName}</td>
                                        <td className="border  p-2">{item.quantity}</td>
                                        <td className="border  p-2">${item.price}</td>
                                        <td className="border  p-2">
                                            {item.quantity * item.price} tk
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Total Amount */}
                    <div className="flex justify-end mt-6">
                        <div className="w-full max-w-sm">

                            <div className="flex justify-between p-2 border-t ">
                                <span className=" font-semibold">Tax: 00</span>
                                <span>tk</span>
                            </div>
                            <div className="flex justify-between p-2 border-t ">
                                <span className=" font-semibold">Discount: 00</span>
                                <span>tk</span>
                            </div>
                            <div className="flex justify-between p-2 border-t border-b ">
                                <span className="text-lg font-bold ">Total: {paymentDetails?.totalPrice}</span>
                                <span className="text-lg font-bold text-black">tk</span>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-6 text-center text-sm ">
                        Thank you for shopping with us!
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Invoice;