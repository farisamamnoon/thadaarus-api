import env from "./src/env.js";
import ConnectDB from "./src/config/db.js";
import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";

import { studentRoutes } from "./src/routes/studentRoutes.js";
import { classRoutes } from "./src/routes/classRoutes.js";
import { teacherRoutes } from "./src/routes/teacherRoutes.js";
import { examRoutes } from "./src/routes/examRoutes.js";
import { homeworkRoutes } from "./src/routes/homeworkRoutes.js";
import { feesRoutes } from "./src/routes/feesRoutes.js";
import { userRoutes } from "./src/routes/userRoutes.js";
import { eventRoutes } from "./src/routes/eventRoutes.js";
import userModel from "./src/model/userModel.js";

const app = express();

app.use(cors());
app.use(express.json());

const { PORT } = env;

//ROUTES
app.use("/dashboard/api/user", userRoutes);
app.use("/dashboard/api/student", studentRoutes);
app.use("/dashboard/api/class", classRoutes);
app.use("/dashboard/api/teacher", teacherRoutes);
app.use("/dashboard/api/exam", examRoutes);
app.use("/dashboard/api/homework", homeworkRoutes);
app.use("/dashboard/api/fees", feesRoutes);
app.use("/dashboard/api/event", eventRoutes);
app.use("/dashboard/api/init",(req, res, next) => {
  const admin = userModel.findOne({role: "admin"});
  if(!admin){
    userModel.create({
      userName: "admin",
      name: "admin",
      role: "admin",
      password: "admin1234",
    })
  } else {
    return res.json({
      batch: admin.batch
    })
  }
})

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

//error handler
app.use((err, req, res, next) => {
  if (err.status === 404) {
    // Page Not Found
    res.status(404).json({
      success: false,
      message: "Page Not Found",
    });
  } else {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong";
    res.status(errorStatus).json({
      success: false,
      status: errorStatus,
      message: errorMessage,
    });
  }
  next();
});
ConnectDB();
app.listen(PORT, () => {
  console.log(`Server listening to the port ${PORT}`);
});
