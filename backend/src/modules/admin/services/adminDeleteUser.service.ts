import { Types } from "mongoose";
import { User } from "../../user/models/user.model";

export const adminDeleteUserService = async(userId:string) => {
  await User.deleteOne({_id:userId});
    return {}
}