const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const Task = require("./models/Task");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json({ tasks: tasks });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    res.status(200).json({ task: task });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/tasks", async (req, res) => {
  try {
    const task = req.body;
    const newTask = new Task({
      name: task.name,
      category: task.category,
      dueDate: task.dueDate,
    });
    await newTask.save();
    res.status(200).json({ 
        message: "add Task seccessfully", 
        Task: newTask });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.delete("/tasks/:id" , async (req, res) => {
    try {
        const taskid = req.params.id;
        const task = await Task.findById(taskid);
        if(!task) {
          return res.status(400).json({message: "Task not found"})
        }
        res.status(200).json({message: "delete successfully" , task: task});
    } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.put("/tasks/:id" , async (req, res) => {
    try {
        const taskid = req.params.id;
        const task = req.body;
        await Task.findByIdAndUpdate(taskid,task);
        res.status(200).json({message: "update successfully"});
    } catch (err) {
    res.status(500).json({ message: err.message });
  }
})

mongoose.connect(process.env.MONGO_URL).then(() => { 
    console.log("connected to Mongodb")
    app.listen(5000 ,()=> {
        console.log("Server run port 5000");
    });
}).catch((err) => {
    console.error('MongoDB connection error:', err)
});