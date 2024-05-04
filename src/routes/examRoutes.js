import express from "express";
import {
  createExam,
  deleteExam,
  editExam,
  getExamByClass,
  getExamById,
  getExams,
} from "../controller/examController.js";

export const examRoutes = express.Router();

examRoutes.post("/create", createExam);
examRoutes.get("/get-all", getExams);
examRoutes.get("/:id", getExamById);
examRoutes.get("/class/:batchId/:classId", getExamByClass);
examRoutes.put("/:id", editExam);
examRoutes.delete("/:id", deleteExam);
