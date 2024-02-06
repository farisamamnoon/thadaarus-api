import express from 'express';

import { createStudent, getStudentByClass, getStudents } from '../controller/studentController.js';

export const studentRoutes = express.Router();

studentRoutes.post('/create', createStudent);
studentRoutes.get('/get-all', getStudents);
studentRoutes.get('/:id/get-students', getStudentByClass);
