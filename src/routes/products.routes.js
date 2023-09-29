import { Router } from "express";
import { authJwt } from "../middlewares/index";
import * as productCtrl from '../controllers/products.controller';


const router = Router();

router.post('/', [authJwt.verifyTokenAndRole,authJwt.isAdmin], productCtrl.createProduct);

router.get('/', productCtrl.getProduct);

router.get('/:productId', productCtrl.getProductById);

router.put('/:productId', authJwt.verifyToken, productCtrl.updateProduct);

router.delete('/:productId', authJwt.verifyToken, productCtrl.deleteProduct);

export default router;