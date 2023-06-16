import express, {Express} from 'express';
import AuthenticationMiddleware from "../shared/middleware/authentication";

const taskRoutes: Express = express();

taskRoutes.get('/task',AuthenticationMiddleware.isAuthentication)

export default taskRoutes;