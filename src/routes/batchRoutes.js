import express from "express";
import {
  createBatch,
  deleteBatch,
  editBatch,
  getBatchById,
  getBatches,
} from "../controller/batchController.js";

export const batchRoutes = express.Router();

batchRoutes.post("/", createBatch);
batchRoutes.get("/", getBatches);
batchRoutes.get("/:id", getBatchById);
batchRoutes.put("/:id", editBatch);
batchRoutes.delete("/:id", deleteBatch);
