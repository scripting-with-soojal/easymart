import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoPerson } from "react-icons/io5";
import { FaAddressCard } from "react-icons/fa";
import { FaSquarePhone } from "react-icons/fa6";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Profile = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [answer, setAnswer] = useState("");
    const navigate = useNavigate();
    const [auth] = useAuth();

    //handle Submit function
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
    useEffect(() => {
        setName(auth?.user?.name);
        setEmail(auth?.user?.email);
        setPhone(auth?.user?.phone);
        setAddress(auth?.user?.address);
    }, [])
    return (
        <Layout title={"Dashboard - Create Category"}>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu />
                    </div>
                    <div className="col-md-9">
                        <section className="signup">
                            <div className="container">
                                <div className="signup-content">
                                    <div className="signup-form">
                                        <h2 className="form-title">{auth?.user?.name}'s PROFILE</h2>
                                        <form onSubmit={handleSubmit} className="register-form" id="register-form" >
                                            <div className="form-group">
                                                <label htmlFor="name"><i className="zmdi zmdi-account material-icons-name" /><IoPerson /></label>

                                                <input
                                                    type="text"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    name="name"
                                                    id="name"
                                                    placeholder={name} />
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
                                                    placeholder="Your Email"
                                                    disabled
                                                />
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
                                                UPDATE
                                            </button>
                                        </form>
                                    </div>
                                    {/* <div className="signup-image">
                                        <figure><img src="./images/signup-image.jpg" alt="sing up image" /></figure>
                                        <NavLink to="/login" className="signup-image-link">I am already member</NavLink>
                                    </div> */}
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Profile;