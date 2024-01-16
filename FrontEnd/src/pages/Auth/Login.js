import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { useAuth } from "../../context/auth";


const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [auth, setAuth] = useAuth();

    const navigate = useNavigate();
    const location = useLocation();

    // form function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/api/v1/auth/login", {
                email,
                password,
            });
            if (res && res.data.success) {
                toast.success(res.data && res.data.message);
                console.log(res.data && res.data.message);
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token
                })
                localStorage.setItem('auth', JSON.stringify(res.data));

                navigate(location.state || "/");
            } else {
                toast.error(res.data.message);
                console.log(res.data.message);

            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    return (
        <Layout title={"LOGIN"}>
            <section className="signup">
                <div className="container">
                    <div className="signup-content">
                        <div className="signup-form">
                            <h2 className="form-title">Log In</h2>
                            <form onSubmit={handleSubmit} className="register-form" id="register-form" >
                                <div className="form-group">
                                    <label htmlFor="email"><i className="zmdi zmdi-email" />< MdEmail /></label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        name="email"
                                        id="email"
                                        placeholder="Your Email" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="pass"><i className="zmdi zmdi-lock" />< RiLockPasswordFill /></label>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        name="pass"
                                        id="pass"
                                        placeholder="Password" />
                                </div>
                                <button type="submit" className="form-group fomr-button form-submit">
                                    Login
                                </button>
                                <button type="button" className="form-group fomr-button form-submit"
                                    onClick={() => { navigate('/ForgotPassword') }}>
                                    Forgot Password
                                </button>
                            </form>
                        </div>
                        <div className="signup-image">
                            <figure><img src="./images/signin-image.jpg" alt="sing up image" /></figure>
                        </div>
                    </div>
                </div>
            </section>

        </Layout>
    )
}

export default Login