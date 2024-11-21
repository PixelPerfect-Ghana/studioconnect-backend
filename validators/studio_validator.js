import Joi from "joi";

export const addStudioValidator = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Name is required",
    "any.required": "Name is required",
  }),
  icon: Joi.string().required().messages({
    "string.empty": "Icon (file) is required",
    "any.required": "Icon (file) is required",
  }),
  price: Joi.number().required().messages({
    "number.base": "Price must be a number",
    "any.required": "Price is required",
  }),
  location: Joi.string().required().trim().messages({
    "string.empty": "Location is required",
    "any.required": "Location is required",
  }),
  phone: Joi.string().required().messages({
    "string.empty": "Phone is required",
    "any.required": "Phone is required",
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Email must be a valid email address",
    "any.required": "Email is required",
  }),
  category: Joi.string(),
  description: Joi.string().optional().trim(),
});

export const updateStudioValidator = Joi.object({
  name: Joi.string().optional(),
  icon: Joi.string().optional(),
  description: Joi.string().optional().trim(),
  price: Joi.number().optional(),
  category: Joi.string().optional(),
  location: Joi.string().optional().trim(),
  phone: Joi.string().optional(),
  email: Joi.string().email().optional(),
  website: Joi.string().optional().uri().messages({
    "string.uri": "Website must be a valid URL",
  }),
  paymentMethods: Joi.array().items(Joi.string()).optional(),
  images: Joi.array().items(Joi.string()),
  socials: Joi.object({
    facebook: Joi.string().optional().uri(),
    instagram: Joi.string().optional().uri(),
    twitter: Joi.string().optional().uri(),
  }),
});
