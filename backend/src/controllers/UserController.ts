import {Request, Response} from "express";
import User from "../models/User";
import {UserSchema} from "../shared/schemaValidator";
import RequestResponseMappings from "../shared/responseMapping";
import UserController from "../controllers/UserController"
import jsonwebtoken from 'jsonwebtoken';
import Joi from "joi";
import bcrypt from 'bcrypt';

interface _User {
    email: string;
    password: string;
}

export default {
    getUser: async (req: Request, res: Response) => {
        let user;
        try {
            user = await User.findOne({email: req.query.email});
            return RequestResponseMappings.sendSuccessMessage(res, user);
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
                    password: bcrypt.hashSync(req.body.user.password, 10)
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
        return RequestResponseMappings.sendErrorMessage(res)
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
                {email: user.email, password: user.password},
                'secretKey'),
            user: user
        })
    },
}
