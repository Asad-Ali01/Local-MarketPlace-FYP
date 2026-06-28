import { optionalFileSchema, requiredLocationSchema } from "@/modules/auth/schemas/registerSchema";
import {z} from "zod";
export const providerGigSchema = z.object({
    title:z.string().min(3,"Minimum 3 character required").max(30,"Maximum 30 characters allowed"),
    description:z.string().min(200,"Mininum 200 characters requried"),
    location:requiredLocationSchema,
      image1:optionalFileSchema,
    image2:optionalFileSchema,
    image3:optionalFileSchema,
    status:z.enum(["draft","published"])
})

export type ProviderGigSchemaType = z.infer<typeof providerGigSchema>
export type ProviderGigSchemaInputType = z.input<typeof providerGigSchema>

