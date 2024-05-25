const asyncHandler = require("express-async-handler");
const Timetable = require("../models/timetable.js");
const Notification = require("../models/notification");

//@desc Get all timetable
//@route GET /api/timetable
//@access private
const getTimes = asyncHandler(async (req, res) => {
  const timetable = await Timetable.find({ user_id: req.user.id });
  res.status(200).json(timetable);
});

//@desc Create New timetable
//@route POST /api/timetable
//@access private
const createTime = asyncHandler(async (req, res) => {
  console.log("The request body is :", req.body);
  const { Monday, Tuesday, Wednesday, Thursday, Friday } = req.body;
  if (!course || !time || !faculty || !location || !Monday || !Tuesday || !Wednesday || !Thursday || !Friday) {
    res.status(400);
    throw new Error("All fields are mandatory !");
  }
     // Check if user's email is admin@gmail.com
     if (req.user.email !== "staff@gmail.com") {
      res.status(403);
      throw new Error("Access denied: Only staff users are allowed to do this!");
    }

  const timetable = await Timetable.create({
    course,
    time,
    faculty,
    location,
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    user_id: req.user.id,
  });

  res.status(201).json(timetable);
});

//@desc Get timetable
//@route GET /api/timetable/:id
//@access private
const getTime = asyncHandler(async (req, res) => {
  const timetable = await Timetable.findById(req.params.id);
  if (!timetable) {
    res.status(404);
    throw new Error("Timetable not found");
  }
  res.status(200).json(timetable);
});

//@desc Update timetable
//@route PUT /api/timetable/:id
//@access private
const updateTime = asyncHandler(async (req, res) => {
  const timetable = await Timetable.findById(req.params.id);
  if (!timetable) {
    res.status(404);
    throw new Error("Timetable not found");
  }

     // Check if user's email is admin@gmail.com
     if (req.user.email !== "staff@gmail.com") {
      res.status(403);
      throw new Error("Access denied: Only staff users are allowed to do this!");
    }

  const updatedtimetable = await Timetable.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
      // Create a notification for the updated course
      const notificationMessage = `Timetable "${updatedtimetable.course}" updated`;
      await Notification.create({ message: notificationMessage });

  res.status(200).json(updatedtimetable);
});

//@desc Delete timetable
//@route DELETE /api/timetable/:id
//@access private
const deleteTime = asyncHandler(async (req, res) => {
  const timetable = await Timetable.findById(req.params.id);
  if (!timetable) {
    res.status(404);
    throw new Error("Timetable not found");
  }
     // Check if user's email is admin@gmail.com
     if (req.user.email !== "staff@gmail.com") {
      res.status(403);
      throw new Error("Access denied: Only staff users are allowed to do this!");
    }
  await Timetable.deleteOne({ _id: req.params.id });
  res.status(200).json(timetable);
});

module.exports = {
    getTimes,
    createTime,
    getTime,
    updateTime,
    deleteTime,
};
