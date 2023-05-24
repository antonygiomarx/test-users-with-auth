import Joi from "joi";

const loginSchema = Joi.object({
  email: Joi.string().email().required().label("Email").messages({
    "string.empty": "El email es requerido",
    "string.email": "El email debe ser un email válido",
  }),
  password: Joi.string().required().label("Password").messages({
    "string.empty": "El password es requerido",
  }),
});

export { loginSchema };
