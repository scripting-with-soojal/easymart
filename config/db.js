import mongoose from "mongoose";
import colors from 'colors';

const connectDB = async () => {
 try {
  const conn = await mongoose.connect(process.env.MONGO_URL)
  console.log(`connected to DB ${conn.connection.host}`.bgBlack.green)
 } catch (erro) {
  console.log(`Error is ${erro}`.bgRed.white)
 }
}
export default connectDB;