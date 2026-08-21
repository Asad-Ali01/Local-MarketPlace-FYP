import { optionalFileSchema } from "@/schemas/registerSchema";
import { z } from "zod";
// Location schema - for PROVIDER (required)
export const locationSchema = z.object(
  {
    lng: z
      .number("Longitude is required")
      .min(-180, "Longitude must be greater than -180")
      .max(180, "Longitude must be less than 180"),

    lat: z
      .number("Latitude is required")
      .min(-90, "Latitude must be greater than -90")
      .max(90, "Latitude must be less than 90"),

    locationName: z.string().trim().min(3, "Location name is required"),
    city: z.string().trim().min(3, "City is required"),
  },
  "Location is required",
);

export const providerGigSchema = z.object({
  avatar: optionalFileSchema,
  title: z
    .string()
    .min(3, "Minimum 3 character required")
    .max(80, "Maximum 80 characters allowed"),
  description: z.string().min(200, "Mininum 200 characters requried"),
  location: locationSchema,
  category: z.string().min(3, "Category is required"),
  subcategory: z.string().min(3, "Subcategory is required"),
  image1: optionalFileSchema,
  image2: optionalFileSchema,
  image3: optionalFileSchema,
  status: z.enum(["draft", "published"]),
  startingPrice: z.number().positive().optional(),
  tags: z.array(z.string(), "Tags are required"),
});

export type ProviderGigSchemaType = z.infer<typeof providerGigSchema>;
export type ProviderGigSchemaInputType = z.input<typeof providerGigSchema>;
