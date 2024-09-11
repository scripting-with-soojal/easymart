import express from "express";
import {
    PaymentController,
    brainTreePaymentController,
    braintreeTokenController,
    cardController,
    createProductController,
    deleteProductController,
    getProductController,
    getSingleProductController,
    orderCreate,
    productCountController,
    productFiltersController,
    productListController,
    productPhotoController,
    realtedProductController,
    searchProductController,
    updateProductController,
} from "../controllers/productController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";

const router = express();

//routes
router.post(
    "/create-product",
    requireSignIn,
    isAdmin,
    formidable(),
    createProductController
);
//routes
router.put(
    "/update-product/:pid",
    requireSignIn,
    isAdmin,
    formidable(),
    updateProductController
);

//get products
router.get("/get-product", getProductController);

//single product
router.get("/get-product/:slug", getSingleProductController);

//get photo
router.get("/product-photo/:pid", productPhotoController);

//delete rproduct
router.delete("/delete-product/:pid", deleteProductController);

//filter product
router.post("/product-filters", productFiltersController);

//product count
router.get("/product-count", productCountController);

//product per page
router.get("/product-list/:page", productListController);

//Search Product
router.get("/search/:keyword", searchProductController);

//similar product
router.get("/related-product/:pid/:cid", realtedProductController);

//Pyament routes Razorpay
router.post("/razorpay", orderCreate)

//Card Details
router.post("/card-details", cardController)

router.post("/success", PaymentController)
//payments routes Braintree
//token
router.get("/braintree/token", braintreeTokenController);

//payments
router.post("/braintree/payment", requireSignIn, brainTreePaymentController);


export default router;