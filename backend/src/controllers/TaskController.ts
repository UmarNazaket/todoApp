import {Request, Response} from "express";
import { User } from "../models/User";
import {TaskSchema} from "../shared/schemaValidator";
import RequestResponseMappings from "../shared/responseMapping";
import TaskController from "../controllers/TaskController"
import jsonwebtoken from 'jsonwebtoken';
import Joi from "joi";
import Task from "../models/Task";


export interface Task extends Document {
    title: string;
    description: string;
    priority: string;
    dueDate: Date;
    status: string;
    user: User['_id']; // Reference to the User schema
}


export default {
    getTasks: async (req: Request, res: Response) => {
        try {
            const userId = req.query.userId;
            const tasks = await Task.find({ user: userId });
            return RequestResponseMappings.sendSuccessMessage(res, tasks);
          } catch (error) {
            console.error('Error retrieving task:', error);
            return RequestResponseMappings.sendErrorMessage(res, {error}, "Couldn't find task")
          }
    },
    addTask: async (req: Request, res: Response) => {
        try {
            let taskValidationError: Joi.ValidationError | undefined = TaskController.errorValidateTaskSchema(req.body.task)
            if (taskValidationError && "detail" in taskValidationError) {
                return RequestResponseMappings
                    .sendErrorMessage(
                        res,
                        taskValidationError.details
                    )
            }
            let task = await Task.create(
                {
                    title: req.body.task.title,
                    description: req.body.task.description,
                    priority: req.body.task.priority,
                    dueDate: req.body.task.dueDate,
                    status: req.body.task.status,
                    user: req.body.task.user
                });
            await task.save();
            return RequestResponseMappings.sendSuccessMessage(res, task);
        }catch (e:any) {
            return RequestResponseMappings.sendErrorMessage(res,{},e.message)
        }
    },
    deleteTask: async (req: Request, res: Response) => {
        try {
          const taskId = req.query.taskId;
          const deletedTask = await Task.findByIdAndDelete(taskId);
          
          if (!deletedTask) {
            return RequestResponseMappings.sendErrorMessage(res, {}, "Task not found");
          }
          
          return RequestResponseMappings.sendSuccessMessage(res, deletedTask);
        } catch (error) {
          console.error('Error deleting task:', error);
          return RequestResponseMappings.sendErrorMessage(res, { error }, "Couldn't delete task");
        }
      },
      updateTask: async (req: Request, res: Response) => {
        try {
          const taskId = req.body.task.id;
          const updatedTask = await Task.findByIdAndUpdate(taskId, req.body.task, { new: true });          
          if (!updatedTask) {
            return RequestResponseMappings.sendErrorMessage(res, {}, "Task not found");
          }
          
          return RequestResponseMappings.sendSuccessMessage(res, updatedTask);
        } catch (error) {
          console.error('Error updating task:', error);
          return RequestResponseMappings.sendErrorMessage(res, { error }, "Couldn't update task");
        }
      },
      errorValidateTaskSchema: (incomingUser: any):  Joi.ValidationError | undefined => {
        let taskValidationError = TaskSchema.validate(incomingUser).error
        if (!taskValidationError) {
            return
        }
        return taskValidationError;
    },
}
