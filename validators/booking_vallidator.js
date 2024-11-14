import Joi from "joi";
 export const bookingSchema= Joi.object;
 export const createBookingsValidator = Joi.object({
    title: Joi.string().required(),
    icon: Joi.string().required()
});
