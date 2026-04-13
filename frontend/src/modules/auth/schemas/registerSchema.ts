import { z } from "zod";
import { passwordSchema } from "@/types/global.types";
//   File schema
const fileSchema =  z
      .instanceof(File)
      .refine((file) => file && file.size < 5 * 1024 * 1024, "Max 5Mb")
      .refine((file) => file && file.type.startsWith("image/"), "Only image allowed")


// Location Schema 
const locationSchema = z
.object({
    lng: z.coerce.number()
    .min(-180,"Longitude must be >= -180")
    .max(180,"Longitude must be <= 180"),
    lat: z.coerce.number()
    .min(-90,"Latitude must be >= -90")
    .max(90,"Latitude must be <= 90")
})
.transform(({lng,lat}) => ({
  type:"Point",
    coordinates:[lng,lat] as [number,number]
}))
export const registerSchema = z
  .object({
    name: z
      .string()
      .min(3, "Name should be at least 3 characters")
      .regex(/^[a-zA-Z\s]+$/, "Only letters allowed"),
    email: z.email("Invalid email"),
    password: passwordSchema,
    confirmPassword: passwordSchema,
    role: z.enum(["client", "provider"]),
    avatar:fileSchema,
      front:fileSchema,
      back: fileSchema,
    location: locationSchema
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
export type RegisterSchemaType = z.infer<typeof registerSchema>
export type RegisterSchemaInputType = z.input<typeof registerSchema>