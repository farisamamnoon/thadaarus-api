import express from "express";
import { createHomeWork, deleteHomework, getHomeworkById, getHomeworks } from "../controller/homeworkController.js";

export const homeworkRoutes = express.Router();

homeworkRoutes.post("/create", createHomeWork);
homeworkRoutes.get("/get-all", getHomeworks);
homeworkRoutes.get("/get/:id", getHomeworkById);
homeworkRoutes.delete("/:id", deleteHomework);
