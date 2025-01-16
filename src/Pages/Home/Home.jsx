import Sliders from "../../Components/Sliders";
import CategoryCard from "./CategoryCard";

const Home = () => {
    return (
        <div className="pt-20">
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