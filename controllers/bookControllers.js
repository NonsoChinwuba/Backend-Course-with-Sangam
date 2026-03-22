import mongoose from "mongoose";
import bookModel from "../models/bookModel.js";

export const getAllBooks = async (req, res) => {
  try {
    const allBooks = await bookModel.find({});
    if (allBooks.length > 0) {
      res.status(200).json({
        success: true,
        message: "All Books fetched successfully",
        data: allBooks,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Books not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong. please try again",
      error: error,
    });
  }
};

export const getSingleBook = async (req, res) => {
  try {
    const getCurrentBookId = req.params.id;
    const bookById = await bookModel.findById(getCurrentBookId);

    if (!bookById) {
      res.status(404).json({
        success: flse,
        message: "Book with the current id not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: bookById,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong. please try again",
      error: error,
    });
  }
};

export const addNewBook = async (req, res) => {
  try {
    const newBookData = req.body;
    const newlyCreatedBook = await bookModel.create(newBookData);
    if (newBookData) {
      res.status(201).json({
        success: true,
        message: "Book added successfully",
        data: newlyCreatedBook,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong. please try again",
      error: error,
    });
  }
};

export const updateBook = async (req, res) => {
  try {
    const updatedBookData = req.body;
    const bookId = req.params.id;
    const updatedBook = await bookModel.findByIdAndUpdate(
      bookId,
      updatedBookData,
      { new: true },
    );

    if (!updatedBook) {
      res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    res.status(200).json({
      success: true,
      message: `${updatedBook.title} successfully updated`,
      data: updatedBook,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong. please try again",
      error: error,
    });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const getBookById = req.params.id;
    const deletedBook = await bookModel.findByIdAndDelete(getBookById);

    if (!deletedBook) {
      res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    res.status(200).json({
      success: true,
      message: `${deletedBook.title} successfully deleted`,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong. please try again",
      error: error,
    });
  }
};
