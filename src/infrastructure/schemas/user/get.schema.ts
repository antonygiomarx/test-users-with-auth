import Joi from "joi";

export const getSchema = Joi.string().required().label("ID").messages({
  "string.empty": "El ID es requerido",
});
