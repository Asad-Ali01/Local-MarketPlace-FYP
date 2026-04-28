import { User } from "../../user/models/user.model"

export const adminUserDetailService = async(userId:string) => {
   const user = await User.findOne({_id:userId}).select("-password -refreshToken");
   return {user};
}