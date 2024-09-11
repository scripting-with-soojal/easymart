import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";
import { Modal } from "antd";
// import braintree from "braintree";
import BraintreeHostedFields from "./BraintreeHostedFields";

const CartPage = () => {
    const [auth, setAuth] = useAuth();
    const [cart, setCart] = useCart();
    const [clientToken, setClientToken] = useState("");
    const [instance, setInstance] = useState(null);
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const navigate = useNavigate();

    // Total price
    const totalPrice = () => {
        try {
            let total = 0;
            cart?.map((item) => {
                total += item.price;
            });
            return total.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
            });
        } catch (error) {
            console.log(error);
        }
    };

    // Remove cart item
    const removeCartItem = (pid) => {
        try {
            let myCart = [...cart];
            let index = myCart.findIndex((item) => item._id === pid);
            myCart.splice(index, 1);
            setCart(myCart);
            localStorage.setItem("cart", JSON.stringify(myCart));
        } catch (error) {
            console.log(error);
        }
    };

    //Handle Payments Through Razorpay

    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }

    async function displayRazorpay() {
        try {
            const res = await loadScript(
                "https://checkout.razorpay.com/v1/checkout.js"
            );

            if (!res) {
                alert("Razorpay SDK failed to load. Are you online?");
                return;
            }

            let total = 0;
            cart?.map((item) => {
                total += item.price;
            });

            // localStorage.removeItem("cart");

            let paymentres = {
                amount: total,
                currency: "USD",
                payment_capture: 1,
                order_id: "00" + Math.floor(Math.random() + Math.floor(Math.random() + Date.now()))
            }
            const result = await axios.post("http://localhost:8080/api/v1/product/razorpay", paymentres);

            if (!result) {
                alert("Server error. Are you online?");
                return;
            }

            const { amount, id: order_id, currency } = result.data.data;

            const options = {
                key: "rzp_test_Y1A0xZpQndgKyl", // Enter the Key ID generated from the Dashboard
                amount: amount.toString(),
                currency: currency,
                name: "Easy_mart",
                description: "Test",
                // image: { logo },
                order_id: order_id,
                handler: async function (response) {
                    const data = {
                        orderCreationId: order_id,
                        razorpayPaymentId: response.razorpay_payment_id,
                        razorpayOrderId: response.razorpay_order_id,
                        razorpaySignature: response.razorpay_signature,
                    };
                    // const result = await axios.post("http://localhost:8080/api/v1/product/razorpay", razorpayPaymentId);
                    // await localStorage.removeItem("cart");
                    setCart([]);
                    alert(`Payment done of amount ${amount}`);
                    navigate("/dashboard/user/orders");
                },
                prefill: {
                    name: `${auth?.user?.name}`,
                    email: `${auth?.user?.email}`,
                    contact: `${auth?.user?.contact}`,
                },
                notes: {
                    address: "IET-DAVV, Indore",
                },
                theme: {
                    color: "#61dafb",
                },
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        } catch (error) {
            console.log(error);
        }
    }

    const handlePaymentMethodReceived = async (nonce) => {
        try {
            setLoading(true);
            const { data } = await axios.post("/api/v1/product/braintree/payment", {
                nonce,
                cart,
            });
            setLoading(false);
            localStorage.removeItem("cart");
            setCart([]);
            navigate("/dashboard/user/orders");
            toast.success("Payment Completed Successfully");
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };
    return (
        <Layout>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="text-center bg-light p-2 mb-1">
                            {`Hello ${auth?.token && auth?.user?.name}`}
                        </h1>
                        <h4 className="text-center">
                            {cart?.length
                                ? `You Have ${cart.length} items in your cart ${auth?.token ? "" : "please login to checkout"
                                }`
                                : " Your Cart Is Empty"}
                        </h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-8">
                        {cart?.map((p) => (
                            <div className="row mb-2 p-3 card flex-row" key={p._id}>
                                <div className="col-md-4">
                                    <img
                                        src={`/api/v1/product/product-photo/${p._id}`}
                                        className="card-img-top"
                                        alt={p.name}
                                        width="100px"
                                        height={"100px"}
                                    />
                                </div>
                                <div className="col-md-8">
                                    <p>{p.name}</p>
                                    <p>{p.description.substring(0, 30)}</p>
                                    <p>Price : {p.price}</p>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => removeCartItem(p._id)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="col-md-4 text-center">
                        <h2>Cart Summary</h2>
                        <p>Total | Checkout | Payment</p>
                        <hr />
                        <h4>Total : {totalPrice()} </h4>
                        {auth?.user?.address ? (
                            <>
                                <div className="mb-3">
                                    <h4>Current Address</h4>
                                    <h5>{auth?.user?.address}</h5>
                                    <button
                                        className="btn btn-outline-warning"
                                        onClick={() => navigate("/dashboard/user/profile")}
                                    >
                                        Update Address
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="mb-3">
                                {auth?.token ? (
                                    <button
                                        className="btn btn-outline-warning"
                                        onClick={() => navigate("/dashboard/user/profile")}
                                    >
                                        Update Address
                                    </button>
                                ) : (
                                    <button
                                        className="btn btn-outline-warning"
                                        onClick={() =>
                                            navigate("/login", {
                                                state: "/cart",
                                            })
                                        }
                                    >
                                        Plase Login to checkout
                                    </button>
                                )}
                            </div>
                        )}
                        <div>
                            {!cart?.length ? (
                                "Wait For Sometime"
                            ) : (
                                <>
                                    <button className="btn btn-primary" onClick={displayRazorpay}>
                                        Pay Here
                                    </button>
                                    <Modal className="w-50 h-100 " onCancel={() => setVisible(false)} footer={null} open={visible}>
                                        <div>
                                            <BraintreeHostedFields
                                                clientToken={clientToken}
                                                onPaymentMethodReceived={handlePaymentMethodReceived}
                                            />
                                        </div>
                                    </Modal>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CartPage;
