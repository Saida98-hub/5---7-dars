const CustomErrorhandler = require("../error/custom-error.handler")
const authorValidator = require("../validator/author.validator")
// const Joi = require('joi')


// exports.authorValidate = (data) => {
//   const schema = Joi.object({
//     name: Joi.string().required(),
//     age: Joi.number().required()
//   })

//   return schema.validate(data)
// }

module.exports = function(req,res,next){
  const {error}=authorValidator(req.body)

  if(error){
    throw CustomErrorhandler.BadRequest(error.message)
  }

  next()
}