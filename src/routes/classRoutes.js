import express from "express";

import {
  addAttendance,
  attendanceByStudent,
  createClass,
  deleteClass,
  editClass,
  getClassById,
  getClasses,
  getSubjectsByClass,
} from "../controller/classController.js";

export const classRoutes = express.Router();

classRoutes.post("/create", createClass);
classRoutes.get("/get-all", getClasses);
classRoutes.get("/:id", getClassById);
classRoutes.put("/:id", editClass);
classRoutes.get("/:classId/get-subjects", getSubjectsByClass);
classRoutes.get("/attendance/:id", attendanceByStudent);
classRoutes.put("/:id/attendance", addAttendance);
classRoutes.delete("/:id/delete", deleteClass);
