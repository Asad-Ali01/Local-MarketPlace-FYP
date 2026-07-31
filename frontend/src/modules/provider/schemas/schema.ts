import { optionalFileSchema, requiredLocationSchema } from "@/modules/auth/schemas/registerSchema";
import {z} from "zod";
export const providerGigSchema = z.object({
    avatar:optionalFileSchema,
    title:z.string().min(3,"Minimum 3 character required").max(80,"Maximum 80 characters allowed"),
    description:z.string().min(200,"Mininum 200 characters requried"),
    location:z.string().min(5,"Minumum 5 characters required"),
   category: z.string().min(1, "Category is required"),
subcategory: z.string().min(1, "Subcategory is required"),
    image1:optionalFileSchema,
    image2:optionalFileSchema,
    image3:optionalFileSchema,
    status:z.enum(["draft","published"]),
    startingPrice:z.number().positive().optional(),
    tags:z.array(z.string(),"Tags are required")
})

export type ProviderGigSchemaType = z.infer<typeof providerGigSchema>
export type ProviderGigSchemaInputType = z.input<typeof providerGigSchema>

