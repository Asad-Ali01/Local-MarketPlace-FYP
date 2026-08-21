import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../models/user.model";
import { ApiError } from "./ApiError";

export const verifyAccessToken = async (token: string) => {
  if (!process.env.JWT_ACCESS_SECRET) {
    throw new ApiError(500, "Access token secret is undefined");
  }

  try {
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET
    ) as JwtPayload;

    if (!decodedToken?._id) {
      throw new ApiError(401, "Invalid access token");
    }

    const user = await User.findById(decodedToken._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new ApiError(401, "Invalid access token");
    }

    return user;
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      throw new ApiError(401, "Access token expired");
    }

    throw new ApiError(401, "Invalid access token");
  }
};