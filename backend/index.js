import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import cors from 'cors'
import authRouter from './router/authRouter.js'

dotenv.config({path:'backend/config.env'})

const app = express();

const connectDB = () => {
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log(`Connected to DB!!!`)
    }).catch((err)=>{
        console.log(err)
    })
}

app.listen(process.env.PORT,()=>{
    console.log(`Server is working: ${process.env.PORT}`)
    connectDB();
})

app.use(express.json())
app.use(cors({origin: 'http://localhost:5173', credentials: true}))

app.use("/api/auth",authRouter);



app.use((err, req, res, next)=>{
    const statusCode =  err.statusCode || 500
    const message = err.message || 'Internal server Error'
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message
    }) 
})