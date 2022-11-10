const asyncHandler = require("express-async-handler");

const Project = require("../models/projectModel");

// @desc Get projects
// @route GET /api/projects
// @access Private
const getProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find();

  res.json(projects);
});

// @desc Set projects
// @route POST /api/projects
// @access Private
const setProjects = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    res.status(400);
    throw new Error("Please add a name filed");
  }

  const project = await Project.create({
    name: req.body.name,
  });
  res.json(project);
});

// @desc Update projects
// @route PUT /api/projects:id
// @access Private
const updateProjects = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    res.status(400);
    throw new Error("Project not found");
  }

  const updatedProject = await Project.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updatedProject);
});

// @desc Delete projects
// @route DELETE /api/projects:id
// @access Private
const deleteProjects = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    res.status(400);
    throw new Error("Project not found");
  }
  await project.remove();
  res.json({ message: `Delete project ${req.params.id}` });
});

module.exports = {
  getProjects,
  setProjects,
  updateProjects,
  deleteProjects,
};
