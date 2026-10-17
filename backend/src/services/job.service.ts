import { Types } from "mongoose";
import { Job } from "../models/job.model";
import { CreateJobInput, JobPaginationOptions, UpdateJobInput } from "../types/job.types";
import { buildCursorFilter, getPaginationLimit, getPaginationResult, parseCursor, validateObjectId } from "../utils/sharedUtil";
import { ApiError } from "../utils/ApiError";


// Create a job for the authenticated client.
export const createJob = async (
  clientId: string,
  jobData: CreateJobInput,
) => {
  validateObjectId(clientId, 'client ID');

  const job = await Job.create({
    ...jobData,
    client: new Types.ObjectId(clientId),
  });

  return job;
};

// Get jobs belonging to the authenticated client.
export const getMyJobs = async (
  clientId: string,
  options: JobPaginationOptions = {},
) => {
  validateObjectId(clientId, 'client ID');

  const limit = getPaginationLimit(options.limit);
  const cursor = parseCursor(options.cursor);

  const filter: Record<string, unknown> = {
    client: new Types.ObjectId(clientId),
  };

  if (cursor) {
    Object.assign(filter, buildCursorFilter(cursor));
  }

  const jobs = await Job.find(filter)
    .sort({ createdAt: -1, _id: -1 })
    .limit(limit + 1);

  return getPaginationResult(jobs, limit);
};

// Browse open jobs as a provider.
export const getOpenJobs = async (
  options: JobPaginationOptions = {},
) => {
  const limit = getPaginationLimit(options.limit);
  const cursor = parseCursor(options.cursor);

  const filter: Record<string, unknown> = {
    status: 'open',
  };

  if (cursor) {
    Object.assign(filter, buildCursorFilter(cursor));
  }

  const jobs = await Job.find(filter)
    .sort({ createdAt: -1, _id: -1 })
    .limit(limit + 1)
    .populate('client', 'name avatar');

  return getPaginationResult(jobs, limit);
};

// Get a job by its ID.
export const getJobById = async (jobId: string) => {
  validateObjectId(jobId, 'job ID');

  const job = await Job.findById(jobId).populate(
    'client',
    'name avatar',
  );

  if (!job) {
    throw new ApiError(404, 'Job not found');
  }

  return job;
};

// Update a job belonging to the client.
// Only open jobs can be edited.
export const updateJob = async (
  clientId: string,
  jobId: string,
  updates: UpdateJobInput,
) => {
  validateObjectId(clientId, 'client ID');
  validateObjectId(jobId, 'job ID');

  const job = await Job.findOne({
    _id: jobId,
    client: clientId,
  });

  if (!job) {
    throw new ApiError(404, 'Job not found');
  }

  if (job.status !== 'open') {
    throw new ApiError(400, 'Only open jobs can be edited');
  }

  // Assign only permitted fields, never client or status.
  const allowedFields: (keyof UpdateJobInput)[] = [
    'title',
    'description',
    'category',
    'skills',
    'budgetType',
    'budgetMin',
    'budgetMax',
    'deadline',
  ];

  for (const field of allowedFields) {
    if (updates[field] !== undefined) {
      (job as any)[field] = updates[field];
    }
  }

  await job.save();

  return job;
};

// Cancel a job belonging to the client.
export const cancelJob = async (
  clientId: string,
  jobId: string,
) => {
  validateObjectId(clientId, 'client ID');
  validateObjectId(jobId, 'job ID');

  const job = await Job.findOne({
    _id: jobId,
    client: clientId,
  });

  if (!job) {
    throw new ApiError(404, 'Job not found');
  }

  if (job.status !== 'open') {
    throw new ApiError(400, 'Only open jobs can be cancelled');
  }

  job.status = 'cancelled';

  await job.save();

  return job;
};

