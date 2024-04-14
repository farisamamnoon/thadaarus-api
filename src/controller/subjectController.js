import subjectModel from "../model/subjectModel.js";

//create a subject
export const createSubject = async (req, res) => {
  try {
    const { name } = req.body;
    await subjectModel.create({ name });
    return res.status(200).json({
      success: true,
      message: "Subject created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};

//get all subjects
export const getSubjects = async (req, res) => {
  try {
    const data = await subjectModel.find();
    return res.status(200).json({
      success: true,
      message: "Subject fetched successfully",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};

//get subject
export const getSubjectById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await subjectModel.findById(id);
    return res.status(200).json({
      success: true,
      message: "Subject fetched successfully",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};

//edit subject
export const editSubject = async (req, res) => {
  try {
    const id = req.params.id;
    const { name } = req.body;
    await subjectModel.findByIdAndUpdate(id, { name });
    return res.status(200).json({
      success: true,
      message: "Subject edited successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};

//delete subject
export const deleteSubject = async (req, res) => {
  try {
    const id = req.params.id;
    await subjectModel.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: "Subject deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};
