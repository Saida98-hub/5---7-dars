const fs = require("fs")
const path = require("path")
const BookSchema = require("../schema/book.schema")

const stream = async (req, res) => {
    try {
        const { bookId } = req.params

        const foundedBook = await BookSchema.findById(bookId)
        if (!foundedBook) {
            return res.status(404).json({
                message: "Book not found"
            })
        }

        if (foundedBook.audioURL) {
            return res.status(404).json({ message: "Url not found" })
        }

        const fileUrl = path.join(__dirname, "..", foundedBook.audioURL)
        const stat = fs.statSync(fileUrl)
        const fileSize = stat.size
        const range = req.headers.range

        if (range) {

            const parts = range.slice(6).splite("-")
            const start = parseInt(parts[0], 10)
            const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1
            const result = (end - start) + 1

            res.writeHead(200, {
                "Content - Range": `bytes ${start}- ${end}/${fileSize}`,
                "Accept - Range": "bytes",
                "Content - Length": result,
                "content - Type": "audio/mp3"
            })

            fs.createReadStream(fileUrl, {start, end}).pipe(res)


        } else {
            res.writeHead(200, {
                "Accept - Range": "bytes",
                "Content - Length": fileSize,
                "content - Type": "audio/mp3"
            })

            fs.createReadStream(fileUrl).pipe(res)
        }


    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

module.exports = stream