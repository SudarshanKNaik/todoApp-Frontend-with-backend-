# TODO App - Full Stack Application

A modern, responsive TODO application built with React frontend and Node.js backend, featuring a sleek dark theme and real-time task management capabilities.

![TODO App Screenshot](https://via.placeholder.com/800x400/1e293b/ffffff?text=TODO+App+Screenshot)

## 🚀 Features

### Core Functionality
- **Task Management**: Create, read, update, and delete todo items
- **Task Completion**: Mark tasks as complete/incomplete with visual indicators
- **Due Date Tracking**: Set and display due dates for tasks
- **Real-time Updates**: Instant UI updates with server synchronization
- **Responsive Design**: Works seamlessly on desktop and mobile devices

### User Interface
- **Modern Dark Theme**: Sleek gradient background with glassmorphism effects
- **Intuitive Layout**: Clean separation between active and completed tasks
- **Visual Feedback**: Strikethrough text for completed tasks
- **Action Buttons**: Clear Complete and Delete buttons for each task
- **Welcome Message**: Friendly greeting when no tasks exist

### Technical Features
- **Full Stack Architecture**: React frontend with Node.js/Express backend
- **Database Integration**: MongoDB with Mongoose ODM
- **RESTful API**: Clean API endpoints for CRUD operations
- **CORS Enabled**: Cross-origin resource sharing for development
- **Error Handling**: Comprehensive error management
- **Modern Build Tools**: Vite for fast development and building

## 🛠️ Tech Stack

### Frontend
- **React 18.3.1** - Modern UI library
- **Vite 5.2.0** - Fast build tool and dev server
- **Tailwind CSS 4.1.12** - Utility-first CSS framework
- **ESLint** - Code linting and formatting

### Backend
- **Node.js** - JavaScript runtime
- **Express.js 4.21.0** - Web application framework
- **MongoDB 6.10.0** - NoSQL database
- **Mongoose 8.12.1** - MongoDB object modeling
- **CORS 2.8.5** - Cross-origin resource sharing
- **Nodemon 3.1.7** - Development server with auto-restart

## 📁 Project Structure

```
Todo App(Fronted+Backend)/
├── Frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── AddTodo.jsx
│   │   │   ├── AppName.jsx
│   │   │   ├── TodoItem.jsx
│   │   │   ├── TodoItems.jsx
│   │   │   └── WelcomeMessage.jsx
│   │   ├── services/         # API service functions
│   │   │   └── itemService.js
│   │   ├── App.jsx          # Main application component
│   │   └── main.jsx         # Application entry point
│   ├── public/              # Static assets
│   └── package.json         # Frontend dependencies
├── Backend/                 # Node.js backend application
│   ├── models/              # Database models
│   │   └── TodoItem.js
│   ├── routes/              # API routes
│   │   └── todoItemsRouter.js
│   ├── controller/          # Request handlers
│   │   ├── todoItemsController.js
│   │   └── error.js
│   ├── app.js              # Main server file
│   └── package.json        # Backend dependencies
└── README.md               # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- MongoDB database (local or cloud)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd "Todo App(Fronted+Backend)"
   ```

2. **Set up the Backend**
   ```bash
   cd Backend
   npm install
   ```

3. **Configure Database**
   - Update the MongoDB connection string in `Backend/app.js`
   - Replace the placeholder connection string with your MongoDB URI:
   ```javascript
   const DB_PATH = "mongodb+srv://your-username:your-password@your-cluster.mongodb.net/todo";
   ```

4. **Set up the Frontend**
   ```bash
   cd ../Frontend
   npm install
   ```

### Running the Application

1. **Start the Backend Server**
   ```bash
   cd Backend
   npm start
   ```
   The backend will run on `http://localhost:3005`

2. **Start the Frontend Development Server**
   ```bash
   cd Frontend
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`

3. **Open your browser**
   Navigate to `http://localhost:5173` to use the application

## 📖 Usage

### Adding a Task
1. Enter the task description in the input field
2. Set a due date using the date picker
3. Click the "Add" button to create the task

### Managing Tasks
- **Complete a Task**: Click the green "Complete" button to mark a task as done
- **Delete a Task**: Click the red "Delete" button to remove a task
- **View Tasks**: Tasks are automatically organized into "Active" and "Completed" sections

### Task Organization
- **Active Tasks**: Currently pending tasks that need to be completed
- **Completed Tasks**: Finished tasks with strikethrough text styling

## 🔧 API Endpoints

The backend provides the following RESTful API endpoints:

- `GET /api/todo` - Get all todo items
- `POST /api/todo` - Create a new todo item
- `PUT /api/todo/:id` - Update a todo item (mark as complete/incomplete)
- `DELETE /api/todo/:id` - Delete a todo item

### Request/Response Examples

**Create a new task:**
```bash
POST /api/todo
Content-Type: application/json

{
  "task": "Complete project documentation",
  "date": "2024-01-15"
}
```

**Get all tasks:**
```bash
GET /api/todo
```

## 🎨 Customization

### Styling
The application uses Tailwind CSS for styling. You can customize the appearance by:
- Modifying the gradient colors in `Frontend/src/App.jsx`
- Updating the component styles in individual component files
- Adjusting the Tailwind configuration in `Backend/tailwind.config.js`

### Features
To add new features:
- Create new components in `Frontend/src/components/`
- Add corresponding API endpoints in `Backend/routes/`
- Update the database schema in `Backend/models/` if needed

## 🐛 Troubleshooting

### Common Issues

1. **Backend won't start**
   - Check if MongoDB is running and accessible
   - Verify the connection string in `app.js`
   - Ensure all dependencies are installed

2. **Frontend can't connect to backend**
   - Verify the backend is running on port 3005
   - Check CORS configuration
   - Ensure the API service URLs are correct

3. **Build errors**
   - Clear node_modules and reinstall dependencies
   - Check for version conflicts in package.json files

## 📝 Development

### Available Scripts

**Frontend:**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

**Backend:**
- `npm start` - Start development server with nodemon
- `npm run tailwind` - Watch and compile Tailwind CSS

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

## 👨‍💻 Author

Created with ❤️ for efficient task management

---

**Happy coding! 🚀**
