const CustomErrorhandler = require("../error/custom-error.handler")
const AuthorSchema = require("../schema/author.schema")

const getAllAuthor = async (req,res, next)=>{
try{
  const auther=await AuthorSchema.find()

  res.status(200).json(auther)
}catch(error){
  next(error)
}
}

const search  = async (req,res, next)=>{
try{
  const {searchingValue}=req.query
  const result=await AuthorSchema.find({
    fullName: { $regex: searchingValue, $options: "i"}
  })

  res.status(200).json(result)
}catch(error){
  next(error)
}
}

const getOneAuthor = async (req,res, next)=>{
try{
  const {id}=req.params

  foundedAuthor=await AuthorSchema.findById(id)

  if(!foundedAuthor){
    throw CustomErrorhandler.NotFound("Author not found")
  }

  res.status(200).json(foundedAuthor)
}catch(error){
  next(error)
}
}

const addAuthor = async (req,res, next)=>{
try{
 const {fullName, birthDate, deathDate, bio, work, period, imageURL}=req.body

 await AuthorSchema.create({fullName, birthDate, deathDate, bio, work, period, imageURL})

 res.status(201).json({
  message: "Added author"
 })
}catch(error){
 next(error)
}
}

const updateAuthor = async (req,res, next)=>{
try{
  const {fullName, birthDate, deathDate, bio, work, period, imageURL}=req.body
  const {id}=req.params

  foundedAuthor=await AuthorSchema.findById(id)

  if(!foundedAuthor){
    throw CustomErrorhandler.NotFound("Author not found")
  }

  await AuthorSchema.findByIdAndUpdate(id, {fullName, birthDate, deathDate, bio, work, period, imageURL})

  res.status(200).json({
    message: "Updated author"
  })
}catch(error){
 next(error)
}
}

const deleteAuthor = async (req,res, next)=>{
try{
  const {id}=req.params

  foundedAuthor=await AuthorSchema.findById(id)

  if(!foundedAuthor){
    throw CustomErrorhandler.NotFound("Author not found")
  }

  await AuthorSchema.findByIdAndDelete(id)

  res.status(200).json({
    message: "Deleted author"
  })
}catch(error){
  next(error)
}
}


module.exports={
  getAllAuthor,
  getOneAuthor,
  addAuthor,
  updateAuthor,
  deleteAuthor,
  search
}
