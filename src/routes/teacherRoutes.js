import express from 'express';

import { createTeacher, deleteTeacher, getTeacherById, getTeachers } from '../controller/teacherController.js';

export const teacherRoutes = express.Router();

teacherRoutes.post('/create', createTeacher);
teacherRoutes.get('/get-all', getTeachers);
teacherRoutes.delete('/:id/delete', deleteTeacher);
teacherRoutes.get('/:id', getTeacherById);
