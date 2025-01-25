
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import AddMedicine from "./AddMedicine";
import { Helmet } from "react-helmet-async";
import useAuth from "../../Hooks/useAuth";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";


const ManageMedicines = () => {
    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const [search, setSearch] = useState('')
    const [sort, setSort] = useState('')
    const [currentPage, setCurrentPage] = useState(0)
    const [count, setCount] = useState(0)
    const itemPerPages = 5
    const { data: medicines, refetch } = useQuery({
        queryKey: ['medicines', user?.email, search, sort,currentPage,itemPerPages],
        queryFn: async () => {
            const res = await axiosSecure.get(`/seller/medicine/${user?.email}?search=${search}&sort=${sort}&page=${currentPage}&size=${itemPerPages}`)
            return res.data
        }
    })
    useEffect(() => {
        axiosPublic.get(`/sellers/medicine-counts/${user?.email}`)
            .then(res => {
                setCount(res.data)
            })
    }, [user?.email])

    const numberOfPages = Math.ceil(count.count / itemPerPages)
    const pages = [...Array(Number(numberOfPages) || 0).keys()];

    const handleDelete = id => {
        Swal.fire({

            text: `Are You sure to deleted this medicene`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/medicine/delete/${id}`)
                    .then(res => {
                        refetch()
                        Swal.fire({
                            title: "Success!",
                            text: ` Medicine has been successfully Deleted`,
                            icon: "success"
                        })
                    })
                    ;
            }
        });

    }
    return (
        <div className='md:w-10/12 mx-auto py-5'>
            <Helmet title="HRS | MANAGE MEDICINES" />
            <div className="flex flex-col md:flex-row justify-between md:items-center py-5 ml-16">
                <h1 className="text-lg md:text-2xl font-bold">Total Medicines: {medicines?.length}</h1>
                <div className="felx gap-x-10" >
                    <select onChange={(e) => setSort(e.target.value)} className="border mr-5  rounded-xl focus:outline-none border-secondary select-sm md:select-lg" name="" id="">
                        <option value="ascending">Ascending</option>
                        <option value="dscending">Dscending</option>
                    </select>
                    <input onChange={(e) => setSearch(e.target.value)} placeholder="search medicine " type="text" className="input focus:outline-none input-bordered focus:border-secondary input-sm md:input-lg" />
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr className="bg-secondary">
                            <th>No.</th>
                            <th>Medicine Name</th>
                            <th>Generic Name</th>
                            <th>Category</th>
                            <th>Mass Unit</th>
                            <th>Price Per Unite</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            medicines?.map((medicine, idx) => <tr key={medicine._id}>
                                <th>{idx + 1}</th>
                                <td>{medicine.itemName}</td>
                                <td>{medicine?.genericName}</td>
                                <td>{medicine.category}</td>
                                <td>{medicine.massUnit}</td>
                                <td>{medicine.pricePerUnit} BTD</td>
                                <td>
                                    <button onClick={() => handleDelete(medicine._id)} className="btn-sm hover:text-red-500 duration-300"><FaTrashAlt /></button>

                                </td>

                            </tr>)
                        }


                    </tbody>
                </table>
                <button onClick={() => document.getElementById('my_modal_5').showModal()}
                    className="btn bg-primary my-10">Add Medicine</button>

                <div className="m-5">
                    <button
                        onClick={() => setCurrentPage(currentPage > 0 ? currentPage - 1 : currentPage)}
                        className="btn">Prev</button>
                    {
                        pages?.map((page, idx) => <div key={idx} className=" join">
                            <button
                                className={`join-item btn mx-2 ${currentPage === page && 'bg-secondary'}`}
                                onClick={() => setCurrentPage(page)}
                            >{page}</button>

                        </div>)
                    }
                    <button
                        onClick={() => setCurrentPage(currentPage < pages.length - 1 ? currentPage + 1 : currentPage)}
                        className="btn">Prev</button>
                </div>
            </div>
            <AddMedicine refetch={refetch} />
        </div>
    );
};

export default ManageMedicines;