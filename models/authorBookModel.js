import mongoose from "mongoose"

const authorBookSchema = new mongoose.Schema({
    title: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Author"
    }
})

const authorBookModel = mongoose.model("AuthorBook", authorBookSchema)

export default authorBookModel