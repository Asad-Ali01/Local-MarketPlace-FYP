import mongoose from "mongoose";

const connectToDb = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/fyp")
        console.log("Mongodb connected");
    } catch (error) {
        console.log("Mongodb connection error",error);
        process.exit(1)
    }
}
export {connectToDb}