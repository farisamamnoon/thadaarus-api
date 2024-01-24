import express from 'express';

import { createTeacher, getTeachers } from '../controller/teacherController.js';

export const teacherRoutes = express.Router();

teacherRoutes.post('/create', createTeacher);
teacherRoutes.get('/get-all', getTeachers);
