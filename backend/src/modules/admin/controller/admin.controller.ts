import { ApiResponse } from "../../../utils/ApiRespose";
import { asyncHandler } from "../../../utils/asynHandler";
import { adminLoginService } from "../services/adminLogin.service";
import { cookieOptions } from "../../../utils/cookieOptions";
import { adminGetStatsService } from "../services/adminStats.service";
import { adminAllUsersDetailsService } from "../services/adminAllUsersDetails.service";
import { ApiError } from "../../../utils/ApiError";
import { adminDeleteUserService } from "../services/adminDeleteUser.service";
import { adminUserDetailService } from "../services/adminUserDetails.service";
import { adminEditUserService } from "../services/adminUserEdit";
import { adminLogoutService } from "../services/adminLogout.service";
import { createSubCategoryService } from "../services/createSubCategory";
import { createCategoryService } from "../services/createCategory";
import { getAllCategoriesService, getAllSubCategoriesService } from "../services/getAllCategoriesAndSubcategories";
const adminLogin = asyncHandler(async(req,res) => {
    const {safeUser,accessToken,refreshToken} = await adminLoginService(req.body);

    return res
    .status(200)
    .cookie("accessToken",accessToken,cookieOptions)
    .cookie("refreshToken",refreshToken,cookieOptions)
    .json(new ApiResponse(200,{user:safeUser,accessToken},"Admin login successfully"))
})

const adminStats = asyncHandler(async(req,res)=> {
    const {range} = req.body;
  const {results,totalUsers,pendingApprovals,approvedUsers,rejectedUsers} =  await adminGetStatsService(range);
  return res.status(200).json(new ApiResponse(200,{results,totalUsers,pendingApprovals,approvedUsers,rejectedUsers},"Filter applied successfully"))
})

const adminAllUsers = asyncHandler(async(req,res) => {
  const {page,limit,filterValue,search} = req.query;
  console.log("Filter: ",filterValue," type of :" ,typeof filterValue);
    if(typeof filterValue !== "string" || typeof search !== "string"){
    throw new ApiError(400,"Filter value or search value is not string");
  }
  const {users,totalUsers} = await adminAllUsersDetailsService(Number(page),Number(limit),filterValue,search)
  res.status(200).json(new ApiResponse(200,{users,totalUsers},"User fetched successfully"));
})

const adminDeleteUser = asyncHandler(async(req,res) => {
  const {userId} = req.params;
 
  if(!userId || typeof userId !== "string" ){
    throw new ApiError(400,"User Id is requried to delete user");
  }
  await adminDeleteUserService(userId)
  return res.status(200).json( new ApiResponse(200,{},"User deleted successfully"));
})

const adminUserDetails = asyncHandler(async(req,res) => {
  const {userId} = req.params
    if(!userId || typeof userId !== "string" ){
    throw new ApiError(400,"User id is requried to delete user");
  }
  const {user} = await adminUserDetailService(userId);

  return res.status(200).json(new ApiResponse(200,{user},"User fetched successfully"))
})

// USer edit
const adminEditUser = asyncHandler(async(req,res) => {
  const {userId} = req.params;
  console.log("Body: ",req.body);
  if(!userId  || typeof userId !== "string"){
    throw new ApiError(400,"User id is required to delete user");
  }
 const {user} = await adminEditUserService(userId,req.body,req.files);
 return res.status(200).json( new ApiResponse(200,{user},"User updated successfully"))
})

const adminLogout = asyncHandler(async(req,res) => {
  const userId = req.user._id;
  console.log("TYpe of userID: ",typeof userId);
   if(!userId  || typeof userId !== "object"){
    throw new ApiError(400,"User id is required to logout ");
  }
  await adminLogoutService(userId)
  res.clearCookie("accessToken",cookieOptions);
  res.clearCookie("refreshToken",cookieOptions)
  return res.status(200)
})

// Categories

const createCategory = asyncHandler(async(req,res) => {
  const userId = req.user._id.toString();
  if(!userId){
    throw new ApiError(401,"Only admin allowed to create category");
  }
  console.error("Here is Body: ",req.body);
  const {category} = await createCategoryService(req.body,userId,req.file);

  return res.status(200).json(new ApiResponse(200,{category},"Category created successfully"));
})

const createSubCategory = asyncHandler(async(req,res) => {
  console.log("Here is sub category data: ",req.body);
 const {subCategory} = await createSubCategoryService(req.body);

 return res.status(200).json(new ApiResponse(200,{subCategory},"Sub category created successfully"));
})


const getAllCategories = asyncHandler(async(req,res) => {
  const {categories} = await getAllCategoriesService();
  return res.status(200).json( new ApiResponse(200,categories,"Categories fetched successfully"));
})

const getAllSubCategories = asyncHandler(async(req,res) => {
  console.log("All sub categories ");
  const {subcategories} = await getAllSubCategoriesService();
  return res.status(200).json( new ApiResponse(200,subcategories,"SubCategories fetched successfully"));
})
export {adminLogin,adminStats,adminAllUsers,adminDeleteUser,adminUserDetails,adminEditUser,adminLogout,createCategory,createSubCategory,getAllCategories,getAllSubCategories};