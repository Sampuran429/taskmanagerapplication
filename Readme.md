# Task Management Application

This is a backend application for managing tasks and user authentication, built with **Node.js** and **Express**.  
It provides API endpoints for **user registration, authentication (JWT), and task management**.

---

## ✨ Features

### 🛡️ User Authentication
- **Register**: Sign up new users with first name, last name, email, and password.
- **Login**: Authenticate users and generate JWT tokens.
- **Profile**: Retrieve authenticated user details.
- **Logout**: Invalidate JWT tokens (blacklisting).

### ✅ Task Management
- **Create Task**: Add a new task.
- **Retrieve Tasks**: View all tasks of the authenticated user.
- **Get Task Details**: Fetch a task by its ID.
- **Update Task**: Modify an existing task.
- **Delete Task**: Remove a task from the database.

---

## 🛠️ Technologies Used
- **Node.js** - Backend runtime
- **Express.js** - Web framework
- **MongoDB & Mongoose** - Database & ODM
- **JWT (jsonwebtoken)** - Token-based authentication
- **bcrypt** - Password hashing
- **dotenv** - Environment variable management
- **express-validator** - Request validation

---

## 🛠️ Installation

### 1️⃣ Clone the repository:
```sh
git clone https://github.com/Sampuran429/taskmanagerapplication
```

### 2️⃣ Navigate to the project directory:
```sh
cd Backend
```

### 3️⃣ Install dependencies:
```sh
npm install
```

### 4️⃣ Create a `.env` file with the following:
```ini
DB_CONNECT=mongodb://localhost:27017/task-manager
PORT=5000
JWT_SECRET=your secret-key
```

---

## 🚀 Running the Application

- **Development mode (nodemon):**
  ```sh
  npm run dev
  ```
- **Production mode:**
  ```sh
  npm start
  ```

---

## 🔗 API Endpoints

### **👤 User Routes**
| Method | Endpoint           | Description |
|--------|--------------------|-------------|
| `POST` | `/users/register`  | Register a new user |
| `POST` | `/users/login`     | Authenticate user & get JWT |
| `GET`  | `/users/profile`   | Get logged-in user profile |
| `GET`  | `/users/logout`    | Logout & blacklist token |

### **📝 Task Routes**
| Method | Endpoint                 | Description |
|--------|--------------------------|-------------|
| `POST` | `/tasks/create`          | Create a new task |
| `GET`  | `/tasks/getall`          | Retrieve all tasks |
| `GET`  | `/tasks/get-task/:id`    | Get task by ID |
| `PUT`  | `/tasks/update-task/:id` | Update a task |
| `DELETE` | `/tasks/delete-task/:id` | Delete a task |

---

## 💒 Project Structure

```
Backend/
│── controllers/
│   ├── user.controller.js
│   ├── task.controller.js
│── middlewares/
│   ├── auth.middleware.js
│── models/
│   ├── user.model.js
│   ├── task.model.js
│── routes/
│   ├── user.routes.js
│   ├── task.routes.js
│── config/
│   ├── db.config.js
│── .env
│── server.js
│── package.json
```

---

## 👨‍💻 Contributing
- Feel free to fork this repository, create a branch, and submit a pull request.  
- Open an issue for feature requests or bug reports.

---

## 🐝 License
This project is licensed under the **MIT License**.

---

### 📢 **Note**
Make sure your `.env` file is properly set up before running the application.

---



