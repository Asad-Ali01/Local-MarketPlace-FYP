import ImageDropzone from "@/components/shared/ImageDropZone";
import { Label } from "@/components/ui/label";

import { Controller, type Control, type FieldErrors } from "react-hook-form";
import { Error } from "./RegisterForm";
import type { RegisterSchemaInputType } from "../schemas/registerSchema";

type Props = {
  control: Control<RegisterSchemaInputType>;
  errors: FieldErrors<RegisterSchemaInputType>;
};

function IdentityVerificationSection({ control, errors }: Props) {
  return (
    <div>
      <div>
        <h3 className="font-semibold text-gray-800 mb-2">
          Identity Verification
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <div className="flex gap-1">
              <Label>Front CNIC</Label>
              <span className="text-red-500">*</span>
            </div>
            <Controller
              name="front"
              control={control}
              render={({ field }) => (
                <ImageDropzone
                  label="IdentityCard front Side"
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />

            <Error msg={(errors as any).front?.message} />
          </div>

          <div>
            <div className="flex gap-1">
              <Label>Back CNIC</Label>
              <span className="text-red-500">*</span>
            </div>
            <Controller
              name="back"
              control={control}
              render={({ field }) => (
                <ImageDropzone
                  label="IdentityCard back Side"
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />

            <Error msg={(errors as any).back?.message} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default IdentityVerificationSection;
