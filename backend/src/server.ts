import "dotenv/config"
import { app } from './app';
import { connectToDb } from './config/db';
connectToDb();

app.listen(3000,() => {
    console.log("Server is running on localhost");
})  