import express from "express";
import { createHomeWork, deleteHomework, getHomeworkById, getHomeworks, editHomework } from "../controller/homeworkController.js";

export const homeworkRoutes = express.Router();

homeworkRoutes.post("/create", createHomeWork);
homeworkRoutes.get("/get-all", getHomeworks);
homeworkRoutes.get("/:id/get", getHomeworkById);
homeworkRoutes.put("/:id/edit", editHomework);
homeworkRoutes.delete("/:id", deleteHomework);
