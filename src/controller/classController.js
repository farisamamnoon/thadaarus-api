import classModel from "../model/classModel.js";

export const createClass = async (req, res) => {
  try {
    const { className, division, teacher, subjects, batch, fees } = req.body;

    const student = await classModel.create({
      className: className,
      division: division,
      teacher: teacher,
      subjects: subjects,
      batch: batch,
      fees: fees,
    });
    return res.status(200).json({
        success: true,
        message: 'Class created successfully'
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
