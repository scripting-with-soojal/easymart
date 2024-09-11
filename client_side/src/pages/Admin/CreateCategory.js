import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import CategoryForm from "../../components/Form/CategoryForm";
import { Modal } from "antd";

const CreateCategory = () => {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [visible, setVisible] = useState(false)
    const [selected, setSelected] = useState(null);
    const [updatedname, setUpdatedname] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/v1/category/createcategory', {
                name
            })
            if (res.data?.success) {
                toast.success("Category Has Been Added Successfully");
                setName("")
                getAllCategory()
            }
        } catch (error) {
            console.log(error)
            toast.error("Kuch To Gadbad Hai Daya")
        }
    }

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

    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.put(`/api/v1/category/updatecategory/${selected?.slug}`, { name: updatedname });
            if (res.data?.success) {
                toast.success("Category Updated Sucessfully")
                setVisible(false);
                setUpdatedname("")
                setSelected(null)
                getAllCategory()
            }
            else {
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error("Bhaiya Galat Code Likh Diye Ho")
        }
    }
    const handleDelete = async (slug) => {
        try {
            const res = await axios.delete(`/api/v1/category/deletecategory/${slug}`);
            if (res.data?.success) {
                toast.success("Category Deleted Successfully")
                getAllCategory()
            }
            else {
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error("Bhaiya Galat Code Likh Diye Ho")
        }
    }

    useEffect(() => {
        getAllCategory();
    }, [selected]);
    return (
        <Layout title={"Dashboard - Create Category"}>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3 bg-dark">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9 ">
                        <div className="p-3 w-75">
                            <CategoryForm
                                value={name}
                                setValue={setName}
                                handleSubmit={handleSubmit}
                            />
                        </div>
                        <div className="w-75">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th >Category Name</th>
                                        <th >Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        categories?.map((c) => (

                                            <tr key={c._id}>
                                                <td >{c.name}</td>
                                                <td>
                                                    <button
                                                        className="btn btn-primary ms-2" onClick={() => {
                                                            setVisible(true);
                                                            setUpdatedname(c.name);
                                                            setSelected(c);
                                                        }}>
                                                        Edit
                                                    </button>
                                                    <button
                                                        className="btn btn-danger ms-2" onClick={() => {
                                                            handleDelete(c.slug)
                                                        }}>
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>

                                        ))
                                    }
                                </tbody>
                            </table>

                        </div>
                        <Modal
                            onCancel={() => setVisible(false)}
                            footer={null}
                            open={visible}
                        >
                            <CategoryForm value={updatedname} setValue={setUpdatedname} handleSubmit={handleUpdate} />
                        </Modal>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CreateCategory;