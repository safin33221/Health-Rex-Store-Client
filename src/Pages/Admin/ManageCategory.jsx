import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { GrUpdate } from "react-icons/gr";
import AddCategory from "./AddCategory";
import UpdateCategoryModal from "./UpdateCategoryModal";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

const ManageCategory = () => {
    const axiosPublic = useAxiosPublic()
    const [category, setCategory] = useState({})
    const { data: categoris, refetch } = useQuery({
        queryKey: ['categoris'],
        queryFn: async () => {
            const res = await axiosPublic.get('/category')
            return res.data
        }
    })
    const handleDelete = id => {
        console.log(id);
        axiosPublic.delete(`/category/${id}`)
            .then(res => {
                console.log(res.data)
                refetch()
            })
    }
    const handleupdate = category => {
        setCategory(category)
        document.getElementById('updateCategory').showModal()
    }
    return (
        <div className="w-10/12 mx-auto">
            <Helmet title="HRS | MANAGE CATEGORY"/>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
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
                                    <button onClick={() => handleDelete(category._id)}><FaTrashAlt /></button>
                                    <button onClick={() => handleupdate(category)}><FaEdit /></button>

                                </td>

                            </tr>)
                        }


                    </tbody>
                </table>
            </div>
            <button onClick={() => document.getElementById('updateCategory').showModal()}
                className="btn my-10 bg-primary">Add Category</button>

            <AddCategory refetch={refetch} />
            <UpdateCategoryModal category={category} refetch={refetch} />
        </div>
    );
};

export default ManageCategory;