
import {
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from "express";

const asyncHandler = <
  P = {},
  ResBody = any,
  ReqBody = any,
  ReqQuery = any
>(
  responseHandler: (
    req: Request<P, ResBody, ReqBody, ReqQuery>,
    res: Response<ResBody>,
    next: NextFunction
  ) => Promise<any>
): RequestHandler<P, ResBody, ReqBody, ReqQuery> => {
  return (req, res, next) => {
    responseHandler(req, res, next).catch(next);
  };
};

export { asyncHandler };
