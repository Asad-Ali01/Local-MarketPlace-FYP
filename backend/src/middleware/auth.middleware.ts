import { asyncHandler } from "../utils/asynHandler";
import { ApiError } from "../utils/ApiError";
import { verifyAccessToken } from "../utils/verifyAccessToken";

const verifyJWT = asyncHandler(async (req, _, next) => {
  const token =
    req.cookies.accessToken ||
    req.header("Authorization")?.replace("Bearer", "").trim();

  if (!token) {
    throw new ApiError(401, "Unauthorized request");
  }

  const user = await verifyAccessToken(token);

  req.user = user;

  next();
});

export { verifyJWT };