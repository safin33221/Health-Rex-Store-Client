import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { FaEye } from "react-icons/fa";

const Shop = () => {
    const axiosPublic = useAxiosPublic()
    const { data: medicines } = useQuery({
        queryKey: ['medicines'],
        queryFn: async () => {
            const res = await axiosPublic.get('/medicines')
            return res.data
        }
    })
    return (
        <div className="w-11/12 mx-auto mt-24 py-5">
            <h1 className="text-2xl font-bold">Total Medicines: {medicines?.length}</h1>
            <div className="overflow-x-auto rounded-lg">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Medicine Name</th>
                            <th>Category</th>
                            <th>Company</th>
                            <th></th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            medicines?.map((medicine, index) => <tr className="bg-base-200">
                                <th>{index + 1}</th>
                                <td>{medicine?.itemName	}</td>
                                <td>{medicine?.category}</td>
                                <td>{medicine?.company}</td>
                                <td></td>
                                <td>
                                    <button className="btn">Select</button>
                                    <button className="btn ml-4"><FaEye/></button>
                                </td>
                            </tr>)
                        }


                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default Shop;