import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Link } from "react-router-dom";


const CategoryCard = () => {
    const axiosPublic = useAxiosPublic()
    const { data: categoris } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await axiosPublic.get('/categoryDetails')
            return res.data
        }
    })
    return (
        <div className="w-10/12 mx-auto my-14">
            <div className="text-center my-10">
                <h1 className="text-2xl md:text-4xl font-bold text-gray-800">
                    Explore Our Wide Range of Medicines__
                </h1>
                <p className="mt-4 text-lg md:text-xl text-gray-600">
                    Find the right medicines for your health needs, carefully categorized for your convenience.
                </p>
                
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {
                    categoris?.slice(0, 6).map((category, idx) =>
                        <Link to={`/categoryDetails/${category.category}`} key={idx}>
                            <div key={idx} className="card bg-green-100 hover:border-secondary border duration-100   shadow-xl hover:shadow-2xl ">
                                <figure>
                                    <img
                                        className="h-44 w-full"
                                        src={category?.image}
                                        alt="Shoes" />

                                </figure>
                                <div className="card-body">
                                    <h2 className="card-title">
                                        {category?.category}
                                    </h2>

                                    <div className="card-actions justify-start">
                                        <div className="badge badge-outline">Available Medicines ({category.count})</div>

                                    </div>
                                </div>
                            </div>
                        </Link>)
                }
            </div>
        </div>
    );
};

export default CategoryCard;