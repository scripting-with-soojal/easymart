import { Link, Navigate } from 'react-router-dom'
import AdminMenu from '../../components/Layout/AdminMenu'
import Layout from '../../components/Layout/Layout'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

const Product = () => {
    const [products, setProducts] = useState([]);

    //Get All Products
    const getAllProducts = async () => {
        try {
            const res = await axios.get("/api/v1/product/get-product");
            if (res?.data?.success) {
                setProducts(res?.data?.products);
                Navigate('/')
            }
        } catch (error) {
            console.log(error);
            // toast.error("Something Went Wrong")
        }

    }
    useEffect(() => {
        getAllProducts();
    }, []);
    return (
        <Layout title={"All Products"}>
            <div className="container-fluid m-3 p-3 ">
                <div className="row">
                    <div className="col-md-3 bg-dark">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1>Displaying All Products</h1>
                        <div className="row row-cols-1 row-cols-md-3 g-4">
                            {
                                products?.map((p) => (
                                    <div className="col">
                                        <div key={p._id} className="card" style={{ width: "16rem" }}>
                                            <img src={`/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} style={{ height: "16rem" }} />
                                            <div className="card-body">
                                                <h5 className="card-title">{p.name}</h5>
                                                <p className="card-text">{p.description}</p>
                                                <Link to={`/dashboard/admin/product/${p.slug}`} className='btn btn-outline-primary'> click </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Product