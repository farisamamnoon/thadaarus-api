import studentModel from "../model/studentModel.js";
import teacherModel from "../model/teacherModel.js";

//add teacher
export const createTeacher = async (req, res) => {
  try {
    const { name, classId, age, email, phone, subjects } = req.body;
    const teacher = await teacherModel.create({
      name: name,
      age: age,
      email: email,
      phone: phone,
      subjects: subjects,
      class: classId
    });
    return res.status(200).json({
      success: true,
      message: "Teacher created successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//vierw all teachers
export const getTeachers = async (req, res) => {
  try {
    const teachers = await teacherModel.find().populate("class", "className");
    return res.status(200).json({
      success: true,
      message: "Teacher data fetched successfully",
      data: teachers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
