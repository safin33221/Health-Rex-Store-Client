import axios from "axios";
import useAuth from "../Hooks/useAuth"
import { useNavigate } from "react-router-dom";
const axiosSecure = axios.create({
    baseURL: window.location.hostname === 'localhost' ? 'http://localhost:3000' : 'https://medicing-selling-server-side.vercel.app'
})
const useAxiosSecure = () => {
    const { sigoutUser } = useAuth()
    const navigate = useNavigate()
    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('token')
        config.headers.authorization = `Bearer ${token}`
        return config
    }, function (error) {
        return Promise.reject(error)
    })

    axiosSecure.interceptors.response.use(function (response) {
        return response
    }, async (error) => {

        const status = error.response.status
        if (status === 401 || status === 403) {
            sigoutUser()
            navigate('/auth/signIn')
        }
        return Promise.reject(error)
    })

    return axiosSecure
};

export default useAxiosSecure;