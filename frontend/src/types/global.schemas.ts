import {z} from "zod";
// PasswordSchema
export const passwordSchema = z
  .string()
  .min(8, "Minimum 8 characters")
  .regex(/[A-Z]/, "Must contain uppercase")
  .regex(/[a-z]/, "Must contain lowercase")
  .regex(/[0-9]/, "Must contain number")
  .regex(/[!@#$%^&*()]/, "Must contain special character");


