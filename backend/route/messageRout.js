import express from "express"
import { sendMessage } from "../routControlers/messageroutControler.js";
import { getMessage } from "../routControlers/messageroutControler.js";
import isLogin from "../middleware/isLogin.js";
const router=express.Router();

router.post('/send/:id',isLogin,sendMessage)

router.get('/:id', isLogin,getMessage)
export default router