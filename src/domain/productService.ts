import { Product } from '../types/Product';
import { ResultType } from '../types/ResultType';
import { ProductRepositoryInterface } from './ProductRepository';

// Types
type FindProductByIdType = (
  { productId }: { productId: Product['id'] },
  { productRepository }: { productRepository: ProductRepositoryInterface },
) => Promise<ResultType<Product>>;

type CreateProductType = (
  { product }: { product: Product },
  { productRepository }: { productRepository: ProductRepositoryInterface },
) => Promise<ResultType<Product>>;

// Methods
const findProductById: FindProductByIdType = ({ productId }, { productRepository }) => {
  return productRepository.findProduct({ id: productId });
};

const createProduct: CreateProductType = ({ product }, { productRepository }) => {
  return productRepository.createProduct({ product });
};

export const productService = {
  findProductById,
  createProduct,
};
