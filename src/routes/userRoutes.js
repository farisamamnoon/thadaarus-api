import express from "express";

import { addUser, userLogin } from "../controller/userController.js";

export const userRoutes = express.Router();

userRoutes.post("/add", addUser);
userRoutes.post("/login", userLogin);