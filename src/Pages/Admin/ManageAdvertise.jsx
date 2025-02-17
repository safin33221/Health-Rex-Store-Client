import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import Loader from "../../Components/Loader";

const ManageAdvertise = () => {
    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()
    const { data: advertise,refetch,isPending } = useQuery({
        queryKey: ['advertise'],
        queryFn: async () => {
            const res = await axiosSecure.get('/addvertisements')
            return res.data;
        }
    })

    const handleStatus = (data, status) => {

        axiosSecure.patch(`/askAddverticement/status`, { data, status })
            .then(res => {
              
                refetch()
            })
    }
    if(isPending) return <Loader/>
    return (
        <div className="lg:w-10/12 pt-10  mx-auto">
            <Helmet title="HRS | MANAGE ADVERTISE"/>
            <h1 className='text-xl font-bold ml-20'>Manage Advertise</h1>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr className="text-lg">
                            <th>
                                No.
                            </th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th> Seller email</th>
                            <th>Manage Slide</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            advertise?.map((add, idx) => <tr key={add._id}>
                                <th>
                                    {idx + 1}
                                </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="">
                                            <div className="bg-cover h-24 w-36">
                                                <img
                                                    src={add?.image}
                                                    className=" object-contain bg-contain"
                                                    alt="loading" />
                                            </div>
                                        </div>

                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <div className="font-bold">{add?.name}</div>

                                    </div>
                                </td>
                                <td>
                                    {add?.description}
                                </td>
                                <td>{add?.email}</td>
                                <th>
                                    {
                                        add?.status === 'pending' &&
                                            <button
                                                onClick={() => handleStatus(add, 'success')}
                                                className=" text-xl "><FaRegEyeSlash /></button>
                                            
                                    }
                                    {
                                        add?.status === 'success' &&
                                        
                                        <button onClick={() => handleStatus(add, 'pending')}
                                         className=" text-xl "><FaRegEye /></button>
                                            
                                    }
                                </th>
                            </tr>)
                        }


                    </tbody>


                </table>
            </div>
        </div>
    );
};

export default ManageAdvertise;