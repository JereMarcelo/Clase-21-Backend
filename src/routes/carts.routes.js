import { Router } from 'express'
import { deleteProductFromCart, getAllCarts, getCartById, postCart, updateCart, updateQuantity, deleteCart } from '../controllers/cart.controller.js'

const router = Router()

router.get('/', getAllCarts);

router.get('/:cid', getCartById);

router.post('/', postCart);

router.put('/:cid', updateCart);

router.put('/:cid/products/:pid', updateQuantity);

router.delete('/:cid/products/:pid', deleteProductFromCart);

router.delete('/:cid', deleteCart);

export default router; 