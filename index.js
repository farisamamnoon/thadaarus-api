import env from './src/env.js'
import ConnectDB from "./src/config/db.js";
import express from "express";
import cors from "cors";
import { studentRoutes } from "./src/routes/studentRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

const { PORT } = env;

app.use("/dashboard/api/student", studentRoutes);
// app.use("dashboard/api/teacher", teacherRoutes);

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
