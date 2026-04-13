import mongoose, { Schema, Model, Document } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ApiError } from "../../../utils/ApiError";

interface IAvatar {
  url: string;
  public_id: string;
}
interface IIdentityCard {
  front: {
    url: string;
    public_id: string;
  };
  back: {
    url: string;
    public_id: string;
  };
}

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "admin" | "client" | "provider";
  location: {
  type:"Point",
  coordinates:[number,number]
  };
  avatar: IAvatar;
  identityCard: IIdentityCard;
  status: "pending" | "approved";
  refreshToken?: string;

  // Methods
  isPasswordCorrect: (password: string) => Promise<boolean>;
  generateAccessToken: () => string;
  generateRefreshToken: () => string;
}
const avatarSchema = new Schema<IAvatar>({
  url: {
    type: String,
    required: [true, "Avatar url is required"],
  },
  public_id: {
    type: String,
    required: [true, "Avatar public_id is requried"],
  },
});
const identityCardSchema = new Schema<IIdentityCard>({
  front: {
    url: {
      type: String,
      required: [true, "Identity Card Front url is required"],
    },
    public_id: {
      type: String,
      required: [true, "Idenity Card Front public_id is requried"],
    },
  },
  back: {
    url: {
      type: String,
      required: [true, "Identity Card Back url is required"],
    },
    public_id: {
      type: String,
      required: [true, "Idenity Card Back public_id is requried"],
    },
  },
});
const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      match: /^[a-zA-Z\s]{3,}$/,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[&%$!()*^#@]).{8,}$/,
    },
    role: {
      type: String,
      required: true,
      enum: ["admin", "client", "provider"],
    },
    avatar: {
      type: avatarSchema,
      required: true,
    },
    identityCard: {
      type: identityCardSchema,
      required: true,
    },
    location: {
      type:{
        type:String,
        enum:["Point"],
        default:"Point",
      required:true
      },
      coordinates:{
        type:[Number],
        required:true
      },
    },
    status: {
      type: String,
      enum: ["pending", "approved"],
      default: "pending",
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true },
);
userSchema.index({location:"2dsphere"})
userSchema.pre<IUser>("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.isPasswordCorrect = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  if (!process.env.ACCESS_TOKEN_SECRET)
    throw new ApiError(500, "Access Token Secret missing");
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "1h",
    },
  );
};

userSchema.methods.generateRefreshToken = function () {
  if (!process.env.REFRESH_TOKEN_SECRET)
    throw new ApiError(500, "Access Refresh Token missing");
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "7d",
    },
  );
};

export const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);
