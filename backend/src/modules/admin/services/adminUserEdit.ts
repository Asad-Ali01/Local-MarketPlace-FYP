import { ApiError } from "../../../utils/ApiError";
import {
  deleteFromCloudinary,
  uploadToCloudinary,
} from "../../../utils/cloudinary";
import { User } from "../../user/models/user.model";

export const adminEditUserService = async (userId: string, body: any, files: any) => {
  const { name, email, role, status } = body;
  const isEmptyField = [name, email, role, status].every(
    (d) => !d || !d.trim(),
  );
  const isEmptyFiles = !files || Object.keys(files).length === 0;

  if (isEmptyField && isEmptyFiles) {
    throw new ApiError(400, "Nothing to update");
  }


  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(400, "User id is required");
  }
  //    Update text fields
  if (name) user.name = name;
  if (email) user.email = email;
  if (role) user.role = role;
  if (status) user.status = status;

  if (files) {
    if (files.avatar?.[0]) {
      let avatarFile = files.avatar?.[0];
      let deleteAvatarFile = user.avatar.public_id;

      const updatedAvatar = await uploadToCloudinary(
        avatarFile,
        userId,
        "avatar",
      );
      if (updatedAvatar) {
        user.avatar = updatedAvatar;
        await deleteFromCloudinary(deleteAvatarFile);
      }
    }

    if (files.front?.[0]) {
      let frontFile = files.front?.[0];
      let deleteFrontFile = user.identityCard.front.public_id;

      const updatedFrontFile = await uploadToCloudinary(
        frontFile,
        userId,
        "identityCard/front",
      );
      if (updatedFrontFile) {
        user.identityCard.front = updatedFrontFile;
        await deleteFromCloudinary(deleteFrontFile);
      }
    }
    if (files.back?.[0]) {
      let backFile = files.back?.[0];
      let deleteBackFile = user.identityCard.back.public_id;
      const updatedBackFile = await uploadToCloudinary(
        backFile,
        userId,
        "identityCard/back",
      );
      if (updatedBackFile) {
        user.identityCard.back = updatedBackFile;
        await deleteFromCloudinary(deleteBackFile);
      }
    }
  }
  await user.save();
  return {user}
};
