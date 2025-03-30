import mongoose from "mongoose";

export const connect = () => {
  try {
    mongoose.connect(process.env.MONGO_URL!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    });
    connection.on("error", (err) => {
      console.log("MongoDB connected error ", err);
      process.exit();
    });
  } catch (error) {
    console.log("Something went wrong in connecting woth the DB");
    console.log(error);
  }
};
