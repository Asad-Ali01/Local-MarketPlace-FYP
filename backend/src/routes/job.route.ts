import { Router } from 'express';

import {
  createJobController,
  getMyJobsController,
  getOpenJobsController,
  getJobByIdController,
  updateJobController,
  cancelJobController,
} from '../controllers/job.controller';

import { verifyJWT } from '../middleware/auth.middleware';

const router = Router();

// Public routes
router.get('/open', getOpenJobsController);

// Client-only routes
router.post('/', verifyJWT, createJobController);
router.get('/mine', verifyJWT, getMyJobsController);

// Dynamic routes — keep these after specific routes
router.patch('/:jobId/cancel', verifyJWT, cancelJobController);
router.patch('/update-job/:jobId', verifyJWT, updateJobController);
router.get('/:jobId', getJobByIdController);

export default router;