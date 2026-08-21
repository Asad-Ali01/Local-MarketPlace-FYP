import { useState } from "react";
import { useFormContext } from "react-hook-form";

import type { ProviderGigSchemaInputType } from "../../../schemas/gig";

import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { X } from "lucide-react";
import { Button } from "antd";

function PriceAndTagsStep() {
  const form = useFormContext<ProviderGigSchemaInputType>();

  const [tagInput, setTagInput] = useState("");

  const tags = form.watch("tags") || [];

  const addTag = () => {
    const value = tagInput.trim();

    if (!value) return;
    if (tags.includes(value)) return;
    if (tags.length >= 10) return;

    form.setValue("tags", [...tags, value], {
      shouldValidate: true,
    });

    setTagInput("");
  };

  const removeTag = (tag: string) => {
    form.setValue(
      "tags",
      tags.filter((t) => t !== tag),
      {
        shouldValidate: true,
      }
    );
  };

  return (
    <div className="space-y-6">

      {/* Starting Price */}

      <Field>
        <FieldLabel>Starting Price (Optional)</FieldLabel>

     <Input
  type="number"
  placeholder="e.g.5000"
  {...form.register("startingPrice", {
    setValueAs: (v) => {
      return v === "" ? undefined : Number(v);
    },
  })}
/>

        <p className="text-sm text-muted-foreground mt-1">
          Leave empty to display <strong>Price on Request</strong>.
        </p>

        <FieldError errors={[form.formState.errors.startingPrice]} />
      </Field>

      {/* Tags */}

      <Field>
        <FieldLabel>Tags</FieldLabel>

        <div className="flex ">
          <Input
          className="rounded-r-none flex-1"
            placeholder="React"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addTag();
              }
            }}
          />

          <Button
          className="p-[19px]!  border-l-0 flex-none  rounded-l-none!"
            type="primary"
            onClick={addTag}
          >
            Add
          </Button>
        </div>

        <p className="text-sm text-muted-foreground mt-2">
          Add up to 10 tags.
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <div
              key={tag}
              className="flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700"
            >
              {tag}

              <button
                type="button"
                onClick={() => removeTag(tag)}
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>

        <FieldError errors={[form.formState.errors.tags]} />
      </Field>

    </div>
  );
}

export default PriceAndTagsStep;