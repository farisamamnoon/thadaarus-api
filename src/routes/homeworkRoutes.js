import express from "express";
import {
  createHomeWork,
  deleteHomework,
  getHomeworkById,
  getHomeworks,
  editHomework,
  getHomeworkByClass,
} from "../controller/homeworkController.js";

export const homeworkRoutes = express.Router();

homeworkRoutes.post("/create", createHomeWork);
homeworkRoutes.get("/get-all", getHomeworks);
homeworkRoutes.get("/batch/:batchId/class/:id", getHomeworkByClass);
homeworkRoutes.get("/batch/:batchId/class/:classId/student/:studentId", getHomeworkByClass);
homeworkRoutes.get("/:id", getHomeworkById);
homeworkRoutes.put("/:id", editHomework);
homeworkRoutes.delete("/:id", deleteHomework);
