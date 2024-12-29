import { Product } from '../../../types/Product';
import { ProductRepositoryInterface, FindProductTypes } from '../../../domain/ProductRepository';
import { errors } from '../../../responses/errors';

const exampleProduct: Product = {
  id: '1',
  name: 'Bicycle A-125',
  description:
    'This bicycle is designed for road riding, offering a smooth and efficient ride on paved surfaces. It features lightweight materials and aerodynamic design to enhance speed and performance, making it ideal for long-distance rides and competitive cycling.',
  type: 'Bicycle',
  basePrice: 1000,
  inStock: true,
  imageUrl: 'https://placehold.co/600x400',
  creationDate: new Date(),
};

const findProduct = async ({ id }: { id: Product['id'] }): Promise<FindProductTypes> => {
  if (id === exampleProduct.id) {
    return { success: true, data: exampleProduct };
  }
  return {
    success: false,
    error: errors.NotFoundError,
  };
};

const findProductWithDetails = async ({ id }: { id: Product['id'] }): Promise<FindProductTypes> => {
  if (id === exampleProduct.id) {
    return { success: true, data: exampleProduct };
  }
  return { success: false, error: errors.NotFoundError };
};

export const productRepository: ProductRepositoryInterface = {
  findProduct,
  findProductWithDetails,
};
