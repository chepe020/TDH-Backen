import ToDoList from "./to-do-list.model.js";
import CategorySubject from "../categorySubject/categorySubject.model.js";
import User from "../users/user.model.js";
import Successes from "../successes/successes.model.js";
import { response } from "express";
import mongoose from "mongoose";

export const createToDoList = async (req, res = response) => {
    try {
        const { taskName, taskDescription, dueDate, priority, nameSubject, imageUrl } = req.body;

        const userId = req.usuario._id;

        const categorySubject = await CategorySubject.findOne({ nameSubject: nameSubject });

        const newToDo = new ToDoList({
            taskName,
            taskDescription,
            dueDate,
            priority,
            category: categorySubject._id,
            user: userId,
            imageUrl
        });

        await newToDo.save();

        res.status(201).json({
            msg: 'Task created successfully',
            task: newToDo
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Server error'
        });
    }
};

export const updateToDoList = async (req, res = response) => {
    try {
        const { taskId } = req.params;
        const { taskName, taskDescription, dueDate, priority, category, taskStatus, status, imageUrl } = req.body;
        const userId = req.usuario._id;

        const toDo = await ToDoList.findOne({ _id: taskId, user: userId });
        if (!toDo) {
            return res.status(404).json({ msg: 'Task not found or you do not have permission' });
        }

        const previousStatus = toDo.taskStatus;

        toDo.taskName = taskName || toDo.taskName;
        toDo.taskDescription = taskDescription || toDo.taskDescription;
        toDo.dueDate = dueDate || toDo.dueDate;
        toDo.priority = priority || toDo.priority;
        toDo.category = category || toDo.category;
        toDo.taskStatus = taskStatus || toDo.taskStatus;
        toDo.status = status !== undefined ? status : toDo.status;
        toDo.imageUrl = imageUrl || toDo.imageUrl;

        await toDo.save();

        if (previousStatus === 'Pending' && toDo.taskStatus === 'Completed') {
            const user = await User.findById(userId);

            user.points += 1000;
            user.tasksSubmitted += 1;

            const success = await Successes.findOne({
                amountTasks: user.tasksSubmitted,
                status: true
            });

            if (success) {
                user.points += success.points;

                const userExists = success.keeperUser.some(
                    entry => entry.userCompletedTask.user.toString() === userId.toString()
                );

                if (!userExists) {
                    success.keeperUser.push({
                        userCompletedTask: {
                            user: userId,
                            status: false
                        }
                    });
                    await success.save();
                }
            }
            await user.save();
        }

        res.status(200).json({
            msg: 'Task updated successfully',
            task: toDo
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Server error'
        });
    }
};

export const deleteToDoList = async (req, res = response) => {
    try {
        const { taskId } = req.params;
        const userId = req.usuario._id;

        const toDo = await ToDoList.findOne({ _id: taskId, user: userId });
        if (!toDo) {
            return res.status(404).json({ msg: 'Task not found or you do not have permission' });
        }

        await toDo.deleteOne();

        res.status(200).json({
            msg: 'Task deleted successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Server error'
        });
    }
};

export const getToDosList = async (req, res = response) => {
    try {
        const { taskName, dueDate, priority, category } = req.query;
        const userId = req.usuario._id;

        const filter = { user: userId };

        if (taskName) {
            filter.taskName = { $regex: taskName, $options: 'i' };
        }

        if (dueDate) {
            filter.dueDate = { $lte: new Date(dueDate) };
        }

        if (priority) {
            filter.priority = priority;
        }

        if (category) {
            if (mongoose.isValidObjectId(category)) {
                filter.category = category;
            } else {
                const categoryDoc = await CategorySubject.findOne({
                    nameSubject: { $regex: category, $options: 'i' }
                });

                if (!categoryDoc) {
                    return res.status(404).json({
                        msg: 'No tasks found: category not found'
                    });
                }

                filter.category = categoryDoc._id;
            }
        }

        const toDos = await ToDoList.find(filter)
            .sort({ dueDate: 1 })
            .populate('category', 'nameSubject');

        if (toDos.length === 0) {
            return res.status(404).json({
                msg: 'No tasks found'
            });
        }

        res.status(200).json({
            toDos
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Server error'
        });
    }
};
