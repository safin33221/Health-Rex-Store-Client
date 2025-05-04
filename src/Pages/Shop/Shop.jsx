import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { FaCartArrowDown, FaEye } from "react-icons/fa";
import MedicineDetails from "./MedicineDetails";
import { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import moment from "moment";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loader from "../../Components/Loader";
import { CgDetailsMore } from "react-icons/cg";
import useCartData from "../../Hooks/useCartData";

const Shop = () => {
    const [cartsData, refetch] = useCartData()
    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const [search, setSearch] = useState('')
    const [sort, setSort] = useState('ascending')
    const [medicineDetails, setMedicineDetails] = useState(null)
    const [currentPage, setCurrentPage] = useState(0)
    const [count, setCount] = useState(0)
    const itemPerPages = 10
    const { data: medicines, isPending } = useQuery({
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
                refetch()
                if (res.data.insertedId) {

                    toast.success(`${cartInfo.itemName} has been added to your cart.`, {
                        position: "top-center",
                        autoClose: 1000,


                    });
                } else {
                    toast.error(res.data.message, {
                        position: "top-center",
                        autoClose: 1000,


                    });
                }
            })
    }

    return (
        <div className="w-11/12 mx-auto  py-5">
            <Helmet title="HRS | SHOP" />
            <div className="flex flex-col md:flex-row justify-between md:items-center py-5">
                <h1 className="text-lg md:text-2xl font-bold">Total Medicines: {medicines?.length}</h1>
                <div className="felx gap-x-10" >
                    <button onClick={() => setSort(sort == 'ascending'? 'dscending': 'ascending')} className="border mr-5  focus:outline-none  select-sm " name="" id="">
                        
                        {sort =='ascending' ?"Low to High": "High to Low" }
                        {/* <option value="ascending">Ascending</option>
                        <option value="dscending">Dscending</option> */}
                    </button>
                    <input onChange={(e) => setSearch(e.target.value)} placeholder="search medicine " type="text" className="input focus:outline-none input-bordered  input-sm " />
                </div>
            </div>
            <div className="overflow-x-auto rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {
                        medicines?.map((medicine, idx) => <div className=" shadow-2xl rounded-lg border  ">
                            <div key={idx} className="">
                                <img className="w-full h-[150px]   rounded-lg bg-center object-center" src={medicine?.image} alt="no image" />
                            </div>
                            <div className="flex  items-center">
                                <div className="m-5">
                                    <h1 className="text-xl "><span className="font-bold">{medicine?.itemName}</span></h1>

                                    <h1 className="">Mass Unit	: <span className="font-medium">{medicine?.massUnit}</span></h1>
                                    <h1 className="">Price PerUnit: <span className="font-medium">{medicine?.pricePerUnit} tk</span></h1>

                                </div>
                                <div className="flex gap-4">
                                    <button onClick={() => handleAddToCart(medicine)} className="text-2xl btn hover:text-[#006775f2] transition-all duration-200 ease-linear"><FaCartArrowDown /></button>
                                    <button onClick={() => handleDetails(medicine)} className="text-2xl btn hover:text-[#006775f2] transition-all duration-200 ease-linear"><CgDetailsMore /></button>

                                </div>
                            </div>
                        </div>)
                    }
                </div>
                <div className="m-5">
                    <button
                        onClick={() => setCurrentPage(currentPage > 0 ? currentPage - 1 : currentPage)}
                        className="btn">Prev</button>
                    {
                        pages?.map((page, idx) => <div key={idx} className=" join">
                            <button
                                className={`join-item btn mx-2 ${currentPage === page && 'bg-[#006775f2] text-white'}`}
                                onClick={() => setCurrentPage(page)}
                            >{page}</button>

                        </div>)
                    }
                    <button
                        onClick={() => setCurrentPage(currentPage < pages.length - 1 ? currentPage + 1 : currentPage)}
                        className="btn">Next</button>
                </div>
            </div>
            <MedicineDetails medicineDetails={medicineDetails} />
        </div >
    );
};

export default Shop;