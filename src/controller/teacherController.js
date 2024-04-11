import { ObjectId } from "mongodb";
import teacherModel from "../model/teacherModel.js";
import userModel from "../model/userModel.js";
import { genSaltSync, hashSync } from "bcrypt";

//add teacher
export const createTeacher = async (req, res) => {
  try {
    const { name, classId, age, email, phone, subjects } = req.body;
    const salt = genSaltSync(10);
    let pass = name.slice(0,4).concat(phone.slice(0,4)).toUpperCase();
    const password = hashSync(pass, salt);
    
    await teacherModel.create({
      name: name,
      age: age,
      email: email,
      phone: phone,
      subjects: subjects,
      class: classId,
    });

    await userModel.create({
      userName: email,
      name,
      role: "teacher",
      password,
    });
    return res.status(200).json({
      success: true,
      message: "Teacher created successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

//edit teacher
export const editTeacher = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, classId, age, email, phone, subjects } = req.body;
    const teacher = await teacherModel.findByIdAndUpdate(id, {
      name,
      age,
      email,
      phone,
      subjects,
      class: classId,
    });
    return res.status(200).json({
      success: true,
      message: "Teacher edited successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//vierw all teachers
export const getTeachers = async (req, res) => {
  try {
    const teachers = await teacherModel.aggregate([
      {
        $lookup: {
          from: "classes",
          localField: "_id",
          foreignField: "teacherId",
          as: "result",
        },
      },
      {
        $unwind: {
          path: "$result",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          name: 1,
          phone: 1,
          email: 1,
          age: 1,
          class: "$result.className",
        },
      },
    ]);
    return res.status(200).json({
      success: true,
      message: "Teacher data fetched successfully",
      data: teachers,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//get teacher by id
export const getTeacherById = async (req, res) => {
  try {
    const id = req.params.id;
    const teachers = await teacherModel.aggregate([
      {
        $match: {
          _id: new ObjectId(id),
        },
      },
      {
        $lookup: {
          from: "classes",
          localField: "_id",
          foreignField: "teacherId",
          as: "result",
        },
      },
      {
        $unwind: {
          path: "$result",
        },
      },
      {
        $project: {
          name: 1,
          age: 1,
          phone: 1,
          email: 1,
          class: "$result._id",
        },
      },
    ]);
    return res.status(200).json({
      success: true,
      message: "Teacher data fetched successfully",
      data: teachers,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};
//delete teacher
export const deleteTeacher = async (req, res) => {
  try {
    const id = req.params.id;
    const teachers = await teacherModel.deleteOne({ _id: id });
    return res.status(200).json({
      success: true,
      message: "Teacher data deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
