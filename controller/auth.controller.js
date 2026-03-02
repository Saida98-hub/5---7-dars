const CustomErrorhandler = require("../error/custom-error.handler")
const bcrypt=require("bcryptjs")
const sendMessage = require("../utils/sint.email")
const AuthSchema = require("../schema/auth.schema")
const { accses_token } = require("../utils/jwt")

const Register = async (req,res, next)=>{
  try{
    const {username,email,password} = req.body

    const foundedUser = await AuthSchema.findOne({email})

    if(foundedUser){
      throw CustomErrorhandler.BadRequest("User already exsist")
    }

    const hashPassword = await bcrypt.hash(password, 12)

    const code = String(Math.floor(100000 + Math.random()*900000))

    await sendMessage(code,email)

    await AuthSchema.create({
      username,
      email,
      password: hashPassword,
      otp: code,
      otpTime: new Date(Date.now() + 120000)
    })

    res.status(200).json({message: "Registered"})
  }catch(error){
    next(error)
  }
}