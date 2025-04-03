const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const connectToDb = require('./db/db');
const userRoutes = require('./routes/user.routes');
const taskRoutes = require('./routes/task.routes');

const port = process.env.PORT || 5000;
const app = express();

// Connect to MongoDB using the DB_CONNECT from the .env file
connectToDb();

// CORS configuration to allow cross-origin requests from your frontend (e.g., React)
app.use(cors({
    origin: [
        "http://localhost:5173", // Local development frontend
        "https://taskmanagerapp-frontend-mvkc4jzgu-sampuran-udeshis-projects.vercel.app/", // Vercel Production URL
    ],
    credentials: true, // Allow cookies to be sent with requests
    methods: ["GET", "POST", "PUT", "DELETE"], 
    allowedHeaders: ["Content-Type", "Authorization"], 
}));

// Middleware for parsing JSON and URL encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // To parse cookies from incoming requests

// API Routes for users and tasks
app.use('/users', userRoutes); // Define user-related routes (e.g., register, login)
app.use('/tasks', taskRoutes); // Define task-related routes (e.g., create, update, delete)

// Health check route for server status
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

// Base route (root endpoint) for testing if the server is running
app.get('/', (req, res) => {
    res.send('Task Management API is running...');
});

// Start the server and listen on the specified port
app.listen(port, () => {
    console.info(`Server running on port: ${port}`);
});

module.exports = app;
