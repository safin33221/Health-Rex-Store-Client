import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import AddAdvertice from "./AddAdvertice";
import { Helmet } from "react-helmet-async";

const AskForAd = () => {
    const { user } = useAuth()
    const axiosPublic = useAxiosPublic()
    const { data: advertise,refetch } = useQuery({
        queryKey: ['advertise', user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/seller/adds/${user?.email}`)
            return res.data
        }
    })

    return (
        <div className="w-10/12 mx-auto">
            <Helmet title="HRS | POST ADS"/>
            {/* <h1>ask for ads------------{medicine?.length}</h1> */}
            {
                advertise?.length <= 0 ? <h1 className="text-2xl font-bold text-center mt-20">No Advertise available now</h1> :
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>

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

                                        <th>
                                            {add?.status}
                                        </th>
                                    </tr>)
                                }


                            </tbody>


                        </table>
                    </div>
            }
            <button onClick={() => document.getElementById('addAdvertice').showModal()}
                className="btn bg-primary my-10 font-bold">Add Advertice</button>

            <AddAdvertice refetch={refetch} />


        </div>
    );
};

export default AskForAd;