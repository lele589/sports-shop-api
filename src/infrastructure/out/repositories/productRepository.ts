import { CreateProductTypes, FindProductTypes } from '../../../domain/ProductRepository';
import { errors } from '../../../responses/errors';
import { Product } from '../../../types/Product';
import db from '../clients/db';
import { getLastInsertId } from './utils';

const findProduct = async ({ id }: { id: Product['id'] }): Promise<FindProductTypes> => {
  try {
    const product = await db('products').select('*').where({ id }).first();

    if (!product) {
      return { success: false, error: errors.NotFoundError };
    }

    const parts = await db('parts')
      .select('*')
      .innerJoin('product_parts', 'parts.id', 'product_parts.partId')
      .where('product_parts.productId', id);

    for (const part of parts) {
      const options = await db('options')
        .select('*')
        .innerJoin('part_options', 'options.id', 'part_options.optionId')
        .where('part_options.partId', part.id);

      part.options = options;
    }

    const dependencies = await db('dependencies').select('*').where({ productId: id });

    return { success: true, data: { ...product, parts, dependencies } };
  } catch {
    return { success: false, error: errors.InternalServerError };
  }
};

const createProduct = async ({ product }: { product: Product }): Promise<CreateProductTypes> => {
  try {
    const existingProduct = await db('products').select('*').where({ name: product.name }).first();
    if (existingProduct) {
      return { success: false, error: errors.ConflictError };
    }

    await db.transaction(async (trx) => {
      await trx('products').insert({
        name: product.name,
        description: product.description,
        type: product.type,
        basePrice: product.basePrice,
        stock: product.stock,
        imageUrl: product.imageUrl,
        creationDate: new Date(),
      });

      const createdProductId = await getLastInsertId(trx);

      for (const part of product.parts) {
        await trx('parts').insert({ name: part.name });
        const createdPartId = await getLastInsertId(trx);

        await trx('product_parts').insert({
          productId: createdProductId,
          partId: createdPartId,
        });

        for (const option of part.options) {
          await trx('options').insert({
            name: option.name,
            additionalPrice: option.additionalPrice,
            stock: option.stock,
          });
          const createdOptionId = await getLastInsertId(trx);

          await trx('part_options').insert({
            partId: createdPartId,
            optionId: createdOptionId,
          });
        }
      }
    });

    return { success: true, data: product };
  } catch {
    return { success: false, error: errors.InternalServerError };
  }
};

export const productRepository = {
  findProduct,
  createProduct,
};
