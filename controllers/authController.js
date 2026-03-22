import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//register controller
export const registerUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    const checkExistingUser = await userModel.findOne({
      $or: [{ username }, { email }],
    });

    if (checkExistingUser) {
      res.status(400).json({
        success: false,
        message:
          "User already exist. Please try with a different username or email",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      username,
      email,
      password: hashedPassword,
      role: role || "user",
    });

    await newUser.save();

    if (newUser) {
      res.status(201).json({
        success: true,
        message: "User successfully registered",
        data: newUser,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Unable to register user, please try again",
        data: newUser,
      });
    }
  } catch (error) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

//login controller
export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await userModel.findOne({ username });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const accessToken = jwt.sign(
      {
        userId: user._id,
        username: user.username,
        role: user.role,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "15m",
      },
    );

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const changePassword = async (req, res) => {
  try {
    //making sure user is authenticated
    const userId = req.userInfo.userId;

    //grabbing the old and new password from the user
    const { oldPassword, newPassword } = req.body;

    //getting user details based on logged in user id
    const user = await userModel.findById(userId);

    //checking if user exists
    if (!user) {
      res.status(400).json({
        success: false,
        messages: "User not found",
      });
    }

    //checking if old password is correct
    const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Old password is not correct",
      });
    }

    //hashing new password
    const salt = await bcrypt.genSalt(10);
    const newHashedPassword = await bcrypt.hash(newPassword, salt);

    //update user password
    user.password = newHashedPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: " Password successfully changed",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occurred. Please try again",
    });
  }
};
