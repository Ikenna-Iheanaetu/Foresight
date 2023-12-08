import express from 'express'
import { updateUsersInfo } from '../controller/usersControllers.js'

const usersRouter = express.Router()

usersRouter.post('/users/update/:userId', updateUsersInfo)

export default usersRouter

