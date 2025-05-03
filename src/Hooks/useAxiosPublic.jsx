import axios from "axios";

const axiosPublic = axios.create({
    baseURL: window.location.hostname === 'localhost' ? 'http://localhost:3000' : 'https://medicing-selling-server-side.vercel.app'
})
console.log(location.hostname);
const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;