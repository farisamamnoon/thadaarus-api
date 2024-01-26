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
