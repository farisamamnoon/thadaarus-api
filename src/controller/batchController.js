import batchModal from "../model/batchModal.js";

//create a new batch
export const createBatch = async (req, res) => {
  try {
    const { name, classes } = req.body;
    await batchModal.create({ name, classes });
    return res.status(200).json({
      success: true,
      message: "Batch created successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err,
    });
  }
};

//get al batches
export const getBatches = async (req, res) => {
  try {
    const data = await batchModal.find().populate({
      path: "classes",
      model: "Class", // Assuming the model name for your class is "Class"
      select: "className", // Select the field you want to populate
      options: { sort: { createdAt: -1 } }, // Optional: Sorting options for each element
    });
    return res.status(200).json({
      success: true,
      message: "Batch fetched successfully",
      data,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err,
    });
  }
};

//get batch by id
export const getBatchById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await batchModal.findById(id);
    return res.status(200).json({
      success: true,
      message: "Batch fetched successfully",
      data,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err,
    });
  }
};

//edit batch
export const editBatch = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, classes } = req.body;
    await batchModal.findByIdAndUpdate(id, { name, classes });
    return res.status(200).json({
      success: true,
      message: "Batch edited successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err,
    });
  }
};

//delete batch
export const deleteBatch = async (req, res) => {
  try {
    const id = req.params.id;
    await batchModal.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: "Batch Deleted successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err,
    });
  }
};
