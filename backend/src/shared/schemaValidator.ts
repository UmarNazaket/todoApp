import Joi from "joi";

export const UserSchema = Joi.object({
    name: Joi
    .string().required().min(2).max(50),
    password: Joi
        .string().required().min(5).max(20),
    email: Joi.string().email().required(),
})

export const TaskSchema = Joi.object({
    title: Joi
    .string().required().min(2).max(50),
    description: Joi
        .string().required().min(2).max(300),
    priority: Joi.string().required(),
    dueDate: Joi.string().isoDate().required(),
    status: Joi.string().required()
})