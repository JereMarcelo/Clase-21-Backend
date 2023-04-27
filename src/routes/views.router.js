import { Router } from 'express';
import CartManager from '../persist/daos/mongoManag/CartsManager.js';
import ProductManager from '../persist/daos/mongoManag/ProductsManager.js';
import route from './usuarios.router.js';
import { authenticated } from "../utils/auth.js"

const router = Router();

const productManager = new ProductManager();


router.get('/', async (request, response) => {
    const results = await productManager.getProducts(request.query);
    const products = (results.payload).map(product => {
        return {
            id: product._id,
            title: product.title,
            description: product.description,
            price: product.price,
            thumbnail: product.thumbnail,
            code: product.code,
            stock: product.stock,
            category: product.category,
            status: product.status
        }
    });
    response.render('home', { products })
});

router.get('/realTimeProducts', (request, response) => {
    response.render('realTimeProducts')
});

router.get('/products', async (request, response) => {
    const results = await productManager.getProducts(request.query);
    if (results.prevLink) {
        results.prevLink = (results.prevLink).replace('api', 'views')
    }
    if (results.nextLink) {
        results.nextLink = (results.nextLink).replace('api', 'views')
    }
    const products = (results.payload).map(product => {
        return {
            id: product._id.toString(),
            title: product.title,
            description: product.description,
            price: product.price,
            thumbnail: product.thumbnail,
            code: product.code,
            stock: product.stock,
            category: product.category,
            status: product.status
        }
    });
    response.render('products', { products, results })
});

router.get('/carts/:cartId', async (request, response) => {


});

router.get('/register', (req, res) => {
    const email = req.session.user;
    if (email) {
        return res.redirect('/perfil');
    }
    res.render('register', {
        style: 'style',
    });
});

router.get("/login", (req, res) => {
    const email = req.session.user;
    if (email) {
        return res.redirect('/perfil');
    }
    res.render('login');
});

router.get('/perfil', authenticated, async (req, res) => {
    const user = req.session.user = req.user;


    res.render('perfil', {
        nombre: user.nombre,
        apellido: user.apellido,
        edad: user.edad,
        email: user.email,
    });
});

route.get('/forgot-password', async (req, res) => {
    res.render('forgot-password');
});


export default router;