export type ProductType = 'Bicycle' | 'OtherType';

export interface Product {
  id: string;
  name: string;
  description: string;
  type: ProductType;
  basePrice: number;
  inStock: boolean;
  imageUrl: string;
  creationDate: Date;
}
