import Joi from 'joi';

export const findProductByIdSchema = Joi.object({
  id: Joi.string().required(),
}).required();
