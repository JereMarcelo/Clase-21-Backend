import { Router } from 'express'
import { getAllProducts, getProductById, postProduct, putProduct, deleteProduct } from '../controllers/product.controllers.js'
const router = Router()

router.get("/", getAllProducts);

router.get('/:pid', getProductById);

router.post('/', postProduct);

router.put('/:pid', putProduct);

router.delete('/:pid', deleteProduct);

export default router;