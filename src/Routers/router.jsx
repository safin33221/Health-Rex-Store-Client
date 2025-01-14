import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import SignUp from "../Pages/Auth/SignUp";
import SignIn from "../Pages/Auth/SignIn";
import Dashboard from "../Layout/Dashboard";

const router = createBrowserRouter([
    {
        path:'/',
        element:<MainLayout/>,
        children:[
            {
                path:'/',
                element:<Home/>
            },
            {
                path:'/signUp',
                element:<SignUp/>
            },
            {
                path:'/signIn',
                element:<SignIn/>
            },
        ]
    },
    {
        path:'/dashborad',
        element:<Dashboard/>
    }
])

export default router;