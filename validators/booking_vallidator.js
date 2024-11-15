import Joi from "joi";
 export const bookingSchema= Joi.object;
 export const createBookingsValidator = Joi.object({
    Name: Joi.string().required(),
    // icon: Joi.string().required()
    bookingDate:Joi.string().required(),
});
