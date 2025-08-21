const TodoItem = require('../models/TodoItem.js');

exports.createTodoItem = async (req, res, next) => {
  try {
    console.log(req.body);
    const { task, date } = req.body;

    const todoItem = new TodoItem({ task, date });
    await todoItem.save(); 

    res.status(201).json({ 
      message: 'Todo item created successfully', 
      item: todoItem 
    });
  } catch (err) {
    console.error("Error creating todo:", err);
    res.status(500).json({ message: "Failed to create todo", error: err.message });
  }
};

exports.getAllTodoItems = async (req, res, next) => {
  try {
    const todoItems = await TodoItem.find();
    res.status(200).json(todoItems);
  } catch (err) {
    console.error("Error fetching todo items:", err);
    res.status(500).json({ message: "Failed to fetch todo items", error: err.message });
  }
}
exports.markTodoItemCompleted = async (req, res, next) => {
  try {
    const { id } = req.params;
    const todoItem = await TodoItem.findByIdAndUpdate(
      id,
      { completed: true },
      { new: true }
    );  
    if (!todoItem) {
      return res.status(404).json({ message: "Todo item not found" });
    }
    res.status(200).json({ 
      message: 'Todo item marked as completed', 
      item: todoItem 
    });
  } catch (err) {
    console.error("Error marking todo item as completed:", err);
    res.status(500).json({ message: "Failed to mark todo item as completed", error: err.message });
  }
}
exports.deleteTodoItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const todoItem = await TodoItem.findByIdAndDelete(id);
    if (!todoItem) {
      return res.status(404).json({ message: "Todo item not found" });
    } 
    res.status(200).json({ 
      message: 'Todo item deleted successfully', 
      item: todoItem 
    });
  } catch (err) {
    console.error("Error deleting todo item:", err);
    res.status(500).json({ message: "Failed to delete todo item", error: err.message });
  }
}