import { Router } from 'express'
import { deleteProductFromCart, getAllCarts, getCartById, postCart, updateCart, addProduct, deleteCart, purchase } from '../controllers/cart.controller.js'
import { passportError } from '../config/middlewares/passportError.js';
import { roleValidation } from '../config/middlewares/roleValidation.js';

const router = Router()

router.get('/', getAllCarts);

router.get('/:cid', getCartById);

router.post('/', postCart);

router.put('/:cid/products/:pid', updateCart);

router.post('/:cid/products/:pid', addProduct);

router.delete('/:cid/products/:pid', deleteProductFromCart);

router.delete('/:cid', deleteCart);

router.post("/:cid/purchase", purchase)

export default router; 