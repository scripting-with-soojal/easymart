import React, { useEffect, useState } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import { Select } from 'antd'
import axios from "axios";
import toast from "react-hot-toast";
const { Option } = Select;

const CreateProduct = () => {
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState("");
    const [photo, setPhoto] = useState("")
    var value;
    //Get All Categories

    const getAllCategory = async () => {
        try {
            const res = await axios.get("/api/v1/category/showcategory");
            if (res.data?.success) {
                setCategories(res.data?.category);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong in getting caaaatgeory");
        }
    };

    useEffect(() => {
        getAllCategory()
    }, [])
    return (
        <Layout title={"Dashboard - Create Product"}>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">

                        <h1>Create Product</h1>
                        <Select
                            bordered={false}
                            placeholder={value ? value : "Enter Category"}
                            size="large"
                            showSearch
                            className="form-select mb-3"
                            onChange={(value) => {
                                setCategory(value);
                            }}
                            onDropdownVisibleChange={() => {
                                setCategory("Enter Category")
                                value = category
                                console.log("lsdlsdkslfd");
                            }}
                        // value={value}
                        >
                            {categories?.map((c) => (
                                <Option key={c._id} value={c.name}>
                                    {c.name}
                                </Option>
                            ))}
                        </Select>
                        <div className="mb-3">
                            <label className="btn btn-outline-secondary col-md-12">
                                {photo ? photo.name : "Upload Photo"}
                                <input
                                    type="file"
                                    name="photo"
                                    accept="image/*"
                                    onChange={(e) => setPhoto(e.target.files[0])}
                                    hidden
                                />
                            </label>
                        </div>

                    </div>
                </div>
            </div>
        </Layout >
    );
};

export default CreateProduct;