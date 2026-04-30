import { User } from "../../user/models/user.model"

const adminLogoutService = async(userId:object) => {
   console.log("ASad");
   await User.findByIdAndUpdate(userId,{
    $unset: {refreshToken: 1}
   })

}

export {adminLogoutService}