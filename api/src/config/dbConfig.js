import mongoose from "mongoose";

const connectToDb = async () => {
  return await mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Connected to the Database");
    })
    .catch((error) => {
      console.log(error);
    });
};


export default connectToDb