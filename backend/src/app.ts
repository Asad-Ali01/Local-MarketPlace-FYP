import cors from "cors";
import express from "express"
import userRouter from './routes/user.routes'
import authRouter from './routes/auth.route'
import adminRouter from './routes/admin.routes'
import cookieParser from "cookie-parser";
import otpRouter from './routes/otp.route';
import gigRouter from './routes/gig.routes';
import categoryRouter from './routes/category.route';
import chatRouter from './routes/chat.route';
import searchRouter from './routes/search.route';
import { errorHandler } from "./middleware/error.middleware";
const app = express();

app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin:"http://localhost:5173",credentials:true}));
app.use('/api/v1/users',userRouter);
app.use('/api/v1/auth',authRouter);
app.use('/api/v1/admin',adminRouter);
app.use('/api/v1/otp',otpRouter);
app.use('/api/v1/gig',gigRouter);
app.use('/api/v1',categoryRouter);
app.use('/api/v1/chats',chatRouter);
app.use('/api/v1/search',searchRouter);
app.use(errorHandler);

export {app};