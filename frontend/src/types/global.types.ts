import {z} from "zod";
// PasswordSchema
export const passwordSchema = z
  .string()
  .min(8, "Minimum 8 characters")
  .regex(/[A-Z]/, "Must contain uppercase")
  .regex(/[a-z]/, "Must contain lowercase")
  .regex(/[0-9]/, "Must contain number")
  .regex(/[!@#$%^&*()]/, "Must contain special character");




// IdentityCard interface
interface IidentityCard {
  front: {
    url: string;
    public_id: string;
  };
  back: {
    url: string;
    public_id: string;
  };
}

// Avatar interface
interface IAvatar {
  url: string;
  public_id: string;
}

// location interface
interface ILocation {
  type: "Point";
  coordinates: [number, number];
}

// User interface
export interface IUser {
  _id: string;
  name: string;
  email: string;
  identityCard: IidentityCard;
  avatar: IAvatar;
  location: ILocation;
}