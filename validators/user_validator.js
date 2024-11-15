import Joi from "joi";
export const registerUserValidator = Joi.object({
    Name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    role:Joi.string().valid('user','vendor')
});
export const loginUserValidator = Joi.object({
    // name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    role:Joi.string().valid('user','vendor')
});


export const updateProfileValidator = Joi.object ({
name: Joi.string(),
avatar: Joi.string(),
});