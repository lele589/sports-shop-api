type ProductType = 'bicycle' | 'other';

export interface Product {
  id: string;
  name: string;
  description: string;
  type: ProductType;
  basePrice: number;
  inStock: boolean;
  creationDate: Date;
  parts: Part[];
  imageUrl: string;
  dependencies: OptionsDependencies[];
}

interface Part {
  id: string;
  name: string;
  options: PartOption[];
}

interface PartOption {
  id: string;
  name: string;
  additionalPrice: number;
  available: boolean;
}

interface OptionsDependencies {
  optionId: string;
  disallowedOptionIds: string[];
}
