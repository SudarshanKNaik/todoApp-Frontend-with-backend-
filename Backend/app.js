// Core Module
const path = require('path');
const express = require('express');

// External Module
const mongoose = require('mongoose');
const cors = require('cors');

const DB_PATH = "mongodb+srv://root:root@todo.k2ocptn.mongodb.net/todo"; // added db name
const errorsController = require('./controller/error');

// Local Module
const todoItemsRouter = require('./routes/todoItemsRouter.js');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/api/todo", todoItemsRouter); // fixed missing /

app.use(errorsController.pageNotFound);

const PORT = 3005;

mongoose.connect(DB_PATH)
  .then(() => {
    console.log('Connected to Mongo');
    app.listen(PORT, () => {
      console.log(`Server running on address http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.log('Error while connecting to Mongo: ', err);
  });
