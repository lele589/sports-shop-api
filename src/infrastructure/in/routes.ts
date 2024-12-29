import { Router } from 'express';
import { productController } from './productController';

const router = Router();

router.get('/product/details/:id', productController.findProductDetailsById);

export default router;
