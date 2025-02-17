import { Outlet } from "react-router-dom";
import Navbar from "../Pages/Shared/Navbar";
import Footer from "../Pages/Shared/Footer";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import useAuth from "../Hooks/useAuth";
import Loader from "../Components/Loader";

const MainLayout = () => {

    return (
        <div>
            <nav>
                <Navbar />
            </nav>
            <main className="min-h-screen mt-20  mx-auto">
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