import express from "express";
import {
  changeVisibility,
  getCompanyData,
  getCompanyJobApplicants,
  getCompanyPostedJobs,
  jobApplicationStatus,
  loginCompany,
  postJob,
  registerCompany,
} from "../controllers/companyController.js";
import upload from "../config/multer.js";
import { protectCompany } from "../middlewares/authMiddleware.js";

const router = express.Router();

// register a company

router.post("/register", upload.single("image") , registerCompany);

// company login
router.post("/login", loginCompany);

// get company data
router.get("/company", protectCompany , getCompanyData);

// post a job
router.post("/post-job",protectCompany, postJob);

// get appliants

router.get("/applicants",protectCompany, getCompanyJobApplicants);

// get company job list

router.get("/list-jobs",protectCompany, getCompanyPostedJobs);

// change status

router.post("/change-status",protectCompany, jobApplicationStatus);

// change visiblity

router.post("/change-visibility",protectCompany, changeVisibility);

export default router;