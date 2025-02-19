import { Helmet } from "react-helmet-async";
import Sliders from "../../Components/Sliders";
import CategoryCard from "./CategoryCard";
import DiscountsProducts from "./DiscountsProducts";
import Testimonials from "./Testimonials";
import Fqa from "./Fqa";
import OurMission from "./OurMisson";
import WhyChooseUs from "./WhyChooseUs";
import BehindTheScenes from "./BehindTheScenes";

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
                <OurMission/>
            </section>
            <section>
                <WhyChooseUs/>
            </section>
            <section>
                <BehindTheScenes/>
            </section>
            <section>
                <Testimonials />
            </section>
            <section>
                <Fqa />
            </section>
        </div>
    );
};

export default Home;