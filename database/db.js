import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI
      //"mongodb+srv://harnonmarlee123_db_user:Harry$1986@cluster0.02fh8y1.mongodb.net/",
    );
    console.log("DB Connected successfully");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;
