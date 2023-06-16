import Joi from "joi";

export const UserSchema = Joi.object({
    name: Joi
    .string().required().min(2).max(50),
    password: Joi
        .string().required().min(5).max(20),
    email: Joi.string().email().required(),
})