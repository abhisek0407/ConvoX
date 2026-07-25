import express from "express"
import dotenv from 'dotenv'
dotenv.config();
import dbConnect from "./DB/dbConnect.js";
import authRouter from './route/authUser.js'
import messageRouter from './route/messageRout.js'
import cookieParser from "cookie-parser";
import userRouter from './route/userRout.js'
const app=express();
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth',authRouter)
app.use('/api/message',messageRouter)
app.use('/api/user',userRouter)


app.get('/',(req,res)=>{
    res.send("server is working")
})
const PORT=process.env.PORT||3000
app.listen(PORT,()=>{
    dbConnect();
    console.log(`Working at ${PORT}`)
})