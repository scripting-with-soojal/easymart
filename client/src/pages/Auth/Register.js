import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { NavLink } from 'react-router-dom'
import { IoPerson } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaAddressCard } from "react-icons/fa";
import { FaSquarePhone } from "react-icons/fa6";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [answer, setAnswer] = useState("");
    const navigate = useNavigate();

    // form function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/api/v1/auth/register", {
                name,
                email,
                password,
                phone,
                address,
                answer
            });
            if (res && res.data.success) {
                toast.success(res.data && res.data.message);
                navigate("/login");
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    return (
        <Layout title={"Register"}>
            <section className="signup">
                <div className="container">
                    <div className="signup-content">
                        <div className="signup-form">
                            <h2 className="form-title">Register</h2>
                            <form onSubmit={handleSubmit} className="register-form" id="register-form" >
                                <div className="form-group">
                                    <label htmlFor="name"><i className="zmdi zmdi-account material-icons-name" /><IoPerson /></label>

                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        name="name"
                                        id="name"
                                        placeholder="Your Name" />
                                    {/* required */}
                                </div>
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
                                <div className="form-group">
                                    <label htmlFor="pass"><i className="zmdi zmdi-lock" /><FaSquarePhone /></label>
                                    <input
                                        type="text"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        name="phone"
                                        id="phone"
                                        placeholder="Enter Your Phone Number" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="pass"><i className="zmdi zmdi-lock" /><FaAddressCard /></label>
                                    <input
                                        type="text"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        name="address"
                                        id="address"
                                        placeholder="Address" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="pass"><i className="zmdi zmdi-lock" /><FaAddressCard /></label>
                                    <input
                                        type="text"
                                        value={answer}
                                        onChange={(e) => setAnswer(e.target.value)}
                                        name="answer"
                                        id="answer"
                                        placeholder="Enter Your Favourite Sports" />
                                </div>
                                <button type="submit" className="form-group form-button form-submit">
                                    REGISTER
                                </button>
                            </form>
                        </div>
                        <div className="signup-image">
                            <figure><img src="./images/signup-image.jpg" alt="sing up image" /></figure>
                            <NavLink to="/login" className="signup-image-link">I am already member</NavLink>
                        </div>
                    </div>
                </div>
            </section>

        </Layout>
    )
}

export default Register