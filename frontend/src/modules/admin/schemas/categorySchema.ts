import { fileSchema } from "@/schemas/global.schema";
import {z} from "zod";
export const createSchema = z.object({
    name:z.string().min(5,"Minimum 5 characters requried"),
    icon:fileSchema
})

export const createSubSchema = z.object({
    category: z.string(),
    name:z.string().min(5,"Minium 5 characters required")
})

export type CreateSubSchemaType = z.infer<typeof createSubSchema> 

export type CreateSchemaType = z.infer<typeof createSchema>
