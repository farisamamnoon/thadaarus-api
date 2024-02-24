import express from 'express';

import { createTeacher, deleteTeacher, editTeacher, getTeacherById, getTeachers } from '../controller/teacherController.js';

export const teacherRoutes = express.Router();

teacherRoutes.post('/create', createTeacher);
teacherRoutes.get('/get-all', getTeachers);
teacherRoutes.put('/:id/edit', editTeacher);
teacherRoutes.delete('/:id/delete', deleteTeacher);
teacherRoutes.get('/:id', getTeacherById);
