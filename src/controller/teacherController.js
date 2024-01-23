import teacherModel from "../model/teacherModel.js";

export const createTeacher = async (req, res) => {
  try {
    const { name, age, email, phone, subjects } = req.body;
    const teacher = await teacherModel.create({
      name: name,
      age: age,
      email: email,
      phone: phone,
      subjects: subjects,
    });
    return res.status(200).json({
      success: true,
      message: "Teacher created successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const viewTeacher = async (req, res) => {
  try{  
    const teacher = await teacherModel.find({}, (error, data) => {
      if(error){
        return res.status(500).json({
          success: false,
          message: 'There was an error'
        })
      } else{
        return res.status(200).json(data)
      }

    })
  } catch(error){
    res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    })
  }
}
