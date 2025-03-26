import express from 'express'
import { userRouter } from './routes/userRoute'
import connectDatabase from './db/dbConnect'
import cors from 'cors'
import { adminRouter } from './routes/adminRouter'




const app = express()


app.use(cors({
    origin:'*'
}))

app.use(express.json({limit:'50mb'}))
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use('/user',userRouter)
app.use('/admin',adminRouter)

connectDatabase()



app.get('/',(req,res)=>{
    res.send("Hello world")
})

app.listen(3000,()=>{
    console.log("Server running")
})