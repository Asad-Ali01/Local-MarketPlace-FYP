import { useFormContext } from "react-hook-form";
import type { ProviderGigSchemaInputType } from "../../schemas/schema";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
function BasicInfoStep() {
  const form = useFormContext<ProviderGigSchemaInputType>();

  return (
    <div className="w-full   space-y-5">
      <Field>
        <FieldLabel>Enter Title</FieldLabel>
        <Input
          placeholder="e.g. Solar cleaner,web developer"
          {...form.register("title")}
        />
        <FieldError errors={[form.formState.errors?.title]} />
      </Field>
      {/* Description */}
      <Field>
        <FieldLabel>Enter Description</FieldLabel>
        <Textarea
          placeholder="Describe your service..."
          {...form.register("description")}
      
          className="w-full rounded-md border p-3"
        />
        <FieldError errors={[form.formState.errors?.description]} />
      </Field>
      {/* Location */}
      <Field>
        <FieldLabel>Enter Location</FieldLabel>
        <Input
          placeholder="Islamabad, Pakistan"
          {...form.register("location")}
        />
        <FieldError errors={[form.formState.errors.location]} />
      </Field>
   
    </div>
  );
}

export default BasicInfoStep;
