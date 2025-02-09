import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Helmet } from "react-helmet-async";

const ManageAdvertise = () => {
    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()
    const { data: advertise,refetch } = useQuery({
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

    return (
        <div className="lg:w-10/12 pt-10  mx-auto">
            <Helmet title="HRS | MANAGE ADVERTISE"/>
            <h1 className='text-xl font-bold ml-20'>Manage Advertise</h1>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className="bg-secondary">
                            <th>

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
                                        <div className="avatar">
                                            <div className="bg-cover h-24 w-24">
                                                <img
                                                    src={add?.image}
                                                    className=" bg-contain"
                                                    alt="Avatar Tailwind CSS Component" />
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