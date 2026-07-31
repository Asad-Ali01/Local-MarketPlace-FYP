import {z} from "zod";
export const loginSchema = z.object({
    email:z.email("Invalid email"),
    password:z.string()
})


// PasswordSchema
export const passwordSchema = z
  .string()
  .min(8, "Minimum 8 characters")
  .regex(/[A-Z]/, "Must contain uppercase")
  .regex(/[a-z]/, "Must contain lowercase")
  .regex(/[0-9]/, "Must contain number")
  .regex(/[!@#$%^&*()]/, "Must contain special character");



export const fileSchema = z
  .instanceof(File,{message:"File is required"})
  .refine((file) => file.size < 5 * 1024 * 1024, "Max 5Mb")
  .refine((file) => file.type.startsWith("image/"), "Only image allowed");


export type loginSchemaType = z.infer<typeof loginSchema>


export const resetPasswordSchema = z.object({
  oldPassword:z.string(),
  newPassword:passwordSchema,
  confirmPassword:passwordSchema
}).superRefine((data,ctx) => {
  if(data.newPassword !== data.confirmPassword){
    ctx.addIssue({
      code:"custom",
      path:["confirmPassword"],
      message:"Password do not match"
    })
  }
})

export type resetPasswordType = z.infer<typeof resetPasswordSchema>;