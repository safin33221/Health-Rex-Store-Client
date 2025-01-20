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
                path: '/shop',
                element: <Shop />
            },
            {
                path: '/cart',
                element: <Cart />
            },
            {
                path: '/cheackOut',
                element: <CheackOut />
            },
            {
                path: '/invoice',
                element: <Invoice />
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
                path: 'manageUsers',
                element: <ManageUsers />
            },
            {
                path: 'manageAdvertise',
                element: <ManageAdvertise />
            },
            {
                path: 'manageCategory',
                element: <ManageCategory />
            },
            {
                path: 'managePayments',
                element: <PaymentManageMent />
            },
            {
                path: 'salesReport',
                element: <SalesReports />
            },



            //manage seller
            {
                path: 'sellerHome',
                element: <SellerHome />
            },
            {
                path: 'manageMedicines',
                element: <ManageMedicines />
            },
            {
                path: 'askForAd',
                element: <AskForAd />
            },
            {
                path: 'paymentsHistory',
                element: <PaymentsHistory />
            },
        ]
    }
])

export default router;