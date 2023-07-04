const express = require('express');
const { TaskSchema } = require('../validations/task.js');
const Task = require('../models/Task');

const router = express.Router();

router.get('/', async (req, res) => {
  const userID = req.user.id;
  try {
    const allTasks = await Task.find({ userID: userID });
    return res.status(200).send({ tasks: allTasks });
  } catch {
    return res.status(500).json({
      message: 'Something went wrong, please try again',
    });
  }
});

router.post('/', async (req, res) => {
  const userID = req.user.id;
  const { error } = await TaskSchema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ message: error.details[0].message });
  }

  const newTask = await new Task({
    item: req.body.item,
    userID: userID,
  });
  try {
    const savedTask = await newTask.save();
    return res.status(201).json({ addedTask: savedTask });
  } catch {
    res.status(500).json({
      message: 'Something went wrong, please try again',
    });
  }
});

router.put('/:id', async (req, res) => {
  const taskID = req.params.id;
  const { error } = await TaskSchema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ message: error.details[0].message });
  }

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      taskID,
      {
        isCompleted: req.body.isCompleted,
        item: req.body.item,
      },
      { new: true }
    );
    if (!updatedTask) {
      return res.status(400).json({
        message:
          'We could not find the task in our database',
      });
    }
    return res
      .status(200)
      .json({ updatedTask: updatedTask });
  } catch {
    res.status(500).json({
      message: 'Something went wrong, please try again',
    });
  }
});

router.delete('/:id', async (req, res) => {
  const taskID = req.params.id;
  try {
    const deletedTask = await Task.findByIdAndDelete(
      taskID
    );
    if (!deletedTask) {
      return res.status(400).json({
        message:
          'We could not find the task in our database',
      });
    }
    res.status(200).json({ deletedTask: deletedTask });
  } catch {
    res.status(500).json({
      message: 'Something went wrong, please try again',
    });
  }
});

module.exports = router;
