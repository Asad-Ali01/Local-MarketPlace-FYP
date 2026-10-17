import mongoose, { Types } from "mongoose";
import { ApiError } from "../utils/ApiError";

export interface CursorData {
  createdAt: string;
  _id: string;
}
export const validateObjectId = (id: string, fieldName: string) => {
  if (!Types.ObjectId.isValid(id)) {
    throw new ApiError(400, `Invalid ${fieldName}`);
  }
};
export const getPaginationLimit = (limit?: number): number => {
  if (limit === undefined) return 20;

  if (!Number.isSafeInteger(limit) || limit < 1) {
    throw new ApiError(400, "Limit must be a positive integer.");
  }

  return Math.min(limit, 50);
};

export const parseCursor = (cursor?: string): CursorData | null => {
  if (cursor === undefined) return null;

  try {
    const decoded = JSON.parse(Buffer.from(cursor, "base64").toString("utf-8"));

    if (
      !decoded ||
      typeof decoded.createdAt !== "string" ||
      Number.isNaN(Date.parse(decoded.createdAt)) ||
      typeof decoded._id !== "string" ||
      !mongoose.isObjectIdOrHexString(decoded._id)
    ) {
      throw new Error("Invalid cursor");
    }

    return {
      createdAt: decoded.createdAt,
      _id: decoded._id,
    };
  } catch {
    throw new ApiError(400, "Invalid pagination cursor.");
  }
};

export const buildCursorFilter = (cursor: CursorData) => {
  const createdAt = new Date(cursor.createdAt);
  const _id = new mongoose.Types.ObjectId(cursor._id);

  return {
    $or: [{ createdAt: { $lt: createdAt } }, { createdAt, _id: { $lt: _id } }],
  };
};

export const encodeCursor = (data: CursorData): string => {
  return Buffer.from(JSON.stringify(data)).toString("base64");
};

export const getPaginationResult = <
  T extends {
    createdAt: Date;
    _id: mongoose.Types.ObjectId;
  },
>(
  documents: T[],
  limit: number,
) => {
  const hasMore = documents.length > limit;
  const results = documents.slice(0, limit);
  const lastDocument = results[results.length - 1];

  return {
    results,
    hasMore,
    nextCursor:
      hasMore && lastDocument
        ? encodeCursor({
            createdAt: lastDocument.createdAt.toISOString(),
            _id: lastDocument._id.toString(),
          })
        : null,
  };
};
