import express from "express";

import {
  createClass,
  deleteClass,
  getClassById,
  getClasses,
  getSubjectsByClass,
} from "../controller/classController.js";

export const classRoutes = express.Router();

classRoutes.post("/create", createClass);
classRoutes.get("/get-all", getClasses);
classRoutes.get("/:id/get-subjects", getSubjectsByClass);
classRoutes.delete("/:id/delete", deleteClass);
classRoutes.get("/:id", getClassById);
