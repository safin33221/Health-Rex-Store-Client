
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import AddMedicine from "./AddMedicine";
import { Helmet } from "react-helmet-async";

const ManageMedicines = () => {
    const axiosPublic = useAxiosPublic()
    const { data: medicines,refetch } = useQuery({
        queryKey: ['medicines'],
        queryFn: async () => {
            const res = await axiosPublic.get(`http://localhost:8080/medicines`)
            return res.data
        }
    })
    return (
        <div className='w-10/12 mx-auto py-10'>
            <Helmet title="HRS | MANAGE MEDICINES"/>
            <h1 className="text-xl ">Total Medicines :{medicines?.length}</h1>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Medicine Name</th>
                            <th>Category</th>
                            <th>Mass Unit</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            medicines?.map((medicine, idx) => <tr key={medicine._id}>
                                <th>{idx + 1}</th>
                                <td>{medicine.itemName}</td>
                                <td>{medicine.category}</td>
                                <td>{medicine.massUnit}</td>
                                <td>{medicine.pricePerUnit}</td>

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