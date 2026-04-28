import { User } from "../../user/models/user.model";

export const adminGetStatsService = async (
 range:string
) => {

console.log("Range: ",range);

  let startDate = new Date();
  let unit: "day" | "month" = "day";

  // ⏳ DATE RANGE SETTING
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

    // 🔥 GROUP BY TIME + ROLE
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
  // 🔥 FORMAT FOR FRONTEND
  const result: any = {};

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