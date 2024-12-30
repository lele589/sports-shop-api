enum ProductType {
  Bicycle = 'bicycle',
  Other = 'other',
}

export interface Product {
  id: number;
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
  id: number;
  name: string;
  options: PartOption[];
}

interface PartOption {
  id: number;
  name: string;
  additionalPrice: number;
  stock: number;
}

interface OptionsDependencies {
  optionId: number;
  disallowedOptionIds: number[];
}
