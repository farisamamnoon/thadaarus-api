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
  getAttendance,
  markAttendance,
  getStudentFees,
} from "../controller/studentController.js";

export const studentRoutes = express.Router();

studentRoutes.post("/create", createStudent);
studentRoutes.post("/:id/marks", newExamMarks);
studentRoutes.put("/:id/attendance", markAttendance);
studentRoutes.get("/:id/attendance", getAttendance);
studentRoutes.get("/:id/marks", getMarksByStudent);
studentRoutes.get("/fees", getStudentFees);
studentRoutes.get("/get-all", getStudents);
studentRoutes.get("/batch/:batchId/class/:id", getStudentByClass);
studentRoutes.get("/category", getStudentsByCategory);
studentRoutes.put("/:id/edit", editStudent);
studentRoutes.get("/:id", getStudentById);
studentRoutes.delete("/:id/delete", deleteStudent);
