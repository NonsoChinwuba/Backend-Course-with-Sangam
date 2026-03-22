import productModel from "../models/productModel.js";
import { sampleProducts } from "../utils/dummyData.js";

export const insertSampleProducts = async (req, res) => {
  try {
    const result = await productModel.insertMany(sampleProducts);
    res.status(201).json({
      success: true,
      data: `Inserted ${result.length} sample products`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

export const getProductStats = async (req, res) => {
  try {
    //get products where inStock is true and price is greater than 100
    const result = await productModel.aggregate([
      //check the conditions if they match
      {
        $match: {
          inStock: true,
          price: {
            $gte: 100,
          },
        },
      },
      //grouping documents and geting a single result
      {
        $group: {
          _id: "$category",
          avgPrice: {
            $avg: "$price",
          },
          count: {
            $sum: 1,
          },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

export const getProductAnalysis = async (req, res) => {
  try {
    const result = await productModel.aggregate([
      {
        $match: {
          category: "Electronics",
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: "$price",
          },
          averagePrice: {
            $avg: "$price",
          },
          maxProductPrice: {
            $max: "$price",
          },
          minProductPrice: {
            $min: "$price",
          },
        },
      },
      {
        //we use the $project operator to exclude fields in our result zero means the field is excluded one means the field is included
        $project: {
          _id: 0,
          totalRevenue: 1,
          averagePrice: 1,
          maxProductPrice: 1,
          minProductPrice: 1,
          pricerange: {
            $subtract: ["$maxProductPrice", "$minProductPrice"],
          },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};
