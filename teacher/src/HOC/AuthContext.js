import { createContext, useContext, useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { Navigate } from "react-router-dom";

const authContext = createContext()

export default function useAuth() {
    return useContext(authContext)
}

export function AuthProvider({ children }) {
    const [user, setUset] = useState(null)
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUset(user)
                setLoading(false)
            } else {
                setUset(null)
                setLoading(false)
            }
        })
        return unsubscribe
    }, [])

    const logout = async () => {
        signOut(auth)
        localStorage.removeItem('userId')
        console.log("Logged out")
        setUset(null)
        Navigate('/')
    }

    // exporing all the functions and states
    const value = {
        user,
        error,
        logout,
        setUset
    }

    return (
        <authContext.Provider value={value}>
            {!loading ? children : <div>Loading...</div>}
        </authContext.Provider>
    )
}