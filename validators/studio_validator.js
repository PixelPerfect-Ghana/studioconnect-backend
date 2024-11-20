import Joi from "joi";

export const addStudioValidator = Joi.object({
  title: Joi.string().required().messages({
    "string.empty": "Title is required",
    "any.required": "Title is required",
  }),
  icon: Joi.string().required().messages({
    "string.empty": "Icon (file) is required",
    "any.required": "Icon (file) is required",
  }),
  description: Joi.string().required().trim().messages({
    "string.empty": "Description is required",
    "any.required": "Description is required",
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
});

export const updateStudioValidator = Joi.object({
  title: Joi.string().optional(),
  icon: Joi.string().optional(),
  description: Joi.string().optional().trim(),
  price: Joi.number().optional(),
  category: Joi.string().optional(),
  location: Joi.string().optional().trim().messages({
    "string.empty": "Location is required",
    "any.required": "Location is required",
  }),
  googleId: Joi.string().optional(),
  facebookId: Joi.string().optional(),
  phone: Joi.string().optional(),
  email: Joi.string().email().optional(),
  website: Joi.string().optional().uri().messages({
    "string.uri": "Website must be a valid URL",
  }),
  status: Joi.string().valid("pending", "approved", "rejected").optional(),
  sessions: Joi.array()
    .items(
      Joi.object({
        date: Joi.date().required().messages({
          "date.base": "Session date must be a valid date",
          "any.required": "Session date is required",
        }),
        time: Joi.string().required().messages({
          "string.empty": "Session time is required",
          "any.required": "Session time is required",
        }),
        location: Joi.string().required().messages({
          "string.empty": "Session location is required",
          "any.required": "Session location is required",
        }),
        clients: Joi.array()
          .items(
            Joi.object({
              name: Joi.string().required().messages({
                "string.empty": "Client name is required",
                "any.required": "Client name is required",
              }),
              phone: Joi.string().required().messages({
                "string.empty": "Client phone is required",
                "any.required": "Client phone is required",
              }),
            })
          )
          .optional(),
      })
    )
    .optional(),
  payment: Joi.object({
    method: Joi.string().optional(),
    date: Joi.date().optional(),
    amount: Joi.number().optional(),
    balance: Joi.number().optional(),
  }).optional(),
  images: Joi.array().items(Joi.string()),
});

export const deleteStudioValidator = Joi.object({
  title: Joi.string().required(),
  completed: Joi.boolean(),
  icon: Joi.string().required(),
});
