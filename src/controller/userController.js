import userModel from "../model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import env from "../env.js";

//add user

export const addUser = async (req, res) => {
  try {
    const { userName, name, password, role } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashed = bcrypt.hashSync(password, salt);

    const newUser = await userModel.create({
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
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//login user
export const userLogin = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const login = await userModel.findOne({ userName: userName });
    const isMatch = bcrypt.compareSync(password, login.password);

    if (!isMatch) {
      return res.status(201).json({
        success: false,
        message: "Login failed",
      });
    }
    const user = {
      userName: login.userName,
      role: login.role,
    };
    const accessToken = jwt.sign(user, env.JWT_SECRET_KEY);
    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        accessToken: accessToken,
        role: login.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
