import { ProductRepositoryInterface } from '../../domain/ProductRepository';
import { productService } from '../../domain/productService';
import { ERRORS } from '../../responses/errors';
import { Product } from '../../types/interfaces';

export const findProductByIdQuery = async (
  { productId }: { productId: Product['id'] },
  { productRepository }: { productRepository: ProductRepositoryInterface },
) => {
  try {
    const product = await productService.findProductById({ productId }, { productRepository });
    if (!product) {
      return { success: false, error: ERRORS.NotFoundError };
    }
    return { success: true, data: product };
  } catch {
    return { success: false, error: ERRORS.UnexpectedError };
  }
};
