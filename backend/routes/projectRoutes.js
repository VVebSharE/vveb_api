const express = require("express");
const router = express.Router();
const {
  getProjects,
  setProjects,
  updateProjects,
  deleteProjects,
} = require("../controllers/projectController");

const {protect}= require('../middleware/authMiddleware')

router.route("/").get(protect,getProjects).post(protect,setProjects);
router.route("/:id").put(protect,updateProjects).delete(protect,deleteProjects);

module.exports = router;
