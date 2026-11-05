import { Request, Response } from 'express';

import {
  createJob,
  getMyJobs,
  getOpenJobs,
  getJobById,
  updateJob,
  cancelJob,
} from '../services/job.service';

import { asyncHandler } from '../utils/asynHandler';
import { createJobSchema, updateJobSchema } from '../schema/job.schema';
import { CreateJobInput } from '../types/job.types';
import { ApiError } from '../utils/ApiError';
import { ApiResponse } from '../utils/ApiRespose';


// Create a new job
export const createJobController = asyncHandler(
  async (
    req: Request<{}, {}, CreateJobInput>,
    res: Response,
  ) => {
    const jobData = createJobSchema.parse(req.body);
    const clientId = req.user._id.toString();

    const job = await createJob(clientId, jobData);

    return res
      .status(201)
      .json(new ApiResponse(201, job, 'Job created successfully'));
  },
);

// Get jobs created by the logged-in client
export const getMyJobsController = asyncHandler(
  async (req: Request, res: Response) => {
    const clientId = req.user._id.toString();

    const limit = Number(req.query.limit) || 10;

    const cursor =
      typeof req.query.cursor === 'string'
        ? req.query.cursor
        : undefined;

    const jobs = await getMyJobs(clientId, { limit, cursor });

    return res
      .status(200)
      .json(new ApiResponse(200, jobs, 'Your jobs fetched successfully'));
  },
);

// Get all open jobs
export const getOpenJobsController = asyncHandler(
  async (req: Request, res: Response) => {
    const limit = Number(req.query.limit) || 10;

    const cursor =
      typeof req.query.cursor === 'string'
        ? req.query.cursor
        : undefined;

    const jobs = await getOpenJobs({ limit, cursor });

    return res
      .status(200)
      .json(new ApiResponse(200, jobs, 'Open jobs fetched successfully'));
  },
);

// Get one job by its ID
export const getJobByIdController = asyncHandler(
  async (
    req: Request<{ jobId: string }>,
    res: Response,
  ) => {
    const { jobId } = req.params;

    if (!jobId) {
      throw new ApiError(400, 'Job ID is required');
    }

    const job = await getJobById(jobId);

    return res
      .status(200)
      .json(new ApiResponse(200, job, 'Job fetched successfully'));
  },
);

// Update a job owned by the logged-in client
export const updateJobController = asyncHandler(
  async (
    req: Request<{ jobId: string }>,
    res: Response,
  ) => {
    const { jobId } = req.params;
    const clientId = req.user._id.toString();

    if (!jobId) {
      throw new ApiError(400, 'Job ID is required');
    }
    console.log("req.body: ",req.body)
    const updates = updateJobSchema.parse(req.body);

    const job = await updateJob(clientId, jobId, updates);

    return res
      .status(200)
      .json(new ApiResponse(200, job, 'Job updated successfully'));
  },
);

// Cancel a job owned by the logged-in client
export const cancelJobController = asyncHandler(
  async (
    req: Request<{ jobId: string }>,
    res: Response,
  ) => {
    const { jobId } = req.params;
    const clientId = req.user._id.toString();

    if (!jobId) {
      throw new ApiError(400, 'Job ID is required');
    }

    const job = await cancelJob(clientId, jobId);

    return res
      .status(200)
      .json(new ApiResponse(200, job, 'Job cancelled successfully'));
  },
);