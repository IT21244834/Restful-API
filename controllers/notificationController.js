const asyncHandler = require('express-async-handler');
const Notification = require('../models/notification');

// Controller to create a new notification
const createNotification = asyncHandler(async (req, res) => {
    const { message } = req.body;
    console.log("Received request to create notification");
    const notification = await Notification.create({ message });
    res.status(201).json(notification);
});

module.exports = {createNotification};
