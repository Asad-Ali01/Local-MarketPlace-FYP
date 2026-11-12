import { Router } from "express";

import { createProposalController, getMyProposalsController, getSingleProposalController, withdrawProposalController } from "../controllers/proposal.controller";
import { verifyJWT } from "../middleware/auth.middleware";
import { authorrizeRoles } from "../middleware/role.middleware";
import { validate } from "../middleware/validate.middleware";
import { createProposalSchema } from "../schema/proposal.schema";


const router = Router();

router.post(
  "/:jobId",
  verifyJWT,
  authorrizeRoles("provider"),
  validate(createProposalSchema),
  createProposalController
);
router.get(
  "/mine",
  verifyJWT,
  authorrizeRoles("provider"),
  getMyProposalsController
);

router.patch(
  "/:proposalId/withdraw",
  verifyJWT,
  authorrizeRoles("provider"),
  withdrawProposalController
);

// Fetch single proposal
router.get(
  "/:proposalId",
  verifyJWT,
  authorrizeRoles("provider"),
  getSingleProposalController
);
export default router;