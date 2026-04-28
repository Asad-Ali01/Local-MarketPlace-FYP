import { User } from "../../user/models/user.model"

export const adminAllUsersDetailsService = async(page:number,limit:number,filterValue:string,search:string) => {
    const skip = (page - 1) * limit;
    const totalUsers = await User.countDocuments();
    const query:any = {}
    if(filterValue && filterValue !== "all"){
        query.status = filterValue
    }
    if(search){
        query.$or = [
            { name: { $regex:search, $options: "i"  }},
            { email: { $regex:search, $options:"i" } }
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