import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { FaEye } from "react-icons/fa";
import MedicineDetails from "./MedicineDetails";
import { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import moment from "moment";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loader from "../../Components/Loader";

const Shop = () => {
    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const [search, setSearch] = useState('')
    const [sort, setSort] = useState('')
    const [medicineDetails, setMedicineDetails] = useState(null)
    const [currentPage, setCurrentPage] = useState(0)
    const [count, setCount] = useState(0)
    const itemPerPages = 10
    const { data: medicines,isPending } = useQuery({
        queryKey: ['medicines', search, sort, currentPage, itemPerPages],
        queryFn: async () => {
            const res = await axiosPublic.get(`/medicines?search=${search}&sort=${sort}&page=${currentPage}&size=${itemPerPages}`)
            return res.data
        }
    })

    useEffect(() => {
        axiosPublic.get('/medicineCounts')
            .then(res => {
                setCount(res.data)
            })
    }, [])




    const numberOfPages = Math.ceil(count.count / itemPerPages)
    const pages = [...Array(Number(numberOfPages) || 0).keys()];




    const handleDetails = medicine => {
        setMedicineDetails(medicine);
        document.getElementById('medicinesDetails').showModal()
    }
    const handleAddToCart = data => {
        const cartInfo = {
            medicineId: data._id,
            itemName: data.itemName,
            company: data.company,
            pricePerUnit: data.pricePerUnit,
            discountPercentage: data.discountPercentage,
            time: moment().format('LLL'),
            email: user?.email,
            quantity: 1

        }
        axiosSecure.post(`/carts`, cartInfo)
            .then(res => {
                if (res.data.insertedId) {

                    toast.success(`${cartInfo.itemName} has been added to your cart.`, {
                        position: "top-right",
                        autoClose: 1000,


                    });
                } else {
                    toast.error(res.data.message, {
                        position: "top-right",
                        autoClose: 1000,


                    });
                }
            })
    }
    if(isPending) return <Loader/>
    return (
        <div className="w-11/12 mx-auto mt-20 py-5">
            <Helmet title="HRS | SHOP" />
            <div className="flex flex-col md:flex-row justify-between md:items-center py-5">
                <h1 className="text-lg md:text-2xl font-bold">Total Medicines: {medicines?.length}</h1>
                <div className="felx gap-x-10" >
                    <select onChange={(e) => setSort(e.target.value)} className="border mr-5  rounded-xl focus:outline-none border-secondary select-sm md:select-lg" name="" id="">
                        <option value="ascending">Ascending</option>
                        <option value="dscending">Dscending</option>
                    </select>
                    <input onChange={(e) => setSearch(e.target.value)} placeholder="search medicine " type="text" className="input focus:outline-none input-bordered focus:border-secondary input-sm md:input-lg" />
                </div>
            </div>
            <div className="overflow-x-auto rounded-lg">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className=" bg-secondary">
                            <th></th>
                            <th>Medicine Name</th>
                            <th>Generic Name</th>
                            <th>Category</th>
                            <th>Company</th>
                            <th>Price Per Unite</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            medicines?.map((medicine, index) => <tr key={index} className="bg-base-200">
                                <th>{index + 1}</th>
                                <td>{medicine?.itemName}</td>
                                <td>{medicine?.genericName}</td>
                                <td>{medicine?.category}</td>
                                <td>{medicine?.company}</td>
                                <td>{medicine.pricePerUnit} BTD</td>
                                <td>
                                    <button onClick={() => handleAddToCart(medicine)} className="btn btn-xs">Select</button>
                                    <button onClick={() => handleDetails(medicine)} className="btn ml-4 btn-sm"><FaEye /></button>
                                </td>
                            </tr>)
                        }


                    </tbody>

                </table>
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
                        onClick={() => setCurrentPage(currentPage < pages.length-1 ? currentPage  + 1 : currentPage)}
                        className="btn">Next</button>
                </div>
            </div>
            <MedicineDetails medicineDetails={medicineDetails} />
        </div >
    );
};

export default Shop;