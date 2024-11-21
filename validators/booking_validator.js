import Joi from "joi";

export const createBookingValidator = Joi.object({
  date: Joi.date().required().messages({
    "any.required": "Booking date is required",
    "date.base": "Invalid date format",
  }),
  startTime: Joi.string().required().messages({
    "any.required": "Start time is required",
    "string.base": "Start time must be a string",
  }),
  endTime: Joi.string().optional().messages({
    "string.base": "End time must be a string",
  }),
  additionalInformation: Joi.string().optional().allow("").messages({
    "string.base": "Additional information must be a string",
  }),

  studio: Joi.string().required().messages({
    "any.required": "Studio is required",
    "string.base": "Studio must be a string",
  }),
});

export const updateStatusValidator = Joi.object({
  status: Joi.string()
    .valid("pending", "confirmed", "cancelled")
    .required()
    .messages({
      "any.required": "Status is required",
      "any.only":
        "Status must be one of 'pending', 'confirmed', or 'cancelled'",
    }),
});

export const updateBookingValidator = Joi.object({
  date: Joi.date().optional(),
  startTime: Joi.string().optional(),
  endTime: Joi.string().optional(),
  additionalInformation: Joi.string().max(500).optional(),
});
