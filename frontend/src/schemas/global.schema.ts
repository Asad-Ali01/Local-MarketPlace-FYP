import {z} from "zod";
export const loginSchema = z.object({
    email:z.email("Invalid email"),
    password:z.string()
})


export const fileSchema = z
  .instanceof(File,{message:"File is required"})
  .refine((file) => file.size < 5 * 1024 * 1024, "Max 5Mb")
  .refine((file) => file.type.startsWith("image/"), "Only image allowed");


export type loginSchemaType = z.infer<typeof loginSchema>