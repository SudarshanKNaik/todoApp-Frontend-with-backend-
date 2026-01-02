// Core Module
const path = require('path');
const express = require('express');

// External Module
const mongoose = require('mongoose');
const cors = require('cors');

const DB_PATH = process.env.MONGODB_URI || "mongodb://localhost:27017/todo"; // added db name
const errorsController = require('./controller/error');

// Local Module
const todoItemsRouter = require('./routes/todoItemsRouter.js');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Root route - redirect to API or show todos
app.get("/", async (req, res) => {
  try {
    const TodoItem = require('./models/TodoItem.js');
    const todoItems = await TodoItem.find();
    res.status(200).json(todoItems);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch todo items", error: err.message });
  }
});

app.use("/api/todo", todoItemsRouter); // fixed missing /

app.use(errorsController.pageNotFound);

const PORT = process.env.PORT || 3005;

mongoose.connect(DB_PATH)
  .then(() => {
    console.log('Connected to Mongo');
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on address http://0.0.0.0:${PORT}`);
    });
  })
  .catch(err => {
    console.log('Error while connecting to Mongo: ', err);
  });
