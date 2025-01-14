import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import SignUp from "../Pages/Auth/SignUp";
import SignIn from "../Pages/Auth/SignIn";
import Dashboard from "../Layout/Dashboard";
import ManageMedicines from "../Pages/Sellers/ManageMedicines";
import SellerHome from "../Pages/Sellers/SellerHome";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: 'signUp',
                element: <SignUp />
            },
            {
                path: 'signIn',
                element: <SignIn />
            },
        ]
    },
    {
        path: 'dashboard',
        element: <Dashboard />,
        children: [
            
            {
                path: 'sellerHome',
                element: <SellerHome />
            },
            {
                path:'manageMedicines',
                element:<ManageMedicines/>
            }
        ]
    }
])

export default router;