  const asyncHandler = require("express-async-handler");
  const Course = require("../models/contactModel");
  const Notification = require("../models/notification");
  
  //@desc Get all contacts
  //@route GET /api/contacts
  //@access private
  const getCourses = asyncHandler(async (req, res) => {
    const courses = await Course.find({ user_id: req.user.id });
    res.status(200).json(courses);
  });

  //@desc Create New contact
  //@route POST /api/contacts
  //@access private
  const createCourse = asyncHandler(async (req, res) => {
    console.log("The request body is :", req.body);
    const { name, descripion, credits } = req.body;
    if (!name || !descripion || !credits) {
      res.status(400);
      throw new Error("All fields are mandatory !");
    }
         // Check if user's email is admin@gmail.com
         if (req.user.email !== "staff@gmail.com") {
          res.status(403);
          throw new Error("Access denied: Only staff users are allowed to do this!");
        }

    const course = await Course.create({
      name,
      descripion,
      credits,
      user_id: req.user.id,
    });
    // Create a notification for the created course
  const notificationMessage = `New course "${course.name}" created`;
  await Notification.create({ message: notificationMessage });

    res.status(201).json(course);
  });



  //@desc Get contact
  //@route GET /api/contacts/:id
  //@access private
  const getCourse = asyncHandler(async (req, res) => {
    const course = await Course.findById(req.params.id);
    if (!course) {
      res.status(404);
      throw new Error("Course not found");
    }
    res.status(200).json(course);
  });

  //@desc Update contact
  //@route PUT /api/contacts/:id
  //@access private
  const updateCourse = asyncHandler(async (req, res) => {
    const course = await Course.findById(req.params.id);
    if (!course) {
      res.status(404);
      throw new Error("Course not found");
    }

     // Check if user's email is admin@gmail.com
     if (req.user.email !== "staff@gmail.com") {
      res.status(403);
      throw new Error("Access denied: Only staff users are allowed to do this!");
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

      // Create a notification for the updated course
      const notificationMessage = `Course "${updatedCourse.name}" updated`;
      await Notification.create({ message: notificationMessage });

    res.status(200).json(updatedCourse);
  });

  //@desc Delete contact
  //@route DELETE /api/contacts/:id
  //@access private
  const deleteCourse = asyncHandler(async (req, res) => {
    const course = await Course.findById(req.params.id);
    if (!course) {
      res.status(404);
      throw new Error("Course not found");
    }
     // Check if user's email is admin@gmail.com
     if (req.user.email !== "staff@gmail.com") {
      res.status(403);
      throw new Error("Access denied: Only staff users are allowed to do this!");
    }
      // Create a notification for the deleted course before deletion
      const notificationMessage = `Course "${course.name}" deleted`;
      await Notification.create({ message: notificationMessage });

    await Course.deleteOne({ _id: req.params.id });
    res.status(200).json(course);
  });

  module.exports = {
    getCourses,
    createCourse,
    getCourse,
    updateCourse,
    deleteCourse,
  };
