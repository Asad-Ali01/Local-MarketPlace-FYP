import { useFormContext } from "react-hook-form";
import type { ProviderGigSchemaInputType } from "../../../schemas/gig";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { useLazyGetLocationSuggestionsQuery } from "@/features/gig/gigApi";
import useDebounce from "@/hooks/useDebounce";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type LocationSuggestion = {
  id: string;
  displayName: string;
  latitude: number;
  longitude: number;
  city: string;
};
function BasicInfoStep() {
  const form = useFormContext<ProviderGigSchemaInputType>();
  const location = form.watch("location");
  const debouncedSearch = useDebounce(location.locationName, 500);
  const [showSuggestions, setShowSuggestion] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [trigger, { data }] = useLazyGetLocationSuggestionsQuery();
  const suggestions = data?.data ?? [];
  const locationName = form.register("location.locationName");
  const city = form.register("location.city");
  const lat = form.register("location.lat", { valueAsNumber: true });
  const lng = form.register("location.lng", { valueAsNumber: true });

 
  useEffect(() => {
    if (debouncedSearch.length < 3) {
      setShowSuggestion(false);
      return;
    }
    trigger(debouncedSearch);
  }, [debouncedSearch, trigger]);

  return (
    <div className="w-full   space-y-5">
      <Field>
        <FieldLabel>Enter Title</FieldLabel>
        <Input
          variant={form.formState.errors.title ? "error" : "default"}
          placeholder="e.g. Solar cleaner,web developer"
          {...form.register("title")}
        />
        <FieldError errors={[form.formState.errors?.title]} />
      </Field>
      {/* Description */}
      <Field>
        <FieldLabel>Enter Description</FieldLabel>
        <Textarea
          variant={form.formState.errors.description ? "error" : "default"}
          placeholder="Describe your service..."
          {...form.register("description")}
          className="w-full rounded-md border p-3 min-h-40!"
        />
        <FieldError errors={[form.formState.errors?.description]} />
      </Field>
      {/* Location */}
      <h1>Enter Location</h1>
      <section className="grid sm:grid-cols-2 gap-2">
        <Field className="relative">
          <FieldLabel>Location name</FieldLabel>
          <Input
            variant={
              form.formState.errors.location?.locationName ? "error" : "default"
            }
            placeholder="Islamabad, Pakistan"
            {...locationName}
            onChange={(e) => {
              locationName.onChange(e);
              setShowSuggestion(true);
              form.trigger("location.locationName");
            }}
            onKeyDown={(e) => {
              switch (e.key) {
                case "ArrowDown":
                  e.preventDefault();
                  setSelectedIndex((prev) =>
                    Math.min(prev + 1, suggestions.length - 1),
                  );
                  break;
                case "ArrowUp":
                  e.preventDefault();
                  setSelectedIndex((prev) => Math.max(prev - 1, 0));
                  break;
                case "Enter":
                  e.preventDefault();
                  const item = suggestions[selectedIndex];
                  form.setValue("location.lat", item.latitude);
                  form.setValue("location.lng", item.longitude);
                  form.setValue("location.locationName", item.displayName);
                  form.setValue("location.city", item.city);

                  setShowSuggestion(false);
                  break;
                case "Escape":
                  setShowSuggestion(false);
                  break;
              }
            }}
          />
          <FieldError errors={[form.formState.errors.location?.locationName]} />
          <div className=" rounded mt-2 absolute top-15">
            {showSuggestions &&
              suggestions.length > 0 &&
              suggestions.map((item,index) => (
                <div
                  key={item.id}
                  className={cn("p2 cursor-pointer bg-olive-300 border",index == selectedIndex ? "bg-blue-100" : "hover:bg-amber-400")}
                  onClick={() => {
                    form.setValue("location.lat", item.latitude);
                    form.setValue("location.lng", item.longitude);
                    form.setValue("location.locationName", item.displayName);
                    form.setValue("location.city", item.city);

                    setShowSuggestion(false);
                  }}
                >
                  {item.displayName}
                </div>
              ))}
          </div>
        </Field>
        {/* Location city */}
        <Field>
          <FieldLabel>Location city</FieldLabel>
          <Input
            variant={form.formState.errors.location?.city ? "error" : "default"}
            placeholder="Islamabad, Pakistan"
            {...city}
            onChange={(e) => {
              city.onChange(e);
              form.trigger("location.city");
            }}
          />
          <FieldError errors={[form.formState.errors.location?.city]} />
        </Field>

        <Field>
          <FieldLabel>Latitude</FieldLabel>
          <Input
            placeholder="e.g. 100"
            variant={form.formState.errors.location?.lat ? "error" : "default"}
            {...lat}
            onChange={(e) => {
              lat.onChange(e);
              form.trigger("location.lat");
            }}
          />
          <FieldError errors={[form.formState.errors.location?.lat]} />
        </Field>

        <Field>
          <FieldLabel>Longitude</FieldLabel>
          <Input
            variant={form.formState.errors.location?.lng ? "error" : "default"}
            placeholder="e.g. 87"
            {...lng}
            onChange={(e) => {
              lng.onChange(e);
              form.trigger("location.lng");
            }}
          />
          <FieldError errors={[form.formState.errors.location?.lng]} />
        </Field>
      </section>
    </div>
  );
}

export default BasicInfoStep;
