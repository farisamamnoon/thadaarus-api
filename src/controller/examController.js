import examModel from "../model/examModel.js";

export const createExam = async (req, res) => {
  try {
    const { examName, classId, exams } = req.body;
    const newExam = await examModel.create({
      examName: examName,
      classId: classId,
      exams: exams,
    });

    return res.status(200).json({
      success: true,
      message: "Exam data created successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//get all exams
export const getExams = async (req, res) => {
  try {
    const exams = await examModel.find().populate("classId", "className");
    return res.status(200).json({
      success: true,
      message: "Exam data created successfully",
      data: exams,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//get exam by id
export const getExamById = async (req, res) => {
  try {
    const examId = req.params.id;
    const exams = await examModel.findById(examId);
    return res.status(200).json({
      success: true,
      message: "Exam data fetched successfully",
      data: exams,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//get exam by class
export const getExamByClass = async (req, res) => {
  try {
    const classId = req.params.id;
    const exams = await examModel.find({ classId: classId});
    return res.status(200).json({
      success: true,
      message: "Exam by class is fetched",
      data: exams,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//delete exam
export const deleteExam = async (req, res) => {
  try {
    const examId = req.params.id;
    const exams = await examModel.deleteOne({ _id: examId });
    return res.status(200).json({
      success: true,
      message: "Exam deleted   successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
