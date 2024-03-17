import express from "express";
import {
  createCategory,
  createEvent,
  createProgram,
  deleteEvent,
  getAll,
  getCategories,
  getEventByCategory,
  getEventPrograms,
} from "../controller/eventController.js";

export const eventRoutes = express.Router();

eventRoutes.post("/", createEvent);
eventRoutes.post("/category", createCategory);
eventRoutes.post("/:id/programs", createProgram);
eventRoutes.get("/categories", getCategories);
eventRoutes.get("/", getAll);
eventRoutes.get("/:id/category/:catId", getEventByCategory);
eventRoutes.get("/:id", getEventPrograms);
eventRoutes.delete("/:id", deleteEvent);
