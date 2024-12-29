import { ProductRepositoryInterface } from '../../domain/ProductRepository';
import { productService } from '../../domain/productService';
import { errors } from '../../responses/errors';

export const findProductDetailsByIdQuery = async (
  { productId }: { productId: string },
  { productRepository }: { productRepository: ProductRepositoryInterface },
) => {
  try {
    const product = await productService.findProductById(
      { productId, withDetails: true },
      { productRepository },
    );
    if (!product) {
      return { success: false, error: errors.NotFoundError };
    }
    return { success: true, data: product };
  } catch {
    return { success: false, error: errors.UnexpectedError };
  }
};
