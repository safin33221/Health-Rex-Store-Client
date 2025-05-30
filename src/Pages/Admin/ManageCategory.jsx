import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { GrUpdate } from "react-icons/gr";
import AddCategory from "./AddCategory";
import UpdateCategoryModal from "./UpdateCategoryModal";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loader from "../../Components/Loader";

const ManageCategory = () => {
    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()
    const [category, setCategory] = useState({})
    const { data: categoris =[], refetch,isPending } = useQuery({
        queryKey: ['categoris'],
        queryFn: async () => {
            const res = await axiosPublic.get('/category')
            return res.data
        }
    })
    const handleDelete = id => {
   
        Swal.fire({
            
            text: `Are You sure to deleted this category`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/category/${id}`)
                    .then(res => {
                   
                        refetch()
                    })
                Swal.fire({
                    title: "Success!",
                    text: `This Category has been successfully deleted`,
                    icon: "success"
                });
            }
        });

    }
    const handleupdate = category => {
        setCategory(category)
        document.getElementById('updateCategory').showModal()
    }
    if(isPending) return <Loader/>
    return (
        <div className="lg:w-10/12 mx-auto my-20 w-full  ">
            <Helmet title="HRS | MANAGE CATEGORY" />
            <h1 className="text-2xl font-bold ">Manage Category</h1>
            <div className="overflow-x-auto w-full mx-auto">
                <table className="table table-lg mx-auto text-lg min-w-[400px]">
                    {/* head */}
                    <thead>
                        <tr className="text-lg">
                            <th>No.</th>
                            <th>Category Name</th>
                            <th>Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            categoris?.map((category, index) => <tr key={category._id}>
                                <th>{index + 1}</th>
                                <td>{category?.name}</td>
                                <td className="flex gap-4">
                                    <button className="hover:text-red-500 duration-200 btn" onClick={() => handleDelete(category._id)}><FaTrashAlt /></button>
                                    <button className="hover:text-yellow-500 duration-200 btn" onClick={() => handleupdate(category)}><FaEdit /></button>

                                </td>

                            </tr>)
                        }


                    </tbody>
                </table>
            </div>
            <button onClick={() => document.getElementById('addCategory').showModal()}
                className="py-4   px-6  md:px-12   bg-[#2E8B57] text-white ">Add Category</button>

            <AddCategory refetch={refetch} />
            <UpdateCategoryModal category={category} refetch={refetch} />
        </div>
    );
};

export default ManageCategory;