import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../Firebase/Firebase.config";

export const authContext = createContext(null)
const AuthProviders = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [carts, setCart] = useState([])
    const [paymentDetails, setPaymentsDetails] = useState({})
    const googleProvider = new GoogleAuthProvider()
    
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
        setPaymentsDetails,
        setCart,
        createUserwithEmail,
        updateUserProfile,
        signInuser,
        siginUserWithGoogle,
        sigoutUser
    }

    useEffect(() => {
        const unsubcribs = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            console.log(currentUser);
        })
        return () => {
            unsubcribs()
        }
    }, [])
    return (
        <authContext.Provider value={authValue}>
            {children}
        </authContext.Provider>
    );
};

export default AuthProviders;