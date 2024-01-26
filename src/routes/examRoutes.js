import express from 'express';
import { createExam } from '../controller/examController.js';

export const examRoutes = express.Router();

examRoutes.post('/create', createExam);