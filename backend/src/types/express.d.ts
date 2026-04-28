import { Types } from "mongoose";


declare global {
    namespace Express {
        interface Request {
            user: {
                _id:Types.ObjectId,
                role:"client" | "provider" | "admin"
            }
        }
    }
}

export {};