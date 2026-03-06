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
const logger = require("./utils/logger")

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

// console.log("Console Logger"); // tekshirish uchun
// console.warn("Warning Logger"); // ogohlatirish uchun
// console.error("Error Logger"); // xatoliklar uchun
// console.info("Info Logger");
// console.debug("Debug Logger");
// console.trace("Trace logger"); // qatorma qator xatolik, yokida malumotlarni terminalga chiqariberadi
// console.table("Table logger"); // statistikani table shaklida beradi

logger.warn("Console logger");
logger.error("Error Logger"); // xatoliklar uchun
logger.info("Info Logger");
logger.debug("Debug Logger");

app.listen(PORT, ()=>{ 
  console.log("Server is runing at: " + PORT);          
})   