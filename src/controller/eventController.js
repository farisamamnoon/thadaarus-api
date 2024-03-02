import eventModel from "../model/eventModel.js";

//create a new event
export const createEvent = async (req, res) => {
  try {
    const { name, date, programs } = req.body;
    const updatedPrograms = programs.map((p) => ({ programName: p }));
    await eventModel.create({
      date,
      name,
      programs: updatedPrograms,
      isFinished: false,
    });
    res.status(200).json({
      success: true,
      message: "Event created successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error._message,
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
      message: error._message,
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
      message: error._message,
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
      message: error._message,
      error: error,
    });
  }
};
