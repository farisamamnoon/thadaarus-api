import express from "express";

import {
  createStudent,
  deleteStudent,
  editStudent,
  getMarksByStudent,
  getStudentByClass,
  getStudentById,
  getStudents,
  getStudentsByCategory,
  newExamMarks,
} from "../controller/studentController.js";

export const studentRoutes = express.Router();

studentRoutes.post("/create", createStudent);
studentRoutes.post("/:id/marks", newExamMarks);
studentRoutes.get("/:id/marks", getMarksByStudent);
studentRoutes.get("/get-all", getStudents);
studentRoutes.get("/class/:id", getStudentByClass);
studentRoutes.get("/category", getStudentsByCategory);
studentRoutes.put("/:id/edit", editStudent);
studentRoutes.get("/:id", getStudentById);
studentRoutes.delete("/:id/delete", deleteStudent);
