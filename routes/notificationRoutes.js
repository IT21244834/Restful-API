const express = require('express');
const router = express.Router();
const { createNotification } = require('../controllers/notificationController');
//const validateToken = require("../middleware/validateTokenHandler");

//router.use(validateToken);

// POST route to create a notification
router.post('/notifications', createNotification);

module.exports = router;
