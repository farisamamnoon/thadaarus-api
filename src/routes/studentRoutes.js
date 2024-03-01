import express from 'express';

import { createStudent, deleteStudent, editStudent, getStudentByClass, getStudentById, getStudents, newExamMarks } from '../controller/studentController.js';

export const studentRoutes = express.Router();

studentRoutes.post('/create', createStudent);
studentRoutes.post('/:id/marks', newExamMarks);
studentRoutes.get('/get-all', getStudents);
studentRoutes.get('/class/:id', getStudentByClass);
studentRoutes.put('/:id/edit', editStudent);
studentRoutes.get('/:id', getStudentById);
studentRoutes.delete('/:id/delete', deleteStudent);
