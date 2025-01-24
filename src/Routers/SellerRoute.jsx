import { useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";
import Loader from "../Components/Loader";


const SellerRoute = ({ children }) => {
    const { user, isloading, sigoutUser } = useAuth()
    const [role, isPending] = useRole()
    const navigate = useNavigate()
    const isSeller = role === 'seller'
    if (isloading || isPending) {
        return <Loader />
    }
    if (user && isSeller) {
        return children
    }
    else {
        sigoutUser()
        return navigate('/signIn')
    }
};

export default SellerRoute;