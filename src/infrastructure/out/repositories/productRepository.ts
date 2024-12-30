  FindProductTypes,
import { errors } from '../../../responses/errors';
import { Product } from '../../../types/Product';
import db from '../clients/db';

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
};

export const productRepository: ProductRepositoryInterface = {
  findProduct,
  findProductWithDetails,
};
