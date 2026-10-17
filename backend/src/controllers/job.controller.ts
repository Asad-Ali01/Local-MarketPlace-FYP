
import { Request, Response } from 'express';
import { Types } from 'mongoose';

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



// Create a new job
export const createJobController = asyncHandler(
  async (req: Request<{},{},CreateJobInput>, res: Response) => {
    const jobData = createJobSchema.parse(req.body);

    const clientId = req.user._id.toString();
console.log("Skills received:", req.body.skills);
console.log("Is array:", Array.isArray(req.body.skills));
console.log("Element types:", Array.isArray(req.body.skills)
  ? req.body.skills.map(skill => typeof skill)
  : typeof req.body.skills
);
    const job = await createJob(clientId, jobData);

    res.status(201).json({
      success: true,
      message: 'Job created successfully',
      data: job,
    });
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

    res.status(200).json({
      success: true,
      message: 'Your jobs fetched successfully',
      data: jobs,
    });
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

    res.status(200).json({
      success: true,
      message: 'Open jobs fetched successfully',
      data: jobs,
    });
  },
);

// Get one job by its ID
export const getJobByIdController = asyncHandler(
  async (req: Request<{ jobId: string }>, res: Response) => {
    const { jobId } = req.params;

    const job = await getJobById(jobId);

    res.status(200).json({
      success: true,
      message: 'Job fetched successfully',
      data: job,
    });
  },
);

// Update a job owned by the logged-in client
export const updateJobController = asyncHandler(
  async (req: Request<{jobId:string;}>, res: Response) => {
    const { jobId } = req.params;
    const clientId = req.user._id.toString();

    const updates = updateJobSchema.parse(req.body);

    const job = await updateJob(clientId, jobId, updates);

    res.status(200).json({
      success: true,
      message: 'Job updated successfully',
      data: job,
    });
  },
);

// Cancel a job owned by the logged-in client
export const cancelJobController = asyncHandler(
  async (req: Request<{jobId:string;}>, res: Response) => {
    const { jobId } = req.params;
    const clientId = req.user._id.toString();

    const job = await cancelJob(clientId, jobId);

    res.status(200).json({
      success: true,
      message: 'Job cancelled successfully',
      data: job,
    });
  },
);