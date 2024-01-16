import express from 'express'
import colors from 'colors'
import dotenv from 'dotenv'
import morgan from 'morgan'
import connectDB from './config/db.js'
import authRoutes from './routes/authRoute.js'
import CategoryRoute from './routes/CategoryRoute.js'
import ProductRoutes from './routes/ProductRoutes.js'

import cors from "cors";

const app = express()

//config dotenv
dotenv.config()

//database config
connectDB();

//middlewares
app.use(cors());
app.use(express.json())
app.use(morgan('dev'))

//routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/category', CategoryRoute);
app.use('/api/v1/product', ProductRoutes);


//rest api
app.get('/', (req, res) => {
    res.send('<h1>Welcome to my major project</h1>');
});

//port 
const PORT = 8080;

//rum listen
app.listen(PORT, () => {
    console.log(`server running on ${PORT}`.bgYellow.black);
});