import mongoose from "mongoose";
const dbConnect=async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_CONNECT)
        console.log("DB connected successfully")
    }catch(error){
        console.error(error)
    }
}
export default dbConnect