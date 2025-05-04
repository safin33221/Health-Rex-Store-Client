import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import AddAdvertice from "./AddAdvertice";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const AskForAd = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { data: advertise, refetch } = useQuery({
        queryKey: ['advertise', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/seller/adds/${user?.email}`)
            return res.data
        }
    })

    return (
        <div className="md:w-10/12 mx-auto mt-10">
            <Helmet title="HRS | POST ADS" />
            {/* <h1>ask for ads------------{medicine?.length}</h1> */}
            {
                advertise?.length <= 0 ?
                    <div className=" flex flex-col items-center justify-center mt-20 ">
                        <h1 className="text-2xl font-bold ">
                            No Advertisements Found!
                        </h1>
                        <p className="text-gray-600 text-center max-w-md">
                            You haven’t posted any advertisements yet. Start promoting your products or services to reach a wider audience and boost your sales!
                        </p>
                    </div> :
                    <div className="overflow-x-auto">
                        <h1 className="text-lg md:text-2xl font-bold  mb-6">Ads Histroy</h1>
                        <table className="table">
                            {/* head */}
                            <thead className="">
                                <tr>
                                    <th>
                                        No.
                                    </th>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Description</th>

                                    <th>Status</th>
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
                                                    <div className=" h-24 w-36">
                                                        <img
                                                            src={add?.image}
                                                            className=" bg-cover object-center"
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

                                        <th>
                                            <h1
                                                className={`${add?.status === 'pending' ? 'bg-red-300' : 'bg-green-300'} h-fit p-3`}
                                            >{add?.status}</h1>
                                        </th>
                                    </tr>)
                                }


                            </tbody>


                        </table>
                    </div>
            }
            <button onClick={() => document.getElementById('addAdvertice').showModal()}
                className="btn bg-[#2E8B57] text-white my-10 font-bold">Add Advertise</button>

            <AddAdvertice refetch={refetch} />


        </div>
    );
};

export default AskForAd;