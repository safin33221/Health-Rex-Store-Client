import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../Firebase/Firebase.config";
import useAxiosPublic from '../Hooks/useAxiosPublic';

export const authContext = createContext(null)
const AuthProviders = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isloading, setLoading] = useState(true)
    const [carts, setCart] = useState([])
    const [paymentDetails, setPaymentsDetails] = useState({})
    const googleProvider = new GoogleAuthProvider()
    const axiosPublic = useAxiosPublic()
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'pastel')

    //theme tollager
    const toggleTheme = () => {
        const newtheme = theme === 'pastel' ? 'forest' : 'pastel'
        setTheme(newtheme)
        localStorage.setItem('theme',newtheme)
        
    }
    useEffect(()=>{
        document.documentElement.setAttribute('data-theme', theme)
    },[theme])

    //crete user with email and pass
    const createUserwithEmail = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    //update profile
    const updateUserProfile = (name, photo) => {
        setLoading(true)
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo
        })
    }
    //sing in user with email
    const signInuser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    //sing in user with gogle
    const siginUserWithGoogle = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }
    //logout user
    const sigoutUser = () => {
        return signOut(auth)
    }
    const authValue = {
        user,
        carts,
        paymentDetails,
        isloading,
        theme,
        setLoading,
        toggleTheme,
        setPaymentsDetails,
        setCart,
        createUserwithEmail,
        updateUserProfile,
        signInuser,
        siginUserWithGoogle,
        sigoutUser,
    }

    useEffect(() => {
        const unsubcribs = onAuthStateChanged(auth, (currentUser) => {

            if (currentUser) {
                console.log(currentUser);
                setUser(currentUser);
                const userInfo = { email: currentUser?.email }
                axiosPublic.post('/jwt', userInfo)
                    .then(res => {

                        if (res.data?.token) {
                            localStorage.setItem('token', res.data.token)
                            setLoading(false)
                        }
                    })
            } else {
                setUser(currentUser);
                setLoading(false)
                localStorage.removeItem('token')
            }

        })
        return () => {
            unsubcribs()
        }
    }, [user])
    return (
        <authContext.Provider value={authValue}>
            {children}
        </authContext.Provider>
    );
};

export default AuthProviders;