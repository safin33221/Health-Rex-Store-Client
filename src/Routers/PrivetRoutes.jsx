import { useNavigate } from 'react-router-dom';
import Loader from '../Components/Loader';
import useAuth from '../Hooks/useAuth'

const PrivetRoutes = ({ children }) => {
    const { user, isloading } = useAuth()

    const navigate = useNavigate()
    if (isloading) {
        return <Loader />
    }
    if (user) {
        return children
    }
    return navigate('/signIn')
};

export default PrivetRoutes;