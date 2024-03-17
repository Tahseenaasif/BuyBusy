
import { createContext, useContext, useEffect, useState } from "react";
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword} from 'firebase/auth';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const authContext = createContext();
export function useAuthValue() {
    const value = useContext(authContext);
    return value;
}
export function AuthContext({ children }) {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [userLoggedIn, setUserLoggedIn] = useState(null);

    async function createUser(data) {
        const auth = getAuth();
        try {
            await createUserWithEmailAndPassword(auth, data.email, data.password);
            toast.success("New user Created, Please LogIn to Continue !!");
        } catch (error) {
            toast.warn("Error In Signin......");
        }
       
    }
    
    async function signIn(data) {
        const auth = getAuth();
        try {
            await signInWithEmailAndPassword(auth, data.email, data.password);
            toast.success("Sign In Successfully!!!");
            setLoggedIn(true);
            sessionStorage.setItem("isLoggedIn", true);
    
            return true;
        } catch (error) {
            toast.error("Wrong UserName/Password, Try Again");
            return false;
        }
    }
    
     function signOut() {
            const auth = getAuth();
        
            try {
                toast.success("Logged out successfully!");
                sessionStorage.removeItem("isLoggedIn");
                
                setLoggedIn(false);
            } catch (error) {
                console.error("Error during logout:", error);
                toast.error("Error logging out. Please try again.");
            }
        };



    return (
              <>
            <authContext.Provider value={
                {
                    createUser,
                    isLoggedIn,
                    setLoggedIn,
                    signIn,
                    userLoggedIn,
                    setUserLoggedIn,
                    signOut
                }
            }>
                <ToastContainer />
                {children}
            </authContext.Provider>
        </>
    );
}