import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import useAxiosSecure from "../../Hooks/useAxiosSecure";


const Cart = () => {
    const { user, setCart } = useAuth()
    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()
    const { data: carts, refetch } = useQuery({
        queryKey: ['carts', user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/carts/${user?.email}`)
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
    return (
        <div className="w-10/12 mx-auto">
            <Helmet title="HRS | CART" />
            {
                carts?.length <= 0 ? <>
                    <h1 className="text-center text-3xl font-bold mt-64">No medicine in your cart yet. Browse and add some!</h1></> :
                    <div className="overflow-x-auto">
                        <table className="table table-zebra">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Name</th>
                                    <th>Company</th>
                                    <th>Per Unit Price</th>
                                    <th>Quantity</th>
                                    <th>
                                        <button onClick={() => handleClearAll(user?.email)}
                                            className="btn btn-sm bg-primary">Clear All</button>
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
                        <Link to='/cheackOut'>
                            <button className="btn bg-primary my-5">Check Out</button>
                        </Link>
                    </div>
            }
        </div>
    );
};

export default Cart;