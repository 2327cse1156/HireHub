import express from "express"
import { getJobById, getJobs } from "../controllers/jobController.js";
const router = express.Router()

// routes to get all job data
router.get("/",getJobs)
// route to a single job by ID
router.get("/:id",getJobById)
export default router;