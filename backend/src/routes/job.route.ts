
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

// Public route: providers can browse open jobs
router.get('/open', getOpenJobsController);

// Public route: fetch one job
router.get('/:jobId', getJobByIdController);

// Client-only routes: verifyJWT should require authentication.

router.post('/', verifyJWT, createJobController);
router.get('/mine', verifyJWT, getMyJobsController);
router.patch('/:jobId', verifyJWT, updateJobController);
router.patch('/:jobId/cancel', verifyJWT, cancelJobController);

export default router;