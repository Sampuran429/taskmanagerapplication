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
        "http://localhost:5173", 
        "https://taskmanagerapp-frontend-n2imu998i-sampuran-udeshis-projects.vercel.app"
    ],
    
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

// Handle Preflight Requests (Important for CORS)
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }

    next();
});

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
