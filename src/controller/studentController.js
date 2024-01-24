import studentModel from "../model/studentModel.js";

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

export const getStudents = async (req, res) => {
  try {
    const student = await studentModel.find();
    return res.status(200).json({
      success: true,
      message: "Student data fetched successfully",
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
