import { useState, useContext, createContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        user: null,
        token: ""
    })

    axios.defaults.headers.common["Authorization"] = auth?.token;

    useEffect(() => {
        const data = localStorage.getItem("auth");
        if (data) {
            setAuth({
                ...auth,
                user: JSON.parse(data).user,
                token: JSON.parse(data).token,
            })
        }
    }, [])
    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    )
}

//custom Hook
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider }