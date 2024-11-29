import mongoose from "mongoose";

const dbConnect = async (dbURL) => {
  try {
    await mongoose.connect(dbURL);
    console.log("Database connected");
  } catch (err) {
    console.log(`Alert: ${err} occured`);
  }
};

export default dbConnect;
