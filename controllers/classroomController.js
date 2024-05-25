const asyncHandler = require("express-async-handler");
const Classroom = require("../models/classroom.js");
const Notification = require("../models/notification");

//@desc Get all classroom
//@route GET /api/classroom
//@access private
const getClassrooms = asyncHandler(async (req, res) => {
  const classroom = await Classroom.find({ user_id: req.user.id });
  res.status(200).json(classroom);
});

//@desc Create New classroom
//@route POST /api/classroom
//@access private
const createClassroom = asyncHandler(async (req, res) => {
  console.log("The request body is :", req.body);
  const { ClassName, State, Capacity, Facilities } = req.body;
  if (!ClassName || !State || !Capacity || !Facilities) {
    res.status(400);
    throw new Error("All fields are mandatory !");
  }
    // Check if user's email is admin@gmail.com
    if (req.user.email !== "admin@gmail.com") {
      res.status(403);
      throw new Error("Access denied: Only admin users are allowed to do this!");
    }

  const classroom = await Classroom.create({
    ClassName,
    State,
    Capacity,
    Facilities,
    user_id: req.user.id,
  });

  res.status(201).json(classroom);
});

//@desc Get classroom
//@route GET /api/classroom/:id
//@access private
const getClassroom = asyncHandler(async (req, res) => {
  const classroom = await Classroom.findById(req.params.id);
  if (!classroom) {
    res.status(404);
    throw new Error("Classroom not found");
  }
  res.status(200).json(classroom);
});

//@desc Update classroom
//@route PUT /api/classroom/:id
//@access private
const updateClassroom = asyncHandler(async (req, res) => {
  const classroom = await Classroom.findById(req.params.id);
  if (!classroom) {
    res.status(404);
    throw new Error("Classroom not found");
  }

    // Check if user's email is admin@gmail.com
    if (req.user.email !== "admin@gmail.com") {
      res.status(403);
      throw new Error("Access denied: Only admin users are allowed to do this!");
    }
    
  const updatedClassroom = await Classroom.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  
        // Create a notification for the updated Classroom
        const notificationMessage = `Classroom "${updatedClassroom.ClassName}" updated`;
        await Notification.create({ message: notificationMessage });
  

  res.status(200).json(updatedClassroom);
});

//@desc Delete classroom
//@route DELETE /api/classroom/:id
//@access private
const deleteClassroom = asyncHandler(async (req, res) => {
  const classroom = await Classroom.findById(req.params.id);
  if (!classroom) {
    res.status(404);
    throw new Error("Classroom not found");
  }
   // Check if user's email is admin@gmail.com
   if (req.user.email !== "admin@gmail.com") {
    res.status(403);
    throw new Error("Access denied: Only admin users are allowed to do this!");
  }
  
  await Classroom.deleteOne({ _id: req.params.id });
  res.status(200).json(classroom);
});

module.exports = {
    getClassrooms,
    createClassroom,
    getClassroom,
    updateClassroom,
    deleteClassroom,
};
