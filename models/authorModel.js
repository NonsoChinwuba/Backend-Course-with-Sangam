import mongoose from "mongoose"

const authorSchema = new mongoose.Schema({
    name: String,
    bio: String


})

const authorModel = mongoose.model("Author", authorSchema)

export default authorModel