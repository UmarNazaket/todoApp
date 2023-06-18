import express, {Express} from 'express';
import AuthenticationMiddleware from "../shared/middleware/authentication";
import UserController from '../controllers/UserController';

const userRouter: Express = express();

userRouter.post('/register', UserController.register);
userRouter.post('/login', UserController.loginUser);
userRouter.get('/getuser',AuthenticationMiddleware.isAuthentication, UserController.getUser);

export default userRouter;