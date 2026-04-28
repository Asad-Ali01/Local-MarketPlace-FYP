import cors from "cors";
import express from "express"
import userRouter from './modules/user/routes/user.routes'
import authRouter from './modules/auth/auth.route'
import adminRouter from './modules/admin/routes/admin.routes'
import cookieParser from "cookie-parser";
import { errorHandler } from "./middleware/error.middleware";
const app = express();

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser());
app.use(cors({origin:"http://localhost:5173",credentials:true}));
app.use('/api/v1/users',userRouter)
app.use('/api/v1/auth',authRouter)
app.use('/api/v1/admin',adminRouter)
app.use(errorHandler);

export {app};