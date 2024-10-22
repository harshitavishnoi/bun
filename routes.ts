import express from "express";
import mongoose from "mongoose";

const router = express.Router();

const TaskSchema = new mongoose.Schema({
  title: String,
  description: String,
});
const Task = mongoose.model("Task", TaskSchema);

router.post("/tasks", async (req, res) => {
  try {
    const { title, description } = req.body;
    const newTask = new Task({ title, description });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: "Failed to create task" });
  }
});

router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

export default router;
