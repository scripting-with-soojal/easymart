import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";
import HomePage from "../../pages/HomePage";
import ForgotPassword from "../../pages/Auth/ForgotPassword";

export default function FPprivate() {
    const [ok, setOk] = useState(false);
    const [auth, setAuth] = useAuth();

    useEffect(() => {
        const fpauth = async () => {
            const res = await axios.get("/api/v1/auth/ForgotPassword");
            if (!res.data.ok) {
                setOk(true);
            }
            else {
                setOk(false)
            }
        }
        fpauth();
    }, [auth?.token]);

    return ok ? <ForgotPassword /> : <Spinner />;
}