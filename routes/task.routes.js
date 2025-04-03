const express = require('express');
const { body, validationResult } = require('express-validator'); 
const authMiddleware = require('../middlewares/auth.middleware');
const taskController = require('../controllers/task.controller');

const router = express.Router();

router.post(
    "/create",
    authMiddleware.authUser,
    [body("title").notEmpty().withMessage("Title is required")],
    (req, res, next) => {
        const errors = validationResult(req); 
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    taskController.createTask
);




router.get("/getall", authMiddleware.authUser, taskController.getTasks);
router.get("/get-task/:id", authMiddleware.authUser, taskController.getTaskById);


router.put("/update-task/:id", authMiddleware.authUser, taskController.updateTask);

router.delete("/delete-task/:id", authMiddleware.authUser, taskController.deleteTask);

module.exports=router;