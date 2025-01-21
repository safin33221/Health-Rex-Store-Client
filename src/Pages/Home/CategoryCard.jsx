import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";


const CategoryCard = () => {
    const axiosPublic = useAxiosPublic()
    const { data: categoris } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await axiosPublic.get('/category')
            return res.data
        }
    })
    return (
        <div className="w-10/12 mx-auto mt-14">
          
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {
                    categoris?.slice(0,8).map(category => <div key={category._id} className="card bg-base-100  shadow-xl">
                        <figure>
                            <img
                                className="h-44"
                                src={category?.image}
                                alt="Shoes" />
                                
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">
                               {category?.name}
                            </h2>
                            <p>If a dog chews shoes whose shoes does he choose?</p>
                            <div className="card-actions justify-end">
                                <div className="badge badge-outline">Fashion</div>
                                <div className="badge badge-outline">Products</div>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default CategoryCard;