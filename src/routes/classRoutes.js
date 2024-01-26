import express from 'express';

import { createClass, getClassById, getClasses, getSubjectsByClass } from '../controller/classController.js';

export const classRoutes = express.Router();

classRoutes.post('/create', createClass);
classRoutes.get('/get-all', getClasses);
classRoutes.get('/:id/get-subjects', getSubjectsByClass);
classRoutes.get('/:id', getClassById);