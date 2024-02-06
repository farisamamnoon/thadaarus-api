import express from 'express';

import { createFees, getStudents } from '../controller/feesController.js';

export const feesRoutes = express.Router();

feesRoutes.post('/create', createFees);
feesRoutes.get('/get-all', getStudents);