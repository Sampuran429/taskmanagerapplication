const Task=require('../models/task.model');
const User=require('../models/user.model');

module.exports.createTask = async (req, res) => {
    console.log("Received body:", req.body); // Debugging
    try {
        const { title, description } = req.body;
        if (!title || !description) {
            return res.status(400).json({ message: "Title and description are required" });
        }
        const task = new Task({
            title,
            description,
            userId: req.user._id,
        });
        await task.save();
        res.status(201).json({ task, message: "Task created successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.getTasks =async(req, res) => {
    try{
        const tasks=await Task.find({userId:req.user._id});
        res.status(200).json(tasks);
    }catch(error){
        res.status(500).json({ message: error.message });
    }
};

module.exports.getTaskById=async (req, res) => {
    try{
        const task = await Task.findOne({ _id: req.params.id, userId: req.user._id });
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(task);
    }catch(error){
        res.status(500).json({ message: error.message });
    }
};

module.exports.updateTask=async (req, res) => {
    try{
        const task=await Task.findOneAndUpdate(
            {_id: req.params.id, userId: req.user._id },
            req.body,
            {new : true}
        );
        if (!task){
            return res.status(404).json({ message: "Task not found" }); 
        }
        res.status(200).json({ task, message: "Task updated successfully" });
    }catch(error){
        res.status(500).json({ message: error.message });
    }
};

module.exports.deleteTask = async (req, res) => {
    try {
        console.log("Delete request received for Task ID:", req.params.id);
        console.log("User ID:", req.user._id);

        const task = await Task.findOneAndDelete({
            _id: req.params.id,
            userId: req.user._id
        });

        if (!task) {
            console.log("Task not found.");
            return res.status(404).json({ message: "Task not found" });
        }

        console.log("Task deleted successfully:", task);
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).json({ message: error.message });
    }
};


