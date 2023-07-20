import {Request, Response} from "express";
import User from "../models/User";
import {UserSchema} from "../shared/schemaValidator";
import RequestResponseMappings from "../shared/responseMapping";
import UserController from "../controllers/UserController"
import jsonwebtoken from 'jsonwebtoken';
import Joi from "joi";
import bcrypt from 'bcrypt';
require('dotenv').config();

interface _User {
    isAdmin: boolean;
    email: string;
    password: string;
}

export default {
    getUsers: async (req: Request, res: Response) => {
        let users;
        try {
            users = await User.find();
            return RequestResponseMappings.sendSuccessMessage(res, users);
          } catch (error) {
            console.error('Error retrieving user:', error);
            return RequestResponseMappings.sendErrorMessage(res, "Couldn't find user")
          }
    },
    register: async (req: Request, res: Response) => {
        try {
            let userValidationError: Joi.ValidationError | undefined = UserController.errorValidateUserSchema(req.body.user)
            if (userValidationError && "detail" in userValidationError) {
                return RequestResponseMappings
                    .sendErrorMessage(
                        res,
                        userValidationError.details
                    )
            }
            let user = await User.create(
                {
                    name: req.body.user.name,
                    email: req.body.user.email,
                    password: bcrypt.hashSync(req.body.user.password, 10),
                    isAdmin: req.body.user.isAdmin || false
                });
            await user.save();
            return UserController.sendTokenWithPayload(res, user);
        }catch (e:any) {
            return RequestResponseMappings.sendErrorMessage(res,{},e.message)
        }
    },
    loginUser: async (req: Request, res: Response) => {
        let user = await User.findOne({email: req.body.user.email});
        if (user && bcrypt.compareSync(req.body.user.password, user.password)) {
            return UserController.sendTokenWithPayload(res, user);
        }
        return RequestResponseMappings.sendErrorMessage(res, {message: 'Incorrect email or password'})
    },
    errorValidateUserSchema: (incomingUser: any):  Joi.ValidationError | undefined => {
        let userValidationError = UserSchema.validate(incomingUser).error
        if (!userValidationError) {
            return
        }
        return userValidationError;
    },
    sendTokenWithPayload: (res: Response, user: _User) => {
        return RequestResponseMappings.sendSuccessMessage(res, {
            token: jsonwebtoken.sign(
                {email: user.email, password: user.password, isAdmin: user.isAdmin || false},
                process.env.JWT_SECRET_KEY!),
            user: user
        })
    },
}
