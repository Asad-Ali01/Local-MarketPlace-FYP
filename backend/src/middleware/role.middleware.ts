import { Request,Response,NextFunction } from "express"
import { ApiError } from "../utils/ApiError"
const authorrizeRoles = (...roles:string[]) => {
    return(req:Request,res:Response,next:NextFunction) => {
        if(!req.user || !roles.includes(req.user.role)){
            throw new ApiError(403,"Access denied");
        }
        next()
    }
}

export {authorrizeRoles}