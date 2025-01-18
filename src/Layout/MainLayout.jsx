import { Outlet } from "react-router-dom";
import Navbar from "../Pages/Shared/Navbar";
import Footer from "../Pages/Shared/Footer";

const MainLayout = () => {
    return (
        <div>
            <nav>
                <Navbar />
            </nav>
            <main className="min-h-screen mt-24 w-11/12 mx-auto">
                <Outlet />
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    );
};

export default MainLayout;