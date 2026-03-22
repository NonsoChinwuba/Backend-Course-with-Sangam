import imageModel from "../models/imageModel.js";
import uploadToCloudinary from "../helpers/cloudinaryHelpers.js";
// import { v2 as cloudinary } from "cloudinary";
import cloudinary from "../config/cloudinary.js";

export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(404).json({
        succcess: false,
        message: "File is required",
      });
    }

    const { url, publicId } = await uploadToCloudinary(req.file.path);

    const newImage = new imageModel({
      url,
      publicId,
      uploadedBy: req.userInfo.userId,
    });

    await newImage.save();

    res.status(201).json({
      success: true,
      message: "Image uploaded successfully",
      image: newImage,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong, pleasetry again",
    });
  }
};

export const fetchImagesController = async (req, res) => {
  try {

    //pagination
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 2
    const skip = (page - 1) * limit

    const sortBy = req.query.sortBy || "createdAt"
    const sortOrder = req.query.sortOrder === "asc" ? 1 : -1
    const totalImages = await imageModel.countDocuments()
    const totalPages = Math.ceil(totalImages/limit)

    const sortObj = {}
    sortObj[sortBy] = sortOrder

    const images = await imageModel.find().sort(sortObj).skip(skip).limit(limit);

    if (images) {
      res.status(200).json({
        success: true,
        cuurentPage: page,
        totalPages: totalPages,
        totalImages: totalImages,
        data: images,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong, pleasetry again",
    });
  }
};

export const deleteImageController = async (req, res) => {
  try {
    //get image ID you want to delete
    const imageID = req.params.id;

    //get user id with admin priviledges
    const userId = req.userInfo.userId;

    //get image by the ID from the database
    const image = await imageModel.findById(imageID);

    if (!image) {
      return res.status(404).json({
        success: false,
        message: "Image not found",
      });
    }

    //check if the image being deleted was uploaded by the current user
    if (image.uploadedBy.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorised to delete this image",
      });
    }

    //firstly, delete image from cloudinary storage
    await cloudinary.uploader.destroy(image.publicId);

    //delete from mongoDB database
    await imageModel.findByIdAndDelete(imageID);

    res.status(200).json({
      success: true,
      message: "Image deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      succcess: false,
      message: "Something went wrong",
    });
  }
};

// export default uploadImage;
