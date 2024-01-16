import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { useAuth } from "../../context/auth";


const ForgotPassword = () => {

    const [email, setEmail] = useState("");
    const [newpassword, setNewpassword] = useState("");
    const [answer, setAnswer] = useState("");
    const [auth, setAuth] = useAuth();

    const navigate = useNavigate();
    const location = useLocation();

    // form function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/api/v1/auth/ForgotPassword", {
                email,
                newpassword,
                answer
            });
            navigate("/");
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    return (
        <Layout title={"ForgotPassword"}>
            <section className="signup">
                <div className="container">
                    <div className="signup-content">
                        <div className="signup-form">
                            <h2 className="form-title">Update Password </h2>
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
                                        type="text"
                                        value={answer}
                                        onChange={(e) => setAnswer(e.target.value)}
                                        name="answer"
                                        id="answer"
                                        placeholder="Your Favourite Sport" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="pass"><i className="zmdi zmdi-lock" />< RiLockPasswordFill /></label>
                                    <input
                                        type="password"
                                        value={newpassword}
                                        onChange={(e) => setNewpassword(e.target.value)}
                                        name="pass"
                                        id="pass"
                                        placeholder="NewPassword" />
                                </div>
                                <button type="submit" className="form-group fomr-button form-submit">
                                    Update Password
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

export default ForgotPassword