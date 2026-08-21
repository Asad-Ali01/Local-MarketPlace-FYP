import mongoose from "mongoose";
import { Category } from "../models/category.model";
import { SubCategory } from "../models/subCategory.model";
import { User } from "../models/user.model";
import { ApiError } from "../utils/ApiError";
import { deleteFromCloudinary, uploadToCloudinary } from "../utils/cloudinary";
import { generateAccessAndRefreshToken } from "../utils/generateToken";


 const adminAllUsersDetailsService = async(page:number,limit:number,filterStatus:string,searchUser:string) => {
    const skip = (page - 1) * limit;
    const totalUsers = await User.countDocuments();
    const query:any = {}
    if(filterStatus && filterStatus !== "all"){
        query.status = filterStatus
    }
    if(searchUser){
        query.$or = [
            { name: { $regex:searchUser, $options: "i"  }},
            { email: { $regex:searchUser, $options:"i" } }
        ]
    }
    const users  = await User
    .find(query)
    .skip(skip)
    .limit(limit)
    .sort({createdAt:-1})
    .select("-password -refreshToken");
    return {users,totalUsers};
}


 const adminDeleteUserService = async(userId:string) => {
  await User.deleteOne({_id:userId});
    return {}
}

const adminLoginService = async (data: any) => {
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

const adminGetStatsService = async (
 range:string
) => {

  let startDate = new Date();
  let unit: "day" | "month" = "day";

  //  DATE RANGE SETTING
  if (range === "7d") {
    startDate.setDate(startDate.getDate() - 7);
    unit = "day";
  }

  else if (range === "30d") {
    startDate.setDate(startDate.getDate() - 30);
    unit = "day";
  }

  else if (range === "yearly") {
    startDate.setFullYear(startDate.getFullYear() - 1);
    unit = "month";
  }
  const stats = await User.aggregate([
    {
      $match: {
        role:{ $in:["client","provider"] },
        createdAt: { $gte: startDate },
      },
    },

    //  GROUP BY TIME + ROLE
    {
      $group: {
        _id: {
          role: "$role",
          period: {
            $dateTrunc: {
              date: "$createdAt",
              unit: unit,
            },
          },
        },
        count: { $sum: 1 },
      },
    },
    {
        $sort:{
            "_id.period":1
        }
    }
  ]);

//   
  // FORMAT FOR FRONTEND
  const result: any = {};
console.log("Here is stats: ",stats);
//   Total Users
const totalUsers = await User.countDocuments();
const pendingApprovals = await User.countDocuments({
    status:"pending"
})
const approvedUsers = await User.countDocuments({
    status:"approved"
})
const rejectedUsers = await User.countDocuments({
    status:"rejected"
})
  stats.forEach((item) => {
    const key = item._id.period.toISOString().split("T")[0];                                               
    if (!result[key]) {
      result[key] = {
        label: key,
        clients: 0,
        providers: 0,
      };
    }

    if (item._id.role === "client") {
      result[key].clients = item.count;
    }

    if (item._id.role === "provider") {
      result[key].providers = item.count;
    }
  });

  return {results:Object.values(result),totalUsers,pendingApprovals,approvedUsers,rejectedUsers};
};

const adminUserDetailService = async(userId:string) => {
   const user = await User.findOne({_id:userId}).select("-password -refreshToken");
   return {user};
}

const adminEditUserService = async (userId: string, body: any, files: any) => {
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



export {adminAllUsersDetailsService,adminEditUserService,adminGetStatsService,adminLoginService,adminUserDetailService,adminDeleteUserService}