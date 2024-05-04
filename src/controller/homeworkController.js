import homeworkModel from "../model/homeworkModel.js";

//create homework
export const createHomeWork = async (req, res) => {
  try {
    const { batchId, classId, date, desc, subjectId } = req.body;
    const newWork = await homeworkModel.create({
      classId,
      batchId,
      subjectId,
      date,
      desc,
    });
    return res.status(200).json({
      success: true,
      message: "Home Work assigned successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//get by class
export const getHomeworkByClass = async (req, res) => {
  try {
    const classId = req.params.id;
    const batchId = req.params.batchId;
    const data = await homeworkModel
      .find({ classId, batchId })
      .populate({ path: "students", select: "name" })
      .populate("subjectId");
    return res.status(200).json({
      success: true,
      message: "Home Work fetched successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};

//edit homework
export const editHomework = async (req, res) => {
  try {
    const id = req.params.id;
    const { subjectId, date, desc } = req.body;
    await homeworkModel.findByIdAndUpdate(id, { subjectId, date, desc });
    return res.status(200).json({
      success: true,
      message: "Homework data edited successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//get all homeworks
export const getHomeworks = async (req, res) => {
  try {
    const homeworks = await homeworkModel
      .find()
      .populate("classId", "className")
      .populate("students", "name");
    return res.status(200).json({
      success: true,
      message: "Homeworks data fetched successfully",
      data: homeworks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//get by id
export const getHomeworkById = async (req, res) => {
  try {
    const id = req.params.id;
    const { classId, date, desc, subjectId } = req.body;
    const homeworks = await homeworkModel.findById(id);
    return res.status(200).json({
      success: true,
      message: "Homework data fetched successfully",
      data: homeworks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//Delete api
export const deleteHomework = async (req, res) => {
  try {
    const id = req.params.id;
    const homeworks = await homeworkModel.deleteOne({ _id: id });
    return res.status(200).json({
      success: true,
      message: "Homework deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
