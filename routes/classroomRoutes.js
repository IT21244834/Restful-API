const express = require("express");
const router = express.Router();
const {
  getClassrooms,
  createClassroom,
  getClassroom,
  updateClassroom,
  deleteClassroom,
} = require("../controllers/classroomController");
const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken);
router.route("/").get(getClassrooms).post(createClassroom);
router.route("/:id").get(getClassroom).put(updateClassroom).delete(deleteClassroom);

module.exports = router;
