import { ApiError } from "../../../utils/ApiError";
import { User } from "../../user/models/user.model";
import { generateAccessAndRefreshToken } from "../../../utils/generateToken.service";

export const adminLoginService = async (data: any) => {
  const { email, password } = data;
  if (
    [email, password].some(
      (field) => typeof field !== "string" || !field.trim(),
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(401, "Email or password is wrong");
  }
  if (user.role !== "admin") {
    throw new ApiError(403, "Only admin can access this route");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Email or password is wrong");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id,
  );


  const safeUser = await User.findById(user._id).select(
    "-password -refreshToken",
  );
  return { safeUser, accessToken, refreshToken };
};
