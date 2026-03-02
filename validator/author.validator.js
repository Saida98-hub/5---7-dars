const joi=require("joi")
const { model, modelNames } = require("mongoose")

const authorValidator =(data)=>{
  const schema =joi.object({
    fullName: joi.string().min(3).max(50).pattern(new RegExp("^[a-zA-Z\\s]+$")).required(),
    birthDate: joi.date(),
    deathDate: joi.string(),
    period: joi.string().valid("Temuriylar davri", "Sovet davri","Jadid davri","Mustaqillik davri"),
    bio: joi.string(),
    work: joi.string(),
    imageURL: joi.string()
  })

  return schema.validate(data)
}

module.exports = authorValidator