import { Helmet } from "react-helmet-async";
import Sliders from "../../Components/Sliders";
import CategoryCard from "./CategoryCard";
import DiscountsProducts from "./DiscountsProducts";
import Testimonials from "./Testimonials";

const Home = () => {
    return (
        <div className="">
            <Helmet title="HRS | HOME" />
            <section>
                <Sliders />
            </section>
            <section>
                <CategoryCard />
            </section>
            <section>
                <DiscountsProducts />
            </section>
            <section>
                <Testimonials />
            </section>
        </div>
    );
};

export default Home;