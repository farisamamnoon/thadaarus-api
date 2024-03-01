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
      class: classId,
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
    const teachers = await teacherModel.find();
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

//get teacher by id
export const getTeacherById = async (req, res) => {
  try {
    const id = req.params.id;
    const teachers = await teacherModel.findOne({ _id: id }).populate("class", "className");
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
