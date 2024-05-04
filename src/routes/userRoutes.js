import express from "express";

import { addUser, changePassword, dash, userLogin } from "../controller/userController.js";
import { verifyUser } from "../../verifyUser.js";

export const userRoutes = express.Router();

userRoutes.post("/add", addUser);
userRoutes.post("/login", userLogin);
userRoutes.get("/dash", verifyUser, dash);
userRoutes.put("/changePass", verifyUser, changePassword);
