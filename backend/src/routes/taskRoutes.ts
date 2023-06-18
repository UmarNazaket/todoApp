import express, {Express} from 'express';
import AuthenticationMiddleware from "../shared/middleware/authentication";
import TaskController from '../controllers/TaskController';

const taskRoutes: Express = express();

taskRoutes.get('/gettask',AuthenticationMiddleware.isAuthentication, TaskController.getTasks);
taskRoutes.post('/addtask',AuthenticationMiddleware.isAuthentication, TaskController.addTask);
taskRoutes.delete('/deletetask',AuthenticationMiddleware.isAuthentication, TaskController.deleteTask);
taskRoutes.put('/updatetask',AuthenticationMiddleware.isAuthentication, TaskController.updateTask);

export default taskRoutes;