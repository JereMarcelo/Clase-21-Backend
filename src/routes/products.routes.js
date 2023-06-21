import { Router } from 'express'
import { getAllProducts, getProductById, postProduct, putProduct, deleteProduct } from '../controllers/product.controllers.js'
import { passportError } from '../config/middlewares/passportError.js';
import { roleValidation } from '../config/middlewares/roleValidation.js';

const router = Router();

router.post('/', passportError("jwt"), roleValidation(["admin", "premium"]), postProduct);
router.delete('/:pid', passportError("jwt"), roleValidation(["admin", "premium"]), deleteProduct);

router.get("/", getAllProducts);

router.get('/:pid', getProductById);

router.post('/', postProduct);

router.put('/:pid', putProduct);

router.delete('/:pid', deleteProduct);

export default router;