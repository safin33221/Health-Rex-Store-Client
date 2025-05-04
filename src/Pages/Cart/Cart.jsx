import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useState } from "react";
import Loader from "../../Components/Loader";


const Cart = () => {
    const { user, setCart } = useAuth()
    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()
    const [search, setSearch] = useState('')
    const { data: carts = [], refetch, isPending } = useQuery({
        queryKey: ['carts', user?.email, search],
        queryFn: async () => {
            const res = await axiosSecure.get(`/carts/${user?.email}?search=${search}`)
            setCart(res.data)
            return res.data
        }

    })


    const handleQuantity = (cart, status) => {
        const updateInfo = {
            status,
            price: cart?.pricePerUnit
        }
        axiosSecure.patch(`/cart/quantity/${cart?._id}`, updateInfo)
            .then(res => {

                refetch()
            })
    }
    const handleDeleted = id => {
        axiosSecure.delete(`/cart/${id}`)
            .then(res => {

                refetch()
                toast.success('This item has been removed from your cart.', {
                    position: "top-right",
                    autoClose: 1500,


                });
            })
    }
    const handleClearAll = email => {
        axiosSecure.delete(`/deletedAll/${email}`)
            .then(res => {


                toast.success('Your cart is cleared! Shop for more amazing items.', {
                    position: "top-right",
                    autoClose: 1500,


                });
                refetch()

            })
    }


    const total_amount = carts?.reduce((a, b) => a + (b.pricePerUnit * b.quantity), 0)
    if (isPending) return <Loader />
    return (
        <div className="md:w-10/12 mx-auto my-5 min-h-screen">
            <Helmet title="HRS | CART" />

            {
                carts?.length < 0 ? <>
                    <h1 className="text-center text-3xl font-bold mt-64">No medicine in your cart yet. Browse and add some!</h1></> :
                    (
                        <div className="grid grid-cols-12 gap-4 ">
                            <div className="overflow-x-auto col-span-8  px-2 mx-auto">
                                <div className="flex justify-between items-center py-5">
                                    <h1 className="text-xl md:text-2xl py-3 font-bold ">
                                        Total: {carts?.length}
                                    </h1>
                                    <input onChange={(e) => setSearch(e.target.value)} placeholder="sarch medicine" type="text" className="input focus:outline-none input-bordered" />
                                </div>
                                <table className="table table-zebra overflow-x-auto">
                                    {/* head */}
                                    <thead className="text-xl rounded-lg" >
                                        <tr >
                                            <th></th>
                                            <th>Name</th>

                                            <th>Company</th>
                                            <th>Per Unit Price</th>
                                            <th>Quantity</th>
                                            <th>
                                                <button onClick={() => handleClearAll(user?.email)}
                                                    className="btn btn-sm b">Clear All</button>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            carts?.map((cart, index) => <tr key={index}>
                                                <th>{index + 1}</th>
                                                <td>{cart?.itemName}</td>

                                                <td>{cart?.company}</td>
                                                <td>{cart?.pricePerUnit} tk</td>
                                                <td>
                                                    <button disabled={cart?.quantity === 1} onClick={() => handleQuantity(cart, 'decrese')} className="btn-sm btn mx-2">-</button>
                                                    {cart?.quantity}
                                                    <button onClick={() => handleQuantity(cart, 'increse')} className="btn-sm btn mx-2">+</button>
                                                </td>
                                                <td>
                                                    <button onClick={() => handleDeleted(cart._id)}
                                                        className=" btn-sm hover:text-red-500 duration-300">
                                                        <FaTrash />
                                                    </button>
                                                </td>
                                            </tr>)
                                        }


                                    </tbody>
                                </table>



                            </div>
                            <div className="h-full col-span-4 my-5 mt-24 w-full">

                                <table className="table border-2 border-gray-100 ">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Subtotal</td>
                                            <td>{total_amount} Tk</td>
                                        </tr>
                                        <tr>
                                            <td>Delivery Charge</td>
                                            <td>30 Tk</td>
                                        </tr>
                                        
                                        <tr>
                                            <td>Total</td>
                                            <td>{total_amount + 30}Tk</td>
                                        </tr>
                                        <tr>
                                            <td colSpan={2}>
                                                <Link to='/cheackOut'> <button disabled={carts.length === 0} className="btn mx-auto bg-[#2E8B57] text-white  rounded-none block btn-outline w-full ">Check Out
                                                </button></Link>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )
            }
        </div>
    );
};

export default Cart;