import { ProductRepositoryInterface } from '../../domain/ProductRepository';
import { productService } from '../../domain/productService';
import { errors } from '../../responses/errors';

export const findProductByIdQuery = async (
  { productId }: { productId: number },
  { productRepository }: { productRepository: ProductRepositoryInterface },
) => {
  try {
    const product = await productService.findProductById({ productId }, { productRepository });
    if (!product) {
      return { success: false, error: errors.NotFoundError };
    }
    return { success: true, data: product };
  } catch {
    return { success: false, error: errors.UnexpectedError };
  }
};
