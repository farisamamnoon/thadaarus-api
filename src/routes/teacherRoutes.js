import express from 'express';

import { createTeacher, viewTeacher } from '../controller/teacherController.js';

export const teacherRoutes = express.Router();

teacherRoutes.get('', viewTeacher);
teacherRoutes.post('/create', createTeacher);
