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
import Shop from "../Pages/Shop/Shop";
import Cart from "../Pages/Cart/Cart";
import CheackOut from "../Pages/CheckOut/CheackOut";
import Invoice from "../Pages/CheckOut/Invoice";
import PaymentManageMent from "../Pages/Admin/PaymentManageMent";
import SalesReports from "../Pages/Admin/SalesReports";
import PaymentsHistory from "../Pages/Sellers/PaymentsHistory";
import AdminHome from "../Pages/Admin/AdminHome";
import CategoryDetails from "../Pages/Category/CategoryDetails";
import UserPayments from "../Pages/Users/UserPayments";
import PrivetRoutes from "./PrivetRoutes";
import AdminRoute from "./AdminRoute";
import SellerRoute from "./SellerRoute";
import Profile from "../Pages/Shared/Profile";
import ErrorPage from "../Pages/Shared/ErrorPage ";
import About from "../Pages/About/About";

import DoctorDetails from "../Pages/DoctorDetails/DoctorDetails";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/shop',
                element: <Shop />
            },
            {
                path: '/about',
                element: <About />
            },
            {
                path: '/Doctors',
                element: <DoctorDetails />
            },
            {
                path: '/categoryDetails/:category',
                element: <CategoryDetails />
            },
            {
                path: '/cart',
                element: <PrivetRoutes><Cart /></PrivetRoutes>
            },
            {
                path: '/cheackOut',
                element: <PrivetRoutes><CheackOut /></PrivetRoutes>
            },
            {
                path: '/invoice/:transtionId',
                element: <PrivetRoutes><Invoice /></PrivetRoutes>
            },

            {
                path: '/profile',
                element: <PrivetRoutes><Profile /></PrivetRoutes>
            },
        ]
    },
    {
        path: '/auth',
        children: [
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
                path: 'adminHome',
                element: <AdminRoute><AdminHome /></AdminRoute>
            },
            {
                path: 'manageUsers',
                element: <AdminRoute><ManageUsers /></AdminRoute>
            },
            {
                path: 'manageAdvertise',
                element: <AdminRoute><ManageAdvertise /></AdminRoute>
            },
            {
                path: 'manageCategory',
                element: <AdminRoute><ManageCategory /></AdminRoute>
            },
            {
                path: 'managePayments',
                element: <AdminRoute><PaymentManageMent /></AdminRoute>
            },
            {
                path: 'salesReport',
                element: <AdminRoute><SalesReports /></AdminRoute>
            },



            //manage seller
            {
                path: 'sellerHome',
                element: <SellerRoute><SellerHome /></SellerRoute>
            },
            {
                path: 'manageMedicines',
                element: <SellerRoute> <ManageMedicines /></SellerRoute>
            },
            {
                path: 'askForAd',
                element: <SellerRoute><AskForAd /></SellerRoute>
            },
            {
                path: 'paymentsHistory',
                element: <SellerRoute><PaymentsHistory /></SellerRoute>
            },

            {
                path: 'profile',
                element: <Profile />
            },




            //-------manage Users-----------
            {
                path: 'userPayments',
                element: <UserPayments />
            },
        ]
    }
])

export default router;