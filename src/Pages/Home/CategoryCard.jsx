import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import Loader from "../../Components/Loader";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';




import { Navigation } from 'swiper/modules';
import 'swiper/css/navigation';


const CategoryCard = () => {
    const axiosPublic = useAxiosPublic()
    const { data: categoris, isPending } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await axiosPublic.get('/categoryDetails')
            return res.data
        }
    })
    if (isPending) return <Loader />
    return (
        <div className="w-11/12 mx-auto my-14">
            <div className="text-center my-10">
                <h1 className="text-2xl md:text-4xl font-bold ">
                    Explore Our Wide Range of Medicines__
                </h1>
                <p className="mt-4 text-lg md:text-xl ">
                    Find the right medicines for your health needs, carefully categorized for your convenience.
                </p>

            </div>


            <Swiper
                navigation={true}
                modules={[Pagination, Autoplay, Navigation]}
                spaceBetween={10}



                // autoplay={{ delay: 3000, disableOnInteraction: false }}
                className="w-full h-full "
                style={{ zIndex: "0" }}

                breakpoints={{
                    340: {
                        slidesPerView: 1.2, // 1 slide on mobile screens
                    },
                    768: {
                        slidesPerView: 2, // 2 slides on tablets
                    },
                    1024: {
                        slidesPerView: 5, // 3 slides on larger screens
                    },
                }}
            >
                {
                    categoris?.map((category, idx) =>
                        <SwiperSlide>
                            <Link to={`/categoryDetails/${category.category}`} key={idx}>
                                <div key={idx} className="max-w-sm card  bg-base-200  border duration-100   shadow-xl hover:shadow-2xl  mx-auto">
                                    <figure>
                                        <img
                                            className="h-44 w-full shadow-xl border-b bg-center object-center"
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
                            </Link>
                        </SwiperSlide>
                    )
                }

            </Swiper>





        </div>
    );
};

export default CategoryCard;