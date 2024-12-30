import { CreateProductTypes, FindProductTypes } from '../../../domain/ProductRepository';
import { ERRORS } from '../../../responses/errors';
import { Product } from '../../../types/interfaces';
import db from '../clients/db';
import { getLastInsertId } from './utils';

const findProduct = async ({ id }: { id: Product['id'] }): Promise<FindProductTypes> => {
  try {
    const product = await db('products')
      .select('id', 'name', 'description', 'type', 'basePrice', 'stock', 'imageUrl')
      .where({ id })
      .first();

    if (!product) {
      return { success: false, error: ERRORS.NotFoundError };
    }

    const parts = await db('parts')
      .select('id', 'name')
      .innerJoin('product_parts', 'parts.id', 'product_parts.partId')
      .where('product_parts.productId', id);

    const dependencies = await db('dependencies').select('optionId', 'disallowedOptionId');
    const filteredDependencies = [];

    for (const part of parts) {
      const options = await db('options')
        .select('id', 'name', 'additionalPrice', 'stock')
        .innerJoin('part_options', 'options.id', 'part_options.optionId')
        .where('part_options.partId', part.id);

      part.options = options;

      for (const option of options) {
        filteredDependencies.push(
          dependencies.filter((dependency) => dependency.optionId === option.id),
        );
      }
    }

    return { success: true, data: { ...product, parts, dependencies } };
  } catch {
    return { success: false, error: ERRORS.InternalServerError };
  }
};

const createProduct = async ({ product }: { product: Product }): Promise<CreateProductTypes> => {
  try {
    const existingProduct = await db('products').select('*').where({ name: product.name }).first();
    if (existingProduct) {
      return { success: false, error: ERRORS.ConflictError };
    }

    await db.transaction(async (trx) => {
      await trx('products').insert({
        name: product.name,
        description: product.description,
        type: product.type,
        basePrice: product.basePrice,
        stock: product.stock,
        imageUrl: product.imageUrl,
        creationDate: new Date().toISOString(),
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
    return { success: false, error: ERRORS.InternalServerError };
  }
};

export const productRepository = {
  findProduct,
  createProduct,
};
