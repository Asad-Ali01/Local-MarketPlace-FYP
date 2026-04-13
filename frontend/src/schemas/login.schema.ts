import {z} from "zod";
import { passwordSchema } from "@/types/global.types";
export const loginSchema = z.object({
    email:z.email("Invalid email"),
    password:passwordSchema
})

export type loginSchemaType = z.infer<typeof loginSchema>