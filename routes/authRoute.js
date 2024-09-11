import express from "express";
import {
    forgotPasswordController,
    loginController,
    registerController,
    testcontroller
} from '../controllers/authController.js'
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import userModel from "../models/userModel.js";
//ROUTER OBJECT
const router = express();

//ROUTING

//REGISTER || POST
router.post('/register', registerController);

//LOGIN || POST
router.post('/login', loginController)

//FORGOT PASSWORD || POST
router.post('/ForgotPassword', forgotPasswordController)

//FORGOT PASSWORD || GET
router.get('/ForgotPassword', requireSignIn, (req, res) => {
    res.status(200).send({
        ok: true,
        role: 1
    })
})

//TEST
router.get('/test', requireSignIn, isAdmin, testcontroller)

//USER AUTHENTICATION
router.get('/authUser', requireSignIn, async (req, res) => {
    // Assuming req.user contains the decoded user information
    // const user = req.user;
    const user = await userModel.findById(req.user._id);
    res.status(200).send({
        ok: true,
        role: user.role, // Adjust this based on your user object structure
        userDetails: user // Include the user details in the response
    });
});


//ADMIN AUTHWNTICATION
router.get('/authAdmin', requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({
        success: true,
        ok: true,
        admin: true
    })
})
export default router;