import studentModel from "../model/studentModel.js";

//create student
export const createStudent = async (req, res) => {
  try {
    const { name, dob, age, address, group, phone, classId, prevMadrasa, prevClass, remarks } =
      req.body;
    const student = await studentModel.create({
      name: name,
      dob: dob,
      age: age,
      address: address,
      group: group,
      phone: phone,
      class: classId,
      prevMadrasa: prevMadrasa,
      prevClass: prevClass,
      remarks: remarks,
    });
    return res.status(200).json({
      success: true,
      message: "Student data created successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//edit student data
export const editStudent = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, dob, age, address, group, phone, classId, prevMadrasa, prevClass, remarks } =
      req.body;
    const student = await studentModel.findByIdAndUpdate(id, {
      name,
      dob,
      age,
      address,
      group,
      phone,
      class: classId,
      prevMadrasa,
      prevClass,
      remarks,
    });
    return res.status(200).json({
      success: true,
      message: "Student data edited successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//get all students
export const getStudents = async (req, res) => {
  try {
    const student = await studentModel.find().populate("class", "className");
    return res.status(200).json({
      success: true,
      message: "Students data fetched successfully",
      data: student,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: `Internal Server Error:\n${error}`,
    });
  }
};

//get student by id
export const getStudentById = async (req, res) => {
  try {
    const studentId = req.params.id;
    const student = await studentModel.findOne({ _id: studentId });
    return res.status(200).json({
      success: true,
      message: "Student by id data fetched successfully",
      data: student,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//get student by class
export const getStudentByClass = async (req, res) => {
  try {
    const classId = req.params.id;
    const student = await studentModel.find({ class: classId });
    return res.status(200).json({
      success: true,
      message: "Student by classId data fetched successfully",
      data: student,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//delete student
export const deleteStudent = async (req, res) => {
  try {
    const id = req.params.id;
    const student = await studentModel.deleteOne({ _id: id });
    return res.status(200).json({
      success: true,
      message: "Student deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
