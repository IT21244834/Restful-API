const express = require("express");
const router = express.Router();
const {
  getTimes,
  createTime,
  getTime,
  updateTime,   
  deleteTime,
} = require("../controllers/timetableController");
const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken);
router.route("/").get(getTimes).post(createTime);
router.route("/:id").get(getTime).put(updateTime).delete(deleteTime);

module.exports = router;