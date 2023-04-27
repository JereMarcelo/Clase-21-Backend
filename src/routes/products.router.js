import { Router } from 'express';
import ProductManager from '../persist/daos/mongoManag/ProductsManager.js';

const router = Router();

const productManager = new ProductManager();

router.get('/', async (request, response) => {
    const results = await productManager.getProducts(request.query);
    if (results) {
        response.json({ message: 'Products that were found.', results })
    } else {
        response.json({ message: 'There are no products available at the moment.' })
    }
});

router.get('/:productId', async (request, response) => {
    const { productId } = request.params;
    const productFound = await productManager.getProductById(productId);
    if (productFound) {
        response.json({ message: 'product found.', product: productFound })
    } else {
        response.json({ message: 'Product not found at the moment.' })
    }
});

router.post('/', async (request, response) => {
    const newProduct = request.body;
    const addedProduct = await productManager.addProduct(newProduct);
    if (addedProduct) {
        response.json({ message: 'The product was added successfully.', product: addedProduct })
    } else {
        response.json({ message: 'The product could not be added.' })
    }
});

router.put('/:productId', async (request, response) => {
    const { productId } = request.params;
    const newValuesObject = request.body;
    const updatedProduct = await productManager.updateProduct(productId, newValuesObject);
    if (updatedProduct) {
        response.json({ message: 'The product was updated successfully.', product: updatedProduct })
    } else {
        response.json({ message: 'The product could not be updated.' })  
    }    
});

router.delete('/:productId', async (request, response) => {
    const { productId } = request.params;
    const deletedProduct = await productManager.deleteProduct(productId);
    if (deletedProduct) {
        response.json({ message: 'The product was deleted successfully.', product: deletedProduct })
    } else {
        response.json({ message: 'The product could not be deleted.' })
    }
});

export default router;