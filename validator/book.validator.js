const joi=require("joi")
const { model, modelNames } = require("mongoose")

const bookValidator =(data)=>{
  const schema =joi.object({
    title: joi.string().min(3).max(200).required(),
    pages: joi.number().integer().required(),
    publishedYear: joi.string().required(),
    publishedHome: joi.string().required(),
    description: joi.string().required(),
    period: joi.string().required().valid("Temuriylar davri", "Sovet davri","Jadid davri","Mustaqillik davri"),
    genre: joi.string().required().valid("Romance","Comedy","Thriller","Horror","Action","Documantary","Science fiction","Fantasy",
          "History"),
    authorInfo: joi.string().required(),
    imageUrl: joi.string().required()
  })

  return schema.validate(data)
}

module.exports = bookValidator