import { Router } from "express";
import { getGigsWithCursor, searchServices } from "../controllers/search.controller";

const router = Router();

router.route("/").get(searchServices);
router.route("/getGigs").get(getGigsWithCursor);
export default router;