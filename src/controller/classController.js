import classModel from "../model/classModel.js";

export const createClass = async (req, res) => {
  try {
    const { className, division, subjects, batch, fees } = req.body;

    const student = await classModel.create({
      className: className,
      division: division,
      subjects: subjects,
      batch: batch,
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

export const getClasses = async (req, res) => {
  try {
    const classes = await classModel.find();
    console.log('class fetched');
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


export const getClassById = async (req, res) => {
  try {
    const classId = req.params.id
    const classData = await classModel.findOne({_id:classId});
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



export const updateClass = async (req, res) => {
  try {
    const classId = req.params.id;
    const { className, division, teacher, subjects, batch, fees } = req.body;
    const classData = await classModel.findOne({_id:classId});
    classData.className=className

    classData.save()
    
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
