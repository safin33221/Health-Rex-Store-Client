import { Outlet } from "react-router-dom";
import Navbar from "../Pages/Shared/Navbar";
import Footer from "../Pages/Shared/Footer";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import useAuth from "../Hooks/useAuth";
import Loader from "../Components/Loader";
import Headroom from "react-headroom";

const MainLayout = () => {

    return (
        <div>
            <Headroom >

                <Navbar />
            </Headroom>

            <main className="">
                <Outlet />
            </main>
            <footer>
                <Footer />
            </footer>
            <ToastContainer />
        </div>
    );
};

export default MainLayout;