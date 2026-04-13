import { Response,Request,NextFunction,RequestHandler } from "express"
const asyncHandler = (
   responseHandler: (
     req:Request,
    res:Response,
    next:NextFunction
   ) => Promise<any>
): RequestHandler => {
    return (req,res,next) => {
        responseHandler(req,res,next).catch((err) => next(err));
    }
}

export {asyncHandler}