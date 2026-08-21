import {z} from 'zod';
const optionalFileSchema = z
  .instanceof(File)
  .refine((file) => file.size < 5 * 1024 * 1024, "Max 5Mb")
  .refine((file) => file.type.startsWith("image/"), "Only image allowed")
  .optional()
  .nullable();


export const editUserSchema = z.object({
    avatar:optionalFileSchema,
    front:optionalFileSchema,
    back:optionalFileSchema,
    name:z
      .string()
      .min(3, "Name should be at least 3 characters")
      .regex(/^[a-zA-Z\s]+$/, "Only letters allowed")
      .optional()
      ,
      email:z.email("Invalid email").optional(),
      role: z.enum(["provider","admin","client"]).optional(),
      status:z.enum(["pending", "rejected","approved"]).optional(),
})

export type editUserSchemaType = z.infer<typeof editUserSchema>;