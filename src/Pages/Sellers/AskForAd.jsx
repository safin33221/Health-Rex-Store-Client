import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import AddAdvertice from "./AddAdvertice";

const AskForAd = () => {
    const { user } = useAuth()
    const axiosPublic = useAxiosPublic()
    // const { data: medicine } = useQuery({
    //     queryKey: ['medicine', user?.email],
    //     queryFn: async () => {
    //         const res = await axiosPublic.get(`/seller/medicine/${user?.email}`)
    //         return res.data
    //     }
    // })
    // console.log(medicine);
    return (
        <div className="w-10/12 mx-auto">
            {/* <h1>ask for ads------------{medicine?.length}</h1> */}
            <h1>no adbertice avaible now</h1>
            <button onClick={() => document.getElementById('addAdvertice').showModal()}
                className="btn">Add Advertice</button>

                <AddAdvertice/>


        </div>
    );
};

export default AskForAd;