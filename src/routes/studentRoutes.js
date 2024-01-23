import express from 'express';

import { createStudent } from '../controller/studentController.js';

export const studentRoutes = express.Router();

studentRoutes.post('/create', createStudent)
