import { Product } from '../types/Product';
import { ResultType } from '../types/ResultType';
import { ProductRepositoryInterface } from './ProductRepository';

type FindProductByIdType = (
  { productId, withDetails }: { productId: Product['id']; withDetails: boolean },
  { productRepository }: { productRepository: ProductRepositoryInterface },
) => Promise<ResultType<Product>>;

const findProductById: FindProductByIdType = (
  { productId, withDetails },
  { productRepository },
) => {
  if (withDetails) {
    return productRepository.findProductWithDetails({ id: productId });
  }
  return productRepository.findProduct({ id: productId });
};

export const productService = {
  findProductById,
};
