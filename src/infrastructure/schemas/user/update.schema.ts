import Joi from "joi";

export const updateSchema = Joi.object({
  name: Joi.string().label("Name").messages({
    "string.empty": "El nombre es requerido",
  }),
  email: Joi.string().email().label("Email").messages({
    "string.empty": "El email es requerido",
    "string.email": "El email debe ser un email válido",
  }),
  password: Joi.string().label("Password").messages({
    "string.empty": "El password es requerido",
  }),

  createdAt: Joi.date().label("Created At"),
  updatedAt: Joi.date().label("Updated At"),
  user: Joi.object().label("User"),
});
