const express = require("express");
const router = express.Router();
const {
  getresources,
  createresources,
  getresource,
  updateresources,
  deleteresources,
} = require("../controllers/resourceController");
const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken);
router.route("/").get(getresources).post(createresources);
router.route("/:id").get(getresource).put(updateresources).delete(deleteresources);

module.exports = router;
