import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";


const Cart = () => {
    const { user, setCart } = useAuth()
    const axiosPublic = useAxiosPublic()
    const { data: carts, refetch } = useQuery({
        queryKey: ['carts', user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/carts/${user?.email}`)
            setCart(res.data)
            return res.data
        }

    })
    console.log(carts);

    const handleQuantity = (cart, status) => {
        const updateInfo = {
            status,
            price: cart?.pricePerUnit
        }
        axiosPublic.patch(`/cart/quantity/${cart?._id}`, updateInfo)
            .then(res => {
                console.log(res.data);
                refetch()
            })
    }
    const handleDeleted = id => {
        axiosPublic.delete(`/cart/${id}`)
            .then(res => {
                console.log(res.data);
                refetch()
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "This item has been Deleted",
                    showConfirmButton: false,
                    timer: 1000
                });
            })
    }
    const handleClearAll = email => {
        axiosPublic.delete(`/deletedAll/${email}`)
            .then(res => {
                console.log(res.data)
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "All item has been Deleted",
                    showConfirmButton: false,
                    timer: 1000
                });
                refetch()
            })
    }
    return (
        <div className="w-10/12 mx-auto">
            <Helmet title="HRS | CART"/>
            {
                carts?.length <= 0 ? <>
                    <h1 className="text-center text-3xl font-bold mt-64">No Item added Yet...!</h1></> :
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
                                    carts?.map((cart, index) => <tr>
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