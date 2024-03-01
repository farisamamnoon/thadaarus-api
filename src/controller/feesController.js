import studentModel from "../model/studentModel.js";

//new fees
export const createFees = async (req, res) => {
  try {
    const { studentId, date, amount, discount } = req.body;
    let feesDetails = { date, amount, discount };
    const studentData = await studentModel.findByIdAndUpdate(
      studentId,
      { $push: { fees: feesDetails } },
      { new: true }
    );
    console.log(studentData);
    res.status(200).json({
      success: true,
      message: "Fees data added successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error,
    });
  }
};

//get all students with fees data
export const getStudents = async (req, res) => {
  try {
    const student = await studentModel.find().populate({ path: "class", select: "className fees" });
    return res.status(200).json({
      success: true,
      message: "Student data fetched successfully",
      data: student,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: `Internal Server Error:\n${error}`,
    });
  }
};
