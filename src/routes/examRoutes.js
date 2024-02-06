import express from "express";
import { createExam, getExams } from "../controller/examController.js";

export const examRoutes = express.Router();

examRoutes.post("/create", createExam);
examRoutes.get("/get-all", getExams);
