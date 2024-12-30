enum ProductType {
  Bicycle = 'bicycle',
  Other = 'other',
}

export interface Product {
  id: string;
  name: string;
  description: string;
  type: ProductType;
  basePrice: number;
  stock: number;
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
  stock: number;
}

interface OptionsDependencies {
  optionId: string;
  disallowedOptionIds: string[];
}
