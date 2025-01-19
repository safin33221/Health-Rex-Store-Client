import { Helmet } from "react-helmet-async";
import Sliders from "../../Components/Sliders";
import CategoryCard from "./CategoryCard";

const Home = () => {
    return (
        <div className="">
            <Helmet title="HRS | HOME"/>
            <section>
                <Sliders/>
            </section>
            <section>
                <CategoryCard/>
            </section>
        </div>
    );
};

export default Home;