import express from 'express';
import { createEvent, deleteEvent, getAll, getEventPrograms } from '../controller/eventController.js';

export const eventRoutes = express.Router();

eventRoutes.post("/", createEvent);
eventRoutes.get("/", getAll);
eventRoutes.get("/:id", getEventPrograms);
eventRoutes.delete("/:id", deleteEvent);