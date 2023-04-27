import { Router } from 'express';
import CartManager from '../persist/daos/mongoManag/CartsManager.js';

const router = Router();

const cartManager = new CartManager();

router.post('/', async (request, response) => {
    const addedCart = await cartManager.addCart();
    response.json({ message: `The cart has been successfully created with the ID ${addedCart._id}.` })
});

router.get('/:cartId', async (request, response) => {
    const { cartId } = request.params;
    const cart = await cartManager.getProductsFromCart(cartId);
    if (cart) {
        response.json({ message: 'cart found.', cart: cart })
    } else {
        response.json({ message: 'Cart not found at the moment.' })
    }
});

router.post('/:cartId/products/:productId', async (request, response) => {
    const { cartId, productId } = request.params;
    const addedProduct = await cartManager.addProductToCart(cartId, productId);
    if (addedProduct) {
        response.json({ message: 'The Product has been added to the cart successfully.', product: addedProduct })
    } else {
        response.json({ message: 'The Product could not be added to the cart.' })
    }
});

router.delete('/:cartId/products/:productId', async (request, response) => {
    const { cartId, productId } = request.params;
    const cart = await cartManager.deleteProductInCart(cartId, productId);
    if (cart) {
        response.json({ message: 'The Product has been added to the cart successfully.', cart: cart })
    } else {
        response.json({ message: 'The Product could not be added to the cart.' })
    }
});

router.put('/:cartId', async (request, response) => {
    const { cartId } = request.params;
    const products = request.body;
    const cart = await cartManager.replaceProductsInCart(cartId, products);
    if (cart) {
        response.json({ message: 'Cart Products have been updated successfully.', cart: cart })
    } else {
        response.json({ message: 'Could not update Cart Products.' })
    }
});

router.put('/:cartId/products/:productId', async (request, response) => {
    const { cartId, productId } = request.params;
    const { quantity } = request.body;
    const cart = await cartManager.updateProductInCart(cartId, productId, quantity);
    if (cart) {
        response.json({ message: 'The quantity of the Product in the cart has been updated correctly.', cart: cart })
    } else {
        response.json({ message: 'Could not update the quantity of the Product in the cart.' })
    }
});

router.delete('/:cartId', async (request, response) => {
    const { cartId } = request.params;
    const cart = await cartManager.emptyCart(cartId);
    if (cart) {
        response.json({ message: 'The cart has been emptied successfully.', cart: cart })
    } else {
        response.json({ message: 'The cart could not be emptied.' })
    }
});

export default router;