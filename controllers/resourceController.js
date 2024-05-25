const asyncHandler = require("express-async-handler");
const Resources = require("../models/resources.js");
const Notification = require("../models/notification");

//@desc Get all resources
//@route GET /api/resources
//@access private
const getresources = asyncHandler(async (req, res) => {
  const resources = await Resources.find({ user_id: req.user.id });
  res.status(200).json(resources);
});

//@desc Create New resources
//@route POST /api/resources
//@access private
const createresources = asyncHandler(async (req, res) => {
  console.log("The request body is monupdated:", req.body);
  const { name, state } = req.body;
  if (!name || !state) {
    res.status(400);
    throw new Error("All fields are mandatory !");
  }

    // Check if user's email is admin@gmail.com
    if (req.user.email !== "admin@gmail.com") {
      res.status(403);
      throw new Error("Access denied: Only admin users are allowed to create resources");
    }

  const resources = await Resources.create({
    name,
    state,
    user_id: req.user.id,
  });

  res.status(201).json(resources);
});

//@desc Get resources
//@route GET /api/resources/:id
//@access private
const getresource = asyncHandler(async (req, res) => {
  const resources = await Resources.findById(req.params.id);
  if (!resources) {
    res.status(404);
    throw new Error("resources not found");
  }
  res.status(200).json(resources);
});

//@desc Update resources
//@route PUT /api/resources/:id
//@access private
const updateresources = asyncHandler(async (req, res) => {
  const resources = await Resources.findById(req.params.id);
  if (!resources) {
    res.status(404);
    throw new Error("resources not found");
  }

  // Check if user's email is admin@gmail.com
  if (req.user.email !== "admin@gmail.com") {
    res.status(403);
    throw new Error("Access denied: Only admin users are allowed to update resources");
  }

  const updatedresources = await Resources.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

    // Create a notification for the updated course
  const notificationMessage = `Resource "${updatedresources.name}" updated`;
  await Notification.create({ message: notificationMessage });


  res.status(200).json(updatedresources);
});

//@desc Delete resources
//@route DELETE /api/resources/:id
//@access private
const deleteresources = asyncHandler(async (req, res) => {
  const resources = await Resources.findById(req.params.id);
  if (!resources) {
    res.status(404);
    throw new Error("resources not found");
  }

  // Check if user's email is admin@gmail.com
  if (req.user.email !== "admin@gmail.com") {
    res.status(403);
    throw new Error("Access denied: Only admin users are allowed to update resources");
  }
  
  await Resources.deleteOne({ _id: req.params.id });
  res.status(200).json(resources);
});

module.exports = {
    getresources,
    createresources,
    getresource,
    updateresources,
    deleteresources,
};
