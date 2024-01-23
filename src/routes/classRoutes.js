import express from 'express';

import { createClass } from '../controller/classController.js';

export const classRoutes = express.Router();

classRoutes.post('/create', createClass)