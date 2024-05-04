import userModel from "../model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import env from "../env.js";
import studentModel from "../model/studentModel.js";
import classModel from "../model/classModel.js";
import batchModal from "../model/batchModal.js";
import teacherModel from "../model/teacherModel.js";

//add user

export const addUser = async (req, res) => {
  try {
    const { userName, name, password, role } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashed = bcrypt.hashSync(password, salt);

    await userModel.create({
      userName,
      name,
      password: hashed,
      role,
    });
    return res.status(200).json({
      success: true,
      message: "User data added successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};

//login user
export const userLogin = async (req, res) => {
  const { userName, password } = req.body;
  await userModel
    .findOne({ userName: userName })
    .then((result) => {
      if (result == null) {
        return res.status(400).json({
          success: false,
          message: "Invalid Username",
        });
      }
      const isMatch = bcrypt.compareSync(password, result.password);
      if (!isMatch) {
        return res.status(201).json({
          success: false,
          message: "Login failed",
        });
      }
      const user = {
        userName: result.userName,
        role: result.role,
      };
      const accessToken = jwt.sign(user, env.JWT_SECRET_KEY);
      return res.status(200).json({
        success: true,
        message: "Login successful",
        data: {
          accessToken: accessToken,
          role: result.role,
        },
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    });
};

//change password
export const changePassword = async (req, res) => {
  const { userName, currentPass, newPass } = req.body;

  await userModel
    .findOne({ userName })
    .then((result) => {
      if (result == null) {
        return res.status(400).json({
          success: false,
          message: "Invalid Username",
        });
      }
      const isMatch = bcrypt.compareSync(currentPass, result.password);

      if (!isMatch) {
        return res.status(201).json({
          success: false,
          message: `Wrong password for the Username ${userName}`,
        });
      }

      const salt = bcrypt.genSaltSync(10);
      const hashed = bcrypt.hashSync(newPass, salt);

      result.password = hashed;
      result.save();
      return res.status(200).json({
        success: true,
        message: "Password changed",
      });
    })
    .catch((err) => {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: err,
      });
    });
};

export const dash = async (req, res) => {
  try {
    const student = await studentModel.aggregate([
      {
        $lookup: {
          from: "classes",
          localField: "class",
          foreignField: "_id",
          as: "class",
        },
      },
      {
        $unwind: "$class",
      },
      {
        $lookup: {
          from: "batches",
          localField: "batch",
          foreignField: "_id",
          as: "batch",
        },
      },
      {
        $unwind: "$batch",
      },
      {
        $project: {
          name: 1,
          "batch.name": 1,
          "class.className": 1,
          fees: 1,
        },
      },
      {
        $unwind: "$fees",
      },
    ]);
    const dueFees = await studentModel.aggregate([
      {
        $project: {
          name: 1,
          fees: 1,
          totalFees: 1,
        },
      },
      {
        $unwind: {
          path: "$fees",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $sort: {
          "fees.date": 1,
        },
      },
    ]);
    const totalStudents = await studentModel.countDocuments();
    const totalClass = await classModel.countDocuments();
    const batches = await batchModal.countDocuments();
    const teachers = await teacherModel.countDocuments();
    return res.status(200).json({
      success: true,
      message: "success",
      data: { student, classes: totalClass, batches, teachers, totalStudents, dueFees },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal Sever Error",
      err,
    });
  }
};
