import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import connectToDb from './config/dbConfig.js'
import authRouter from './router/authRouter.js'
import predictRouter from './router/predictRouter.js'
import usersRouter from './router/userRouter.js'

dotenv.config()

const app = express()

// Middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Route for authentication 
app.use('/auth', authRouter)
app.use('/api/v1', predictRouter)
app.use('/api/v1/', usersRouter)



app.listen(process.env.PORT, async () => {
    console.log(`Connected on port ${process.env.PORT}`)
    await connectToDb()
})