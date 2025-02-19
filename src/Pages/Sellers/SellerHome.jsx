import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid } from 'recharts';

const SellerHome = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const { data: states = [], isPending } = useQuery({
        queryKey: ['states', user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/seller/sales-states/${user?.email}`);
            return res.data;
        }
    });

    const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];

    const getPath = (x, y, width, height) => {
        return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
      ${x + width / 2}, ${y}
      C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
      Z`;
    };

    const TriangleBar = (props) => {
        const { fill, x, y, width, height } = props;
        return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
    };

    if (isPending) return <Loader />;

    return (
        <div className='lg:w-10/12 mx-auto'>
            <Helmet title="HRS | SELLER HOME" />
            <h1 className='font-bold text-xl pt-10 '>Welcome '{user?.displayName}'</h1>

            <div className="flex flex-col md:flex-row gap-5 min-w-[350px] mx-auto">
                {states?.map((state, idx) => (
                    <div key={idx} className="w-full border transition-all duration-200 ease-in-out text-center p-4 rounded-lg hover:shadow-2xl">
                        <h1 className='text-xl font-bold'>{state._id}</h1>
                        <h1 className="text-2xl font-bold">{Number(state?.revenue)?.toFixed(2)} BTD</h1>
                        <p className="text-gray-500">Total sales: {state.quantity}</p>
                    </div>
                ))}
            </div>

            <div className='flex mx-auto'>
                <BarChart
                    className='mx-auto'
                    width={1000}
                    height={400}
                    data={states}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="_id" />
                    <YAxis />
                    <Bar dataKey="revenue" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
                        {states?.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                        ))}
                    </Bar>
                </BarChart>
            </div>
        </div>
    );
};

export default SellerHome;