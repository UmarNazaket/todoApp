import express, {Express} from 'express';
import AuthenticationMiddleware from "../shared/middleware/authentication";
import UserController from '../controllers/UserController';

const userRouter: Express = express();

userRouter.post('/register', UserController.register);
userRouter.post('/login', UserController.loginUser);
userRouter.get('/getusers',AuthenticationMiddleware.isAuthentication, UserController.getUsers);

export default userRouter;