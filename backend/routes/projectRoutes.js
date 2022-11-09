const express = require("express");
const router = express.Router();
const {
  getProjects,
  setProjects,
  updateProjects,
  deleteProjects,
} = require("../controllers/projectController");

router.route("/").get(getProjects).post(setProjects);
router.route("/:id").put(updateProjects).delete(deleteProjects);

module.exports = router;
