import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Book title is required"],
    trim: true,
    maxLength: [100, "Book title cannot be more than 100 characters"],
  },
  author: {
    type: String,
    required: [true, "Author title is required"],
    trim: true,
  },
  year: {
    type: Number,
    required: [true, "Publication year is required"],
    min: [1000, "Years must be at least 1000"],
    max: [new Date().getFullYear(), "Year cannot be in the future"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const bookModel = mongoose.model("Book", bookSchema);

export default bookModel;
