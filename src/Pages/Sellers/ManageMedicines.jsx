
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import AddMedicine from "./AddMedicine";
import { Helmet } from "react-helmet-async";
import useAuth from "../../Hooks/useAuth";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { useState } from "react";


const ManageMedicines = () => {
    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const [search, setSearch] = useState('')
    const [sort, setSort] = useState('')
    const { data: medicines, refetch } = useQuery({
        queryKey: ['medicines', user?.email, search, sort],
        queryFn: async () => {
            const res = await axiosSecure.get(`/seller/medicine/${user?.email}?search=${search}&&sort=${sort}`)
            return res.data
        }
    })
    const handleDelete = id => {
        console.log(id);
        Swal.fire({

            text: `Are You sure to deleted this medicene`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/medicine/delete/${id}`)
                    .then(res => {
                        console.log(res.data);
                        refetch()
                        Swal.fire({
                            title: "Success!",
                            text: ` Medicine has been successfully Deleted`,
                            icon: "success"
                        })
                    })
                    ;
            }
        });

    }
    return (
        <div className='w-10/12 mx-auto py-10'>
            <Helmet title="HRS | MANAGE MEDICINES" />
            <div className="flex justify-between items-center py-5">
                <h1 className="text-2xl font-bold">Total Medicines: {medicines?.length}</h1>
                <div>
                    <select onChange={(e) => setSort(e.target.value)} className="border p-3 rounded-xl focus:outline-none border-secondary mx-5" name="" id="">
                        <option value="ascending">Ascending</option>
                        <option value="dscending">Dscending</option>
                    </select>
                    <input onChange={(e) => setSearch(e.target.value)} placeholder="search medicine " type="text" className="input focus:outline-none input-bordered focus:border-secondary" />
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr className="bg-secondary">
                            <th>No.</th>
                            <th>Medicine Name</th>
                            <th>Generic Name</th>
                            <th>Category</th>
                            <th>Mass Unit</th>
                            <th>Price Per Unite</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            medicines?.map((medicine, idx) => <tr key={medicine._id}>
                                <th>{idx + 1}</th>
                                <td>{medicine.itemName}</td>
                                <td>{medicine?.genericName}</td>
                                <td>{medicine.category}</td>
                                <td>{medicine.massUnit}</td>
                                <td>{medicine.pricePerUnit} BTD</td>
                                <td>
                                    <button onClick={() => handleDelete(medicine._id)} className="btn-sm hover:text-red-500 duration-300"><FaTrashAlt /></button>

                                </td>

                            </tr>)
                        }


                    </tbody>
                </table>
                <button onClick={() => document.getElementById('my_modal_5').showModal()}
                    className="btn bg-primary my-10">Add Medicine</button>
            </div>
            <AddMedicine refetch={refetch} />
        </div>
    );
};

export default ManageMedicines;