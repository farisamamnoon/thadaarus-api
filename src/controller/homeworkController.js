import homeworkModel from "../model/homeworkModel.js";

//create homework
export const createHomeWork = async (req, res) => {
  try {
    console.log(req.body);
    const { classId, date, desc, subjectId } = req.body;
    const newWork = await homeworkModel.create({
      classId: classId,
      subjectId: subjectId,
      date: date,
      desc: desc,
    });
    console.log("haii");
    return res.status(200).json({
      status: true,
      message: "Home Work assigned successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
    console.log(error);
  }
};

//get all homeworks
export const getHomeworks = async (req, res) => {
  try {
    const homeworks = await homeworkModel.find().populate("classId", "className");
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
    const homeworks = await homeworkModel.findOne({ _id: id }).populate("classId", "className");
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
