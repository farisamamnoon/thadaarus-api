import classModel from "../model/classModel.js";

//create new class
export const createClass = async (req, res) => {
  try {
    const { className, division, subjects, batch, fees, teacher } = req.body;

    const student = await classModel.create({
      className,
      division,
      subjects,
      batch,
      teacherId: teacher,
      fees,
    });
    return res.status(200).json({
      success: true,
      message: "Class created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//get all classes
export const getClasses = async (req, res) => {
  try {
    const classes = await classModel.find().populate("teacherId", "name").sort({ className: 1 });
    return res.status(200).json({
      success: true,
      message: "Class fetched successfully",
      data: classes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//get class by id
export const getClassById = async (req, res) => {
  try {
    const classId = req.params.id;
    const classData = await classModel.findOne({ _id: classId });
    return res.status(200).json({
      success: true,
      message: "Class fetched successfully",
      data: classData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//get attendance of student
export const attendanceByStudent = async (req, res) => {
  try {
    const studentId = req.params.id;console.log(studentId);
    const attendance = await classModel.aggregate([
      {
        $unwind: "$attendance",
      },
      {
        $match: {
          "attendance.attendance.studentId": studentId,
        },
      },
      {
        $project: {
          _id: 0,
          date: "$attendance.date",
          isPresent: "$attendance.attendance.isPresent",
        },
      },
    ]);
    return res.status(200).json({
      success: true,
      message: "Attendance fetched successfully",
      data: attendance,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//edit class
export const editClass = async (req, res) => {
  try {
    const classId = req.params.id;
    const { className, division, teacherId, subjects, batch, fees } = req.body;
    const classData = await classModel.findByIdAndUpdate(classId, {
      className,
      division,
      teacherId,
      subjects,
      batch,
      fees,
    });
    return res.status(200).json({
      success: true,
      message: "Class fetched successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error,
    });
  }
};

//get subjects by classId
export const getSubjectsByClass = async (req, res) => {
  try {
    const classId = req.params.id;
    const subjects = await classModel.findById(classId).select("subjects");
    return res.status(200).json({
      success: true,
      message: "Class subjects fetched successfully",
      data: subjects,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};

//add attendance
export const addAttendance = async (req, res) => {
  try {
    const classId = req.params.id;
    const { date, present, absent } = req.body;
    const attendance = [];
    present.forEach((item) => {
      attendance.push({ studentId: item, isPresent: true });
    });
    absent.forEach((item) => {
      attendance.push({ studentId: item, isPresent: false });
    });

    const response = await classModel.findByIdAndUpdate(classId, {
      $push: { attendance: { date, attendance } },
    });
    return res.status(200).json({
      success: true,
      message: "Attendance inserted",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err,
    });
  }
};

//delete class
export const deleteClass = async (req, res) => {
  try {
    const classId = req.params.id;
    const classData = await classModel.deleteOne({ _id: classId });
    return res.status(200).json({
      success: true,
      message: "Class deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
