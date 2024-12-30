import { Router } from 'express';
import { productController } from './productController';

const router = Router();

router.get('/product/:id', productController.findProductById);
router.get('/product/details/:id', productController.findProductDetailsById);

export default router;
