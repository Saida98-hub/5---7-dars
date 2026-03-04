const express=require("express")
const cors=require("cors")
const connectDB = require("./config/db.config")
const autherRouter = require("./routes/author.routes")
const bookRouter = require("./routes/book.routes")
const errorMiddleware = require("./middleware/error.middleware")
require("dotenv").config()
const cookieParser=require("cookie-parser")
const authRouter = require("./routes/auth.routes")
const userRoutes = require("./routes/userRoutes");

PORT=process.env.PORT || 3000
const app=express()

connectDB()
app.use(express.json())
app.use(cors())
app.use(cookieParser())

//router
app.use(autherRouter)
app.use(bookRouter)
app.use(authRouter)
app.use(userRoutes);


app.use(errorMiddleware)


app.listen(PORT, ()=>{ 
  console.log("Server is runing at: " + PORT);          
})   