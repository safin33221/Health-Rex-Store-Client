import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { FaTrashAlt } from "react-icons/fa";
import { GrUpdate } from "react-icons/gr";
import AddCategory from "./AddCategory";

const ManageCategory = () => {
    const axiosPublic = useAxiosPublic()
    const { data: categoris } = useQuery({
        queryKey: ['categoris'],
        queryFn: async () => {
            const res = await axiosPublic.get('/category')
            return res.data
        }
    })
    return (
        <div className="w-10/12 mx-auto">
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
                                        <button><FaTrashAlt/></button>
                                        <button><GrUpdate/></button>
                                </td>

                            </tr>)
                        }
                        

                    </tbody>
                </table>
            </div>
            <button onClick={() => document.getElementById('addCategory').showModal()}
             className="btn my-10 bg-primary">Add Category</button>
             <AddCategory/>
        </div>
    );
};

export default ManageCategory;