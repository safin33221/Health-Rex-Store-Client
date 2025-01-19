import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";


const ManageUsers = () => {
    const axiosPublic = useAxiosPublic()
    const { data: users } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosPublic.get('/users')
            return res.data
        }
    })
    const haldleChangeRole = (e, user) => {
        console.log(e.target.value, user);
        const data = { role: e.target.value }
        Swal.fire({
            title:user?.email,
            text: `Are You sure to make this user form ${user?.role} to ${data?.role}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosPublic.patch(`/user/role/${user?.email}`, data)
                    .then(res => {
                        console.log(res.data);
                    })
                Swal.fire({
                    title: "Success!",
                    text: `${user?.email} role has been successfully updated`,
                    icon: "success"
                });
            }
        });
    }
    return (
        <div className="w-10/12 mx-auto">
            <Helmet title="HRS | MANAGE USERS"/>
            <h1 className="text-2xl font-bold py-5">Total Users:{users?.length}</h1>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr className="bg-secondary font-bold text-black">
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>User Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users?.map((user, index) => <tr>
                                <th>{index + 1}</th>
                                <td>{user?.name}</td>
                                <td>{user?.email}</td>
                                <td>
                                    <select onChange={(e) => haldleChangeRole(e, user)} className="select select-bordered select-sm w-full max-w-xs" defaultValue={user?.role}>
                                        <option disabled selected>select role</option>
                                        <option value="admin">Admin</option>
                                        <option value='seller'>Seller</option>
                                        <option value='user'>User</option>
                                    </select>
                                </td>
                            </tr>)
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;