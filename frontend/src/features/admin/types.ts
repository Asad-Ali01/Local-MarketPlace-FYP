import type { IUser } from "@/types/global.types";
import type { IImage } from "../gig/types";
// Admin stats filter Response
export interface IAdminStatsResponse {
  statusCode: number;
  data: {
    results: { label: string; clients: number; providers: number }[];
    totalUsers: number;
    pendingApprovals: number;
    approvedUsers: number;
    rejectedUsers: number;
  };
  message: string;
  success: boolean;
}

// Admin stats filter Request

export interface IAdminStatsRequest {
  range: string;
}
export interface IAdminResponseDataExtendUser extends IUser {
  status: "pending" | "rejected" | "approved";
  createdAt: string;
}
// Admin all users response
export interface IAdminAllUsersResponse {
  data: {
    users: IAdminResponseDataExtendUser[];
    totalUsers: number;
  };
}
// Admin user response
export interface IAdminUserResponse {
  data: {
    user: IAdminResponseDataExtendUser;
  };
  message: string;
  success: boolean;
}

// Category section
export interface IIcon {
  url: string;
  public_id: string;
}

export interface ICategoryResponse {
  data: {
    _id: string;
    name: string;
    slug: string;
    icon: IIcon;
  };
}

export interface ISubCategoryResponse {
  data: {
    _id: string;
    name: string;
    slug: string;
    category: string;
  };
}

export interface ISubCategoryWithCategory extends Omit<
  ISubCategoryResponse,
  "category"
> {
  category: {
    _id: string;
    name: string;
  };
}
export interface IGetAllCategories {
  data: {
    _id: string;
    name: string;
    slug: string;
    icon: IIcon;
  }[];
}

export interface IGetAllSubCategories {
  data: {
    _id: string;
    name: string;
    slug: string;
    category: {
      _id: string;
      name: string;
    };
  }[];
}
