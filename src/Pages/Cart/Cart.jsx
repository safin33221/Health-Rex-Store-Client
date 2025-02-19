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
    const { data: carts = [], refetch,isPending } = useQuery({
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
    if(isPending) return <Loader/>
    return (
        <div className="md:w-10/12 mx-auto">
            <Helmet title="HRS | CART" />

            {
                carts?.length < 0 ? <>
                    <h1 className="text-center text-3xl font-bold mt-64">No medicine in your cart yet. Browse and add some!</h1></> :
                    <div className="overflow-x-auto">
                        <div className="flex justify-between items-center py-5">
                            <h1 className="text-xl md:text-2xl py-3 font-bold ">
                                Total: {carts?.length}
                            </h1>
                            <input onChange={(e) => setSearch(e.target.value)} placeholder="sarch medicine" type="text" className="input focus:outline-none input-bordered" />
                        </div>
                        <table className="table table-zebra">
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

                        <button disabled={carts.length === 0} className="btn btn-outline my-5"><Link to='/cheackOut'>Check Out</Link></button>

                    </div>
            }
        </div>
    );
};

export default Cart;