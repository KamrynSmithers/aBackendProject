const express = require('express');
const router = express.Router();
const Project = require('../../models/Project');
const { protect } = require('../../utils/middleware');

router.use(protect);

router.post('/', async (req, res) => {
  const { name, description } = req.body;
  
  const project = await Project.create({
    name,
    description,
    user: req.user._id 
  });
  
  res.status(201).json(project);
});

router.get('/', async (req, res) => {
  const projects = await Project.find({ user: req.user._id });
  res.json(projects);
});

router.get('/:id', async (req, res) => {
  const project = await Project.findById(req.params.id);
  
  if (!project) {
    return res.status(404).json({ message: 'Project not found' });
  }
  
  if (project.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Not authorized' });
  }
  
  res.json(project);
});

router.put('/:id', async (req, res) => {
  const project = await Project.findById(req.params.id);
  
  if (!project) {
    return res.status(404).json({ message: 'Project not found' });
  }
  
  if (project.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Not authorized' });
  }
  
  const { name, description } = req.body;
  if (name) project.name = name;
  if (description) project.description = description;
  
  const updatedProject = await project.save();
  res.json(updatedProject);
});

router.delete('/:id', async (req, res) => {
  const project = await Project.findById(req.params.id);
  
  if (!project) {
    return res.status(404).json({ message: 'Project not found' });
  }
  
  if (project.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Not authorized' });
  }
  
  await Project.deleteOne({ _id: req.params.id });
  res.json({ message: 'Project deleted' });
});

module.exports = router;