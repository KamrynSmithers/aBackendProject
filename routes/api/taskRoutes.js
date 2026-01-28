const express = require('express');
const router = express.Router();
const Task = require('../../models/Task');
const Project = require('../../models/Project');
const { protect } = require('../../utils/middleware');

//  routes protected
router.use(protect);

// create task
router.post('/:projectId/tasks', async (req, res) => {
  const { title, description, status } = req.body;

  const project = await Project.findById(req.params.projectId);
  
  if (!project) {
    return res.status(404).json({ message: 'Project not found' });
  }

  if (project.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Not authorized' });
  }

  // Create task
  const task = await Task.create({
    title,
    description,
    status,
    project: req.params.projectId
  });

  res.status(201).json(task);
});

// all tasks for project
router.get('/:projectId/tasks', async (req, res) => {
  const project = await Project.findById(req.params.projectId);
  
  if (!project) {
    return res.status(404).json({ message: 'Project not found' });
  }

  if (project.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Not authorized' });
  }

  const tasks = await Task.find({ project: req.params.projectId });
  res.json(tasks);
});

router.put('/:taskId', async (req, res) => {
  // find task
  const task = await Task.findById(req.params.taskId);
  
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  const project = await Project.findById(task.project);
  
  if (project.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Not authorized' });
  }

  // update task
  const { title, description, status } = req.body;
  if (title) task.title = title;
  if (description !== undefined) task.description = description;
  if (status) task.status = status;

  const updatedTask = await task.save();
  res.json(updatedTask);
});

router.delete('/:taskId', async (req, res) => {

    const task = await Task.findById(req.params.taskId);
  
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  const project = await Project.findById(task.project);
  
  if (project.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Not authorized' });
  }

  await Task.deleteOne({ _id: req.params.taskId });
  res.json({ message: 'Task deleted' });
});

module.exports = router;