const asyncHandler = require("express-async-handler");
// @desc Get projects
// @route GET /api/projects
// @access Private
const getProjects = asyncHandler(async (req, res) => {
  res.json({ message: "Get goals" });
});

// @desc Set projects
// @route POST /api/projects
// @access Private
const setProjects = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    res.status(400);
    throw new Error("Please add a name filed");
  }
  res.json({ message: "Set projects" });
});

// @desc Update projects
// @route PUT /api/projects:id
// @access Private
const updateProjects = asyncHandler(async (req, res) => {
  res.json({ message: `Update project ${req.params.id}` });
});

// @desc Delete projects
// @route DELETE /api/projects:id
// @access Private
const deleteProjects = asyncHandler(async (req, res) => {
  res.json({ message: `Delete project ${req.params.id}` });
});

module.exports = {
  getProjects,
  setProjects,
  updateProjects,
  deleteProjects,
};
