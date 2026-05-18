import express from "express";

import {
  createLead,
  getLeads,
  updateLead,
  deleteLead,
} from "../controllers/leadController";

import authMiddleware from "../middleware/authMiddleware";

import authorizeRoles from "../middleware/roleMiddleware";

const router = express.Router();

// CREATE LEAD
router.post(
  "/",
  authMiddleware,
  authorizeRoles("admin"),
  createLead
);

// GET LEADS
router.get(
  "/",
  authMiddleware,
  getLeads
);

// UPDATE LEAD
router.put(
  "/:id",
  authMiddleware,
  updateLead
);

// DELETE LEAD
router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles("admin"),
  deleteLead
);

export default router;