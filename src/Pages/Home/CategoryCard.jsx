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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {
                    categoris?.slice(0, 6).map((category, idx) =>
                        <Link to={`/categoryDetails/${category.category}`}>
                            <div key={idx} className="card bg-base-100  shadow-xl">
                                <figure>
                                    <img
                                        className="h-44"
                                        src={category?.image}
                                        alt="Shoes" />

                                </figure>
                                <div className="card-body">
                                    <h2 className="card-title">
                                        {category?.category}
                                        <div className="badge badge-outline">{category.count}</div>
                                    </h2>

                                    <div className="card-actions justify-start">

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