import express, {Express} from 'express';
import AuthenticationMiddleware from "../shared/middleware/authentication";
import UserController from '../controllers/UserController';

const userRouter: Express = express();

userRouter.post('/register',AuthenticationMiddleware.isAuthentication, UserController.register)
userRouter.post('/login',AuthenticationMiddleware.isAuthentication, UserController.loginUser)
userRouter.post('/getuser',AuthenticationMiddleware.isAuthentication, UserController.getUser)

export default userRouter;