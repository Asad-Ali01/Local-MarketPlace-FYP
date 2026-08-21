import { z } from "zod";

import { fileSchema, passwordSchema } from "@/schemas/global.schema";
// File schema - handles both File and undefined/null


export const optionalFileSchema = z
  .instanceof(File)
  .refine((file) => file.size < 5 * 1024 * 1024, "Max 5Mb")
  .refine((file) => file.type.startsWith("image/"), "Only image allowed")
  .optional()
  .nullable();


const baseRegisterFields = {
    name: z
      .string()
      .min(3, "Name should be at least 3 characters")
      .regex(/^[a-zA-Z\s]+$/, "Only letters allowed"),
    email: z.email("Invalid email"),
    password: passwordSchema,
    confirmPassword: passwordSchema,
};

const clientRegisterSchema = z.object({
  ...baseRegisterFields,
  role: z.literal("client"),
  avatar: optionalFileSchema,

});

const providerRegisterSchema = z.object({
  ...baseRegisterFields,
  role: z.literal("provider"),
  avatar: fileSchema,
  front: fileSchema,
  back: fileSchema,
 
});

export const registerSchema = z
  .discriminatedUnion("role", [clientRegisterSchema, providerRegisterSchema])
   .superRefine((data, ctx) => {

    // password check
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "Passwords do not match",
      });
    }

  });

export type RegisterSchemaType = z.infer<typeof registerSchema>;
export type RegisterSchemaInputType = z.input<typeof registerSchema>;