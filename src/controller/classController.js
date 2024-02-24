import classModel from "../model/classModel.js";

//create new class
export const createClass = async (req, res) => {
  try {
    const { className, division, subjects, batch, fees, teacherId } = req.body;

    const student = await classModel.create({
      className: className,
      division: division,
      subjects: subjects,
      batch: batch,
      teacherId: teacherId,
      fees: fees,
    });
    return res.status(200).json({
      success: true,
      message: "Class created successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//get all classes
export const getClasses = async (req, res) => {
  try {
    const classes = await classModel.find();
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

//edit class
export const updateClass = async (req, res) => {
  try {
    const classId = req.params.id;
    const { className, division, teacher, subjects, batch, fees } = req.body;
    const classData = await classModel.findOne({ _id: classId });
    classData.className = className;

    classData.save();

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

//get subjects by classId
export const getSubjectsByClass = async (req, res) => {
  try {
    const classId = req.params.id;
    const subjects = await classModel.findById(classId).select('subjects');
    return res.status(200).json({
      success: true,
      message: "Class subjects fetched successfully",
      data: subjects,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
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
