import { Product } from '../types/Product';
import { ResultType } from '../types/ResultType';

export type FindProductTypes = ResultType<Product>;

export interface ProductRepositoryInterface {
  findProduct({ id }: { id: Product['id'] }): Promise<FindProductTypes>;
  findProductWithDetails({ id }: { id: Product['id'] }): Promise<FindProductTypes>;
}
