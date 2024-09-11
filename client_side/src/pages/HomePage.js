import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { Checkbox, Radio, Col, Row } from "antd";
import { Prices } from "../components/Prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
const HomePage = () => {
    const navigate = useNavigate();
    const [cart, setCart] = useCart();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [checked, setChecked] = useState([]);
    const [radio, setRadio] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    //get all cat
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get("/api/v1/category/showcategory");
            if (data?.success) {
                setCategories(data?.category);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllCategory();
        getTotal();
    }, []);
    //get products
    const getAllProducts = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
            setLoading(false);
            setProducts(data.products);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    //getTotal COunt
    const getTotal = async () => {
        try {
            const { data } = await axios.get("/api/v1/product/product-count");
            setTotal(data?.total);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (page === 1) return;
        loadMore();
    }, [page]);
    //load more
    const loadMore = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
            setLoading(false);
            setProducts([...products, ...data?.products]);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    // filter by cat
    const handleFilter = (value, id) => {
        let all = [...checked];
        if (value) {
            all.push(id);
        } else {
            all = all.filter((c) => c !== id);
        }
        setChecked(all);
    };
    useEffect(() => {
        if (!checked.length || !radio.length) getAllProducts();
    }, [checked.length, radio.length]);

    useEffect(() => {
        if (checked.length || radio.length) filterProduct();
    }, [checked, radio]);

    // get filterd product
    const filterProduct = async () => {
        try {
            const { data } = await axios.post("/api/v1/product/product-filters", {
                checked,
                radio,
            });
            setProducts(data?.products);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Layout title={"ALL products - Best offers "}>
            <div className="row mt-3">
                <div className="col-md-2">
                    <h4 className="text-center">Filter By Category</h4>
                    {/* <div> */}
                    <Checkbox.Group onChange={(e) => console.log("hi")} className="d-flex flex-column ">
                        {categories?.map((c) => {
                            return (
                                <Row key={c._id} className="mt-4 w-100 p-0">
                                    <Col className="w-100 p" >
                                        <Checkbox value={c.name} onChange={(e) => handleFilter(e.target.checked, c._id)}>{c.name}</Checkbox>
                                        {/* <br></br> */}
                                    </Col>
                                </Row>
                            )
                        })}
                    </Checkbox.Group>
                    {/* </div> */}
                    {/*Price Filter*/}
                    <h4 className="text-center mt-3 pb-0">Filter By Price</h4>
                    <div className="d-flex flex-column mt-0" >
                        <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                            {Prices?.map((p) => {
                                return (
                                    <Row key={p._id} className="mt-4 w-100 p-0">
                                        <Col className="w-100 p-0" >
                                            <Radio value={p.array}>{p.name}</Radio>
                                        </Col>
                                    </Row>
                                )
                            })}
                        </Radio.Group>
                    </div>
                    <div>
                        <button className="btn btn-danger mt-3" onClick={() => window.location.reload()}>Reset Filter</button>
                    </div>
                </div>
                <div className="col-md-9">

                    <h1 className="text-center">All Products</h1>
                    <div className="d-flex flex-wrap">
                        {products?.map((p) => (
                            <div className="card m-2" style={{ width: "18rem" }}>
                                <img
                                    src={`/api/v1/product/product-photo/${p._id}`}
                                    className="card-img-top"
                                    alt={p.name}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{p.name}</h5>
                                    <p className="card-text">
                                        {p.description.substring(0, 30)}...
                                    </p>
                                    <p className="card-text"> $ {p.price}</p>
                                    <button class="btn btn-primary ms-1" onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
                                    <button class="btn btn-secondary ms-1"
                                        onClick={() => {
                                            setCart([...cart, p])
                                            localStorage.setItem("cart", JSON.stringify([...cart, p]))
                                        }}>
                                        Add To Cart
                                    </button>

                                </div>

                            </div>
                        ))}

                    </div>

                    <div className="m-2 p-3">
                        {products && products.length < total && (
                            <button
                                className="btn btn-warning"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setPage(page + 1);
                                }}
                            >
                                {loading ? "Loading ..." : "Loadmore"}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default HomePage;