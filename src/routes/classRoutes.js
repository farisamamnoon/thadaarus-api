import express from "express";

import {
  addAttendance,
  createClass,
  deleteClass,
  editClass,
  getClassById,
  getClasses,
  getSubjectsByClass,
} from "../controller/classController.js";

export const classRoutes = express.Router();

classRoutes.post("/create", createClass);
classRoutes.put("/:id", editClass);
classRoutes.get("/get-all", getClasses);
classRoutes.get("/:id/get-subjects", getSubjectsByClass);
classRoutes.get("/:id", getClassById);
classRoutes.put("/:id/attendance", addAttendance);
classRoutes.delete("/:id/delete", deleteClass);
