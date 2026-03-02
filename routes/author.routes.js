const {Router}=require("express")
const { getAllAuthor, getOneAuthor, addAuthor, updateAuthor, deleteAuthor, search } = require("../controller/author.controller")
const authorValidatorMiddleware = require("../middleware/author.validator.middleware")

const autherRouter=Router()

autherRouter.get("/get_all_authors",getAllAuthor)
autherRouter.get("/get_one_author/:id",getOneAuthor)
autherRouter.post("/add_author",authorValidatorMiddleware,addAuthor)
autherRouter.get("/search",search)
autherRouter.put("/update_author/:id",updateAuthor)
autherRouter.delete("/delete_author/:id",deleteAuthor)

module.exports= autherRouter
