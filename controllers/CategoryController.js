import slugify from "slugify";
import CategoryModel from '../models/CategoryModel.js'

export const CreateCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        console.log(name)
        // const slug = slugify(name);
        if (!name) {
            return res.status(401).send({
                success: false,
                message: "Name Is Required And Necessary"
            })
        }
        const ExistingCategory = await CategoryModel.findOne({ name })
        if (ExistingCategory) {
            return res.status(200).send({
                success: false,
                message: "Category Already Exists"
            })
        }
        const cat = await new CategoryModel({
            name,
            slug: slugify(name)
        }).save();

        res.status(200).send({
            success: true,
            message: "New Category Created",
            cat
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error In Creating Category",
            error
        })
    }
}

//Show All Categories
export const ShowCategoryController = async (req, res) => {
    try {
        const category = await CategoryModel.find({});
        res.status(200).send({
            success: true,
            message: "Showing All The Categories",
            category,
        })
    } catch (error) {
        console.log(error)
        res.status(200).send({
            success: false,
            message: "Error In Showing Categories"
        })
    }
}

//Show Single Category
export const ShowSingleCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const singlecategory = await CategoryModel.findOne({ slug: name })
        res.status(200).send({
            success: true,
            message: `showing ${name} category`,
            singlecategory
        })
    } catch (error) {
        console.log(error)
        res.status(200).send({
            success: false,
            message: "Error In Showing Category"
        })
    }
}
//Update Category Based On Slug
export const UpdateCategoryController = async (req, res) => {
    try {
        const { slugname } = req.params
        const cat = await CategoryModel.findOne({ slug: slugname })
        console.log(cat);
        const { _id } = cat;
        const numericId = _id.toHexString();
        console.log(_id);
        console.log(numericId);
        const { name } = req.body;
        const category = await CategoryModel.findByIdAndUpdate(
            numericId,
            { name, slug: slugify(name) },
            { new: true }
        );
        res.status(200).send({
            success: true,
            message: "Category Updated Successfully",
            // category
        })
    } catch (error) {
        console.log(error)
        res.status(200).send({
            success: false,
            message: "Error In Updating Category"
        })
    }
}
//Delete Category Based On Slug
export const DeleteCategoryController = async (req, res) => {
    try {
        const { slug } = req.params;
        const cat = await CategoryModel.findOne({ slug })
        if (!cat) {
            res.status(200).send({
                success: false,
                message: "The Category Doesn't Exist"
            })
        }
        else {

            const { _id } = cat;
            await CategoryModel.findByIdAndDelete({ _id });
            res.status(200).send({
                success: true,
                message: "The Category Has Been Deleted Successfully"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(200).send({
            success: false,
            message: "Error In Deleting Category"
        })
    }
}