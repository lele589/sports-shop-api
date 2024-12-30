import { Request, Response } from 'express';
import { Product } from '../../types/Product';
import { findProductByIdQuery } from '../../application/queries/findProductByIdQuery';
import { productRepository } from '../out/repositories/productRepository';

const findProductById = async (
  req: Request<{ id: Product['id'] }>,
  res: Response,
): Promise<void> => {
  try {
    const productId = req.params.id;
    const result = await findProductByIdQuery({ productId }, { productRepository });

    if (result.error) {
      res.status(result.error.code).json({ message: result.error.message });
    } else {
      res.status(200).json(result.data);
    }
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

export const productController = {
  findProductById,
};
