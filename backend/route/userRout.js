import express from 'express'
import isLogin from '../middleware/isLogin.js'
import { getUserBySearch } from '../routControlers/userHandlerControler.js'
import { getCurrentChatters } from '../routControlers/userHandlerControler.js'
const router=express.Router()

router.get('/search',isLogin,getUserBySearch)

router.get('/currentchatters',isLogin,getCurrentChatters)
export default router