import Joi from "joi";

export const studioSchema = Joi.object;
export const addStudioValidator = Joi.object({
    title: Joi.string().required(),
    icon: Joi.string().required()
}).unknown()

export const updateStudioValidator = Joi.object({
    title: Joi.string().required(),
    icon: Joi.string().required()
});

export const deleteStudioValidator = Joi.object({
    title: Joi.string().required(),
    completed: Joi.boolean(),
    icon: Joi.string().required()
});