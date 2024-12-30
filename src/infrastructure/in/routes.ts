import { Router } from 'express';
import { productController } from './productController';

const router = Router();

router.get('/product/:id', productController.findProductById);
router.post('/product', productController.createProduct);

export default router;
