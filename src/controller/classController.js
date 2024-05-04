import classModel from "../model/classModel.js";

//create new class
export const createClass = async (req, res) => {
  try {
    const { className, subjects } = req.body;

    const student = await classModel.create({
      className,
      subjects,
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
    const classes = await classModel
      .find()
      .sort({ className: 1 })
      .populate({
        path: "subjects",
        model: "subjects", // Assuming the model name for your class is "Class"
        select: "name", // Select the field you want to populate
        options: { sort: { createdAt: -1 } }, // Optional: Sorting options for each element
      });
    return res.status(200).json({
      success: true,
      message: "Class fetched successfully",
      data: classes,
    });
  } catch (error) {
    console.log(error);
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
    const classData = await classModel.findById(classId);
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
    const studentId = req.params.id;
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
    const { className, subjects } = req.body;
    await classModel.findByIdAndUpdate(classId, {
      className,
      subjects,
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
    const classId = req.params.classId;
    const subjects = await classModel
      .findById(classId)
      .populate({ path: "subjects", select: "name" })
      .select("subjects");

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
