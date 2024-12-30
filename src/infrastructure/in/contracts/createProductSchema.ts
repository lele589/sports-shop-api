import Joi from 'joi';

export const createProductSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  type: Joi.string().required(),
  basePrice: Joi.number().required(),
  stock: Joi.number().required(),
  imageUrl: Joi.string().required(),
  parts: Joi.array().items(
    Joi.object({
      name: Joi.string().required(),
      options: Joi.array()
        .items(
          Joi.object({
            name: Joi.string().required(),
            additionalPrice: Joi.number().required(),
            stock: Joi.number().required(),
          }),
        )
        .required(),
    }),
  ),
}).required();
