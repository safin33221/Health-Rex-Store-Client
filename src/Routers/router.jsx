import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import SignUp from "../Pages/Auth/SignUp";
import SignIn from "../Pages/Auth/SignIn";
import Dashboard from "../Layout/Dashboard";
import ManageMedicines from "../Pages/Sellers/ManageMedicines";
import SellerHome from "../Pages/Sellers/SellerHome";
import ManageUsers from "../Pages/Admin/ManageUsers";
import AskForAd from "../Pages/Sellers/AskForAd";
import ManageAdvertise from "../Pages/Admin/ManageAdvertise";
import ManageCategory from "../Pages/Admin/ManageCategory";

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
            //Manage Admin
            {
                path:'manageUsers',
                element:<ManageUsers/>
            },
            {
                path:'manageAdvertise',
                element:<ManageAdvertise/>
            },
            {
                path:'manageCategory',
                element:<ManageCategory/>
            },



            //manage seller
            {
                path: 'sellerHome',
                element: <SellerHome />
            },
            {
                path:'manageMedicines',
                element:<ManageMedicines/>
            },
            {
                path:'askForAd',
                element:<AskForAd/>
            },
        ]
    }
])

export default router;