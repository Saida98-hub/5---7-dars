const CustomErrorhandler = require("../error/custom-error.handler")
const authorValidator = require("../validator/author.validate")
const bookValidator = require("../validator/book.validator")

module.exports = function(req,res,next){
  const {error}=bookValidator(req.body)

  if(error){
    throw CustomErrorhandler.BadRequest(error.message)
  }

  next()
}