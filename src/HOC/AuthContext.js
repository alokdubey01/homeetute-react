import { createContext, useContext, useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { Navigate } from "react-router-dom";

const authContext = createContext()

export default function useAuth() {
  return useContext(authContext)
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user)
        setLoading(false)
      } else {
        setUser(null)
        setLoading(false)
      }
    })
    return unsubscribe
  }, [])

  const logout = async () => {
    signOut(auth)
    console.log("Logged out")
    setUser(null)
    Navigate('/')
  }

  // exporing all the functions and states
  const value = {
    user,
    error,
    logout,
    setUser
  }

  return (
    <authContext.Provider value={value}>
      {/* {!loading && children} */}
      {!loading ? children : <div>Loading...</div>}
    </authContext.Provider>
  )

}