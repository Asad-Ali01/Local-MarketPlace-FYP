import mongoose from "mongoose";

const connectToDb = async () => {
    try {
        let mongoDbUri = process.env.MONGODB_URI;
        // if(process.env.MONGODB_URI)
        await mongoose.connect(`${mongoDbUri}`)
        console.log("Mongodb connected");
    } catch (error) {
        console.log("Mongodb connection error",error);
        process.exit(1)
    }
}
export {connectToDb}