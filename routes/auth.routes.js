const {Router}=require("express")
const { Verify, Register } = require("../controller/auth.controller")



const authRouter=Router()

authRouter.post("/register",Register)
authRouter.post("/verify",Verify)

module.exports= authRouter
