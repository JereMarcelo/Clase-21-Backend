import { Router } from 'express';
import productDao from '../dao/productDao.js';
import { authenticated } from '../utils/auth.js';
import viewController from '../controllers/view.controller.js';
const router = Router();


router.get('/', async (req, res) => {
    let limit = parseInt(req.query.limit);
    let query = req.query.query || null
    let sort = parseInt(req.query.sort)
    let page = parseInt(req.query.page)
    

    try {
            let result = await productDao.getProducts(limit, JSON.parse(query), sort, page)
            res.render('products', { result, user })
            } catch (error) {
            res.json({ message: 'Error, check data' })
        }
    })


    router.get('/products', authenticated, async (req, res) => {
        let limit = parseInt(req.query.limit);
        let query = req.query.query || null
        let sort = parseInt(req.query.sort)
        let page = parseInt(req.query.page)
        let user = req.user

        try {
            let result = await productDao.getProducts(limit, JSON.parse(query), sort, page)
            res.render('products', { result, user })
            } catch (error) {
            res.json({ message: 'Error, check data' })
            }
        })
    
    router.get('/products/:pid', async (req, res) => {
        const pid = (req.params.pid)
        try {
            let result = await productDao.getProductById(pid)
            console.log(result)
            res.render('product-id', { result })
        } catch (error) {
            res.json({ error })
        }
    })
    
    router.get('/carts', async (req, res) => {
        try {
            let cart = await cartDao.getCarts();
            res.render('cart', { cart })
        } catch (error) {
                res.json({ error })
        }
    })

    router.get('/carts', viewController.cartsId );
    
    router.get('/carts/:cid', async (req, res) => {
        const cid = (req.params.cid)
        try {
            let result = await cartDao.getCartById(cid)
            console.log(result.products)
            res.render('cart', { result })
        } catch (error) {
            res.json({ error })
        }
    })
    
    
    router.get('/register', (req, res) => {
        const email = req.session.user;
        if (email) {
            return res.redirect('/perfil');
        }
        res.render('register', {
            style: 'style',
        });
    });
    
    router.get('/users/:id', async (req, res, next) => {
    
        try {
            const id = req.params.id;
    
            const user = await userModel.findOne({ _id: id });
            if (!user) {
            res
                .status(404)
                .send({ error: `Usuario con id ${idUsuario} no encontrado` });
            return;
            }
            res.render("viewUsuario", user);
        } catch (error) {
            next(error);
        }
    
    });
    
    router.get('/mensaje', (req, res) => {
        res.render('mensaje');
    });
    
    router.get('/login', (req, res) => {
        const email = req.session.user;
        if (email) {
            return res.redirect('/perfil');
        }
        res.render('login');
    });
    
    router.get('/perfil', authenticated, async (req, res) => {
        const user = req.session.user = req.user
        res.render('perfil', {
            nombre: user.nombre,
            apellido: user.apellido,
            edad: user.edad,
            email: user.email,
        });
    });
    
    router.get('/purchase', viewController.purchase);
    
export default router;