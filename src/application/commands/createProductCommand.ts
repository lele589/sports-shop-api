import { ProductRepositoryInterface } from '../../domain/ProductRepository';
import { productService } from '../../domain/productService';
import { ERRORS } from '../../responses/errors';
import { Product } from '../../types/interfaces';

export const createProductCommand = async (
  { product }: { product: Product },
  { productRepository }: { productRepository: ProductRepositoryInterface },
) => {
  try {
    const createdProduct = await productService.createProduct({ product }, { productRepository });
    if (!createdProduct) {
      return { success: false, error: ERRORS.NotFoundError };
    }

    return { success: true, data: createdProduct };
  } catch {
    return { success: false, error: ERRORS.UnexpectedError };
  }
};
