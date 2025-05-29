import { useNavigate } from "react-router-dom";
import Loader from "../Components/Loader";
import useAuth from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";


const AdminRoute = ({ children }) => {
    const { user, isloading, sigoutUser } = useAuth()
    const [role, isPending] = useRole()
    const navigate = useNavigate()
    const isAdmin = role === 'admin'
    if (isloading || isPending) {
        return <Loader />
    }
    if (user && isAdmin) {
        return children
    }
    else {
        sigoutUser()
        return navigate('/auth/signIn')
    }


};

export default AdminRoute;