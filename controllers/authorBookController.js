import authorBookModel from "../models/authorBookModel.js";
import authorModel from "../models/authorModel.js";

export const createAuthor = async (req, res) => {
  try {
    const author = new authorModel(req.body);
    await author.save();

    res.status(201).json({
      success: true,
      data: author,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something Went wrong",
      error: error.message,
    });
  }
};

export const createBook = async (req, res) => {
  try {
    const book = new authorBookModel(req.body);
    await book.save();

    res.status(201).json({
      success: true,
      data: book,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something Went wrong",
      error: error.message,
    });
  }
};

export const getBookWithAuthor = async (req, res) => {
  try {
    const book = await authorBookModel
      .findById(req.params.id)
      // .populate("author");
      .populate({ path: "author", select: "name -_id" });
    // .select("name -_id");

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    res.status(200).json({
      success: true,
      data: book,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
