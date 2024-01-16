import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from 'jsonwebtoken';

export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address, answer } = req.body;
        //validation
        if (!name) {
            return res.send({ message: 'Name required' });
        }
        if (!email) {
            return res.send({ message: 'email required' });
        }
        if (!password) {
            return res.send({ message: 'password required' });
        }
        if (!phone) {
            return res.send({ message: 'phone required' });
        }
        if (!address) {
            return res.send({ message: 'address required' });
        }

        //existing user
        const existinguser = await userModel.findOne({ email: email })
        if (existinguser) {
            return res.status(200).send({
                success: true,
                message: 'Already registered please login',
            })
        }
        //register user
        const hashedPassword = await hashPassword(password);

        //save
        const user = await new userModel({ name, email, phone, address, password: hashedPassword, answer }).save();

        res.status(201).send({
            success: true,
            message: 'user registered successfully',
            user
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in registration',
            error
        })
    }
};

//POST LOGIN
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        //validation
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: "EMAIL AND PASSWORD ARE REQUIRED"
            })
        }
        //Find User
        const userr = await userModel.findOne({ email });
        if (!userr) {
            return res.status(404).send({
                success: false,
                message: "Email not registered",
            })
        }
        const compare = await comparePassword(password, userr.password);
        if (!compare) {
            return res.status(200).send({
                success: false,
                message: "Invalid Password"
            })
        }
        //Token
        const token = await JWT.sign({ _id: userr._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.status(200).send({
            success: true,
            message: "Login Successfull",
            user: {
                name: userr.name,
                email: userr.email,
                phone: userr.phone,
                address: userr.address,
                role: userr.role
            },
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Login Error"
        })
    }
};

export const forgotPasswordController = async (req, res) => {
    try {
        const { email, answer, newpassword } = req.body;
        if (!email) {
            res.status(400).send({ message: "Emai is required" });
        }
        if (!answer) {
            res.status(400).send({ message: "answer is required" });
        }
        if (!newpassword) {
            res.status(400).send({ message: "New Password is required" });
        }
        //check
        const user = await userModel.findOne({ email, answer });
        //validation
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Wrong Email Or Answer",
            });
        }
        const hashed = await hashPassword(newpassword);
        await userModel.findByIdAndUpdate(user._id, { password: hashed });
        res.status(200).send({
            success: true,
            message: "Password Reset Successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Something went wrong",
            error,
        });
    }
};

//test controller
export const testcontroller = (req, res) => {
    res.send("protected Routes")
}
