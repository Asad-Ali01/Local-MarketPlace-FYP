import type { ServerValidationError } from "@/types/job.types";

 export const getServerValidationErrors = (
  error: unknown
): ServerValidationError[] => {
  if (
    !error ||
    typeof error !== "object" ||
    !("data" in error)
  ) {
    return [];
  }

  const data = error.data;

  if (
    !data ||
    typeof data !== "object" ||
    !("errors" in data) ||
    !Array.isArray(data.errors)
  ) {
    return [];
  }

  return data.errors.filter(
    (item): item is ServerValidationError =>
      typeof item === "object" &&
      item !== null &&
      "path" in item &&
      Array.isArray(item.path) &&
      "message" in item &&
      typeof item.message === "string"
  );
};
