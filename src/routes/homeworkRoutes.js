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
homeworkRoutes.get("/class/:id", getHomeworkByClass);
homeworkRoutes.get("/:id", getHomeworkById);
homeworkRoutes.put("/:id", editHomework);
homeworkRoutes.delete("/:id", deleteHomework);
