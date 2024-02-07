import express from 'express';

import { createStudent, deleteStudent, editStudent, getStudentByClass, getStudentById, getStudents } from '../controller/studentController.js';

export const studentRoutes = express.Router();

studentRoutes.post('/create', createStudent);
studentRoutes.get('/get-all', getStudents);
studentRoutes.get('/:id/get-students', getStudentByClass);
studentRoutes.put('/:id/edit', editStudent);
studentRoutes.get('/:id', getStudentById);
studentRoutes.delete('/:id/delete', deleteStudent);
