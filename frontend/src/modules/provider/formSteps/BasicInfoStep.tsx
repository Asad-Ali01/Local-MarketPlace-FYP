import { useFormContext } from "react-hook-form";
import type { ProviderGigSchemaInputType } from "../schemas/schema";
import { Input } from "@/components/ui/input";
import { useCurrentLocation } from "@/modules/auth/hooks/useCurrentLocation";

function BasicInfoStep() {

    const form = useFormContext<ProviderGigSchemaInputType>();
  
    return (
        <div>

        <Input {...form.register("title")}/>
        <Input {...form.register("description")}/>
        <Input {...form.register("location")} />
        </div>
    );
}

export default BasicInfoStep;