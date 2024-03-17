import categoryModal from "../model/categoryModal.js";
import eventModel from "../model/eventModel.js";

//create a new event
export const createEvent = async (req, res) => {
  try {
    const { name, date } = req.body;
    await eventModel.create({
      date,
      name,
      categoryId,
      isFinished: false,
    });
    res.status(200).json({
      success: true,
      message: "Event created successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error,
    });
  }
};

//create progarmas
export const createProgram = async (req, res) => {
  try {
    const id = req.params.id;
    const { programs, category } = req.body;
    let programData = programs.map((p) => ({ programName: p, category }));
    await eventModel.findByIdAndUpdate(id, { $push: { programs: { $each: programData } } });
    res.status(200).json({
      success: true,
      message: "Event created successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error,
    });
  }
};

//create a new category
export const createCategory = async (req, res) => {
  try {
    const { name, toDate, fromDate } = req.body;
    await categoryModal.create({
      name,
      toDate,
      fromDate,
    });
    res.status(200).json({
      success: true,
      message: "Category created successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error,
    });
  }
};

//get all categories
export const getCategories = async (req, res) => {
  try {
    const data = await categoryModal.find();
    res.status(200).json({
      success: true,
      message: "Categories fetched successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error,
    });
  }
};

//get all events
export const getAll = async (req, res) => {
  try {
    const data = await eventModel.find();
    res.status(200).json({
      success: true,
      message: "Event created successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error,
    });
  }
};

//get event by category
export const getEventByCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const categoryId = req.params.catId;
    const data = await eventModel.findOne({
      _id: id,
      programs: {
        $elemMatch: { category: categoryId },
      },
    });
    res.status(200).json({
      success: true,
      message: "Event fetched successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error,
    });
  }
};

//get event programs
export const getEventPrograms = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await eventModel.findById(id);
    res.status(200).json({
      success: true,
      message: "Event fetched successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error,
    });
  }
};

//delete an event
export const deleteEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    await eventModel.deleteOne({ _id: eventId });
    res.status(200).json({
      success: true,
      message: "Event created successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error,
    });
  }
};
