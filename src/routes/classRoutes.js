import express from 'express';

import { createClass, getClassById, getClasses } from '../controller/classController.js';

export const classRoutes = express.Router();

classRoutes.post('/create', createClass)
classRoutes.get('/get-all', getClasses)
classRoutes.get('/:id', getClassById)