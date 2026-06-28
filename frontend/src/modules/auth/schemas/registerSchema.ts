import { z } from "zod";
import { passwordSchema } from "@/types/global.schemas";
import { fileSchema } from "@/schemas/global.schema";
// File schema - handles both File and undefined/null


export const optionalFileSchema = z
  .instanceof(File)
  .refine((file) => file.size < 5 * 1024 * 1024, "Max 5Mb")
  .refine((file) => file.type.startsWith("image/"), "Only image allowed")
  .optional()
  .nullable();




// Location schema - for PROVIDER (required)
export const requiredLocationSchema = z.object({
  lng: z.coerce.number()
    .min(-180, "Longitude must be >= -180")
    .max(180, "Longitude must be <= 180"),

  lat: z.coerce.number()
    .min(-90, "Latitude must be >= -90")
    .max(90, "Latitude must be <= 90"),
},"Location is required")
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
  location: requiredLocationSchema,
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

    //  location required for provider
    if (data.role === "provider") {
      if (!data.location) {
        ctx.addIssue({
          code: "custom",
          path: ["location"],
          message: "Location is required",
        });
      }
    }
  });

export type RegisterSchemaType = z.infer<typeof registerSchema>;
export type RegisterSchemaInputType = z.input<typeof registerSchema>;