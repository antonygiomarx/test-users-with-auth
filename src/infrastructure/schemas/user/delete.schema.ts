import Joi from "joi";

export const deleteSchema = Joi.string().required().label("ID").messages({
  "string.empty": "El ID es requerido",
});
