import { genSaltSync, hashSync } from "bcrypt";
import studentModel from "../model/studentModel.js";
import userModel from "../model/userModel.js";

// Configure your email service
// const transporter = nodemailer.createTransport({
//   service: "Gmail", // or other email services
//   auth: {
//     user: process.env.ADMIN_EMAIL,
//     pass: process.env.ADMIN_PASSWORD,
//   },
// });

//create student
export const createStudent = async (req, res) => {
  try {
    const {
      name,
      dob,
      age,
      email,
      address,
      group,
      phone,
      classId,
      fees,
      batch,
      prevMadrasa,
      prevClass,
      remarks,
    } = req.body;
    const salt = genSaltSync(10);
    let pass = name.slice(0, 4).concat(phone.slice(0, 4)).toUpperCase();
    const password = hashSync(pass, salt);
    // const mailOptions = {
    //   from: env.ADMIN_EMAIL,
    //   to: userName,
    //   subject: "Your login credentials for THADAARUS",
    //   text: `USERNAME: ${email}\nPASSWORD: ${pass}`,
    // };

    await studentModel.create({
      name,
      dob,
      age,
      address,
      group,
      email,
      phone,
      totalFees: fees,
      batch,
      class: classId,
      prevMadrasa,
      prevClass,
      remarks,
    });

    await userModel.create({
      userName: email,
      role: "student",
      password,
    });

    return res.status(200).json({
      success: true,
      message: "Student data created successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error,
    });
  }
};

//new exam marks
export const markAttendance = async (req, res) => {
  try {
    const { date, absent, present } = req.body;

    // Input validation
    if (!date || !Array.isArray(absent) || !Array.isArray(present)) {
      return res.status(400).json({
        success: false,
        message: "Invalid request data",
      });
    }

    const updateAttendance = async (studentIds, attendanceStatus) => {
      for (const studentId of studentIds) {
        try {
          const student = await studentModel.findById(studentId);
          if (!student) {
            console.log(`Student not found with ID: ${studentId}`);
            continue; // Skip to next iteration if student not found
          }

          //attendance date validation
          const existingAttendance = student.attendance.find(
            (entry) => entry.date.toDateString() === date.toDateString()
          );
          if (existingAttendance) {
            throw new Error("Attendance for this date already exists");
          }

          // Add the new attendance entry
          student.attendance.push({
            date,
            attendance: attendanceStatus,
          });
          await student.save();
        } catch (error) {
          console.error(`Error updating attendance for student with ID ${studentId}: ${error}`);
          throw new Error(error);
        }
      }
    };

    // Update attendance for present students
    await updateAttendance(present, true);
    // Update attendance for absent students
    await updateAttendance(absent, false);

    return res.status(200).json({
      success: true,
      message: "Attendance marked successfully",
    });
  } catch (error) {
    console.error("Error marking attendance:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

//new exam marks
export const getAttendance = async (req, res) => {
  try {
    const studentId = req.params.id;
    const student = await studentModel.findById(studentId).populate("class className");
    return res.status(200).json({
      success: true,
      message: "Student data created successfully",
      data: student,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error,
    });
  }
};
//new exam marks
export const newExamMarks = async (req, res) => {
  try {
    const studentId = req.params.id;
    const { examName, marks } = req.body;
    const student = await studentModel.findByIdAndUpdate(studentId, {
      $push: { marks: { examName, marks } },
    });
    return res.status(200).json({
      success: true,
      message: "Student data created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error,
    });
  }
};

//get exam marks
export const getMarksByStudent = async (req, res) => {
  try {
    const studentId = req.params.id;
    const student = await studentModel.findById(studentId).populate("marks.examName", "examName");

    return res.status(200).json({
      success: true,
      message: "Student marks fetched successfully",
      data: student,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error,
    });
  }
};

//edit student data
export const editStudent = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      name,
      dob,
      age,
      address,
      group,
      phone,
      classId,
      fees,
      batch,
      prevMadrasa,
      prevClass,
      remarks,
    } = req.body;
    const student = await studentModel.findByIdAndUpdate(id, {
      name,
      dob,
      age,
      batch,
      class: classId,
      address,
      totalFees: fees,
      group,
      phone,
      prevMadrasa,
      prevClass,
      remarks,
    });
    return res.status(200).json({
      success: true,
      message: "Student data edited successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//get all students
export const getStudents = async (req, res) => {
  try {
    const student = await studentModel.find().populate("class", "className");
    return res.status(200).json({
      success: true,
      message: "Students data fetched successfully",
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

//get student fees
export const getStudentFees = async (req, res) => {
  try {
    const student = await studentModel
      .find()
      .select(["fees", "class", "batch"])
      .populate([
        { path: "class", select: "className" },
        { path: "batch", select: "name" },
      ]);
    return res.status(200).json({
      success: true,
      message: "Students data fetched successfully",
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

//get student by id
export const getStudentById = async (req, res) => {
  try {
    const studentId = req.params.id;
    const student = await studentModel.findOne({ _id: studentId });
    return res.status(200).json({
      success: true,
      message: "Student by id data fetched successfully",
      data: student,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//get student by class
export const getStudentByClass = async (req, res) => {
  try {
    const batchId = req.params.batchId;
    const classId = req.params.id;
    const student = await studentModel.find({ class: classId, batch: batchId });
    return res.status(200).json({
      success: true,
      message: "Student by classId data fetched successfully",
      data: student,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Function to fetch students grouped by category name based on date of birth
export const getStudentsByCategory = async (req, res) => {
  try {
    const result = await studentModel.aggregate([
      {
        $lookup: {
          from: "categories", // Collection name
          let: { studentDob: "$dob" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $lte: ["$fromDate", "$$studentDob"] },
                    { $gte: ["$toDate", "$$studentDob"] },
                  ],
                },
              },
            },
            { $project: { _id: 0, categoryName: "$name" } },
          ],
          as: "categoryInfo",
        },
      },
      {
        $unwind: "$categoryInfo",
      },
      {
        $project: {
          _id: 1, // Include student _id
          studentName: "$name", // Include student name
          categoryName: "$categoryInfo.categoryName", // Include categoryName from the lookup
        },
      },
    ]);
    return res.status(200).json({
      success: true,
      message: "Category students fetched",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};

//delete student
export const deleteStudent = async (req, res) => {
  try {
    const id = req.params.id;
    const student = await studentModel.deleteOne({ _id: id });
    return res.status(200).json({
      success: true,
      message: "Student deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
