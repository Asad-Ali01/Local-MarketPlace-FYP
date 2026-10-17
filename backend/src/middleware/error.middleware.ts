import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { ApiError } from "../utils/ApiError";

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Full Error:", err);
  console.error(err.stack);

  // Handle Zod validation errors
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: err.issues.map((issue) => ({
        path: issue.path,
        message: issue.message,
      })),
    });
  }

  // Handle your custom API errors
  const apiError = err as ApiError;
  const statusCode = apiError.statusCode || 500;

  return res.status(statusCode).json({
    success: false,
    message: apiError.message || "Internal Server Error",
  });
};

export { errorHandler };