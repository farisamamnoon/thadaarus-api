import express from "express";
import {
  createSubject,
  deleteSubject,
  editSubject,
  getSubjectById,
  getSubjects,
} from "../controller/subjectController.js";

export const subjectRoutes = express.Router();

subjectRoutes.post("/", createSubject);
subjectRoutes.get("/", getSubjects);
subjectRoutes.get("/:id", getSubjectById);
subjectRoutes.put("/:id", editSubject);
subjectRoutes.delete("/:id", deleteSubject);
