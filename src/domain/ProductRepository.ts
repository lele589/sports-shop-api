import { Product } from '../types/Product';
import { ResultType } from '../types/ResultType';

export type FindProductTypes = ResultType<Product>;
export type CreateProductTypes = ResultType<Product>;

export interface ProductRepositoryInterface {
  findProduct({ id }: { id: Product['id'] }): Promise<FindProductTypes>;
  createProduct({ product }: { product: Product }): Promise<CreateProductTypes>;
}
