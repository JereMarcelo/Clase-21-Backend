import productDao from '../dao/productDao.js'
import cartDao from '../dao/cartDao.js'
import UserService from "../dao/services/user.service.js"

class ViewController {
    #service;
    constructor(service){
        this.#service = service
    }
    async home(req, res) {
        let limit = parseInt(req.query.limit);
        let query = req.query.query || null
        let sort = parseInt(req.query.sort)
        let page = parseInt(req.query.page)
        try {
            let result = await productDao.getProducts(limit, JSON.parse(query), sort, page)
            res.render('products', { result })
        } catch (error) {
            res.json({ message: 'Error, check data' })
        }
    }
    async products(req, res) {
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
    }
    async productsId(req, res) {
        const pid = (req.params.pid)
        try {
            let result = await productDao.getProductById(pid)
            console.log(result)
            res.render('product-id', { result })
        } catch (error) {
            res.json({ error })
        }
    }
    async carts(req, res) {
        try {
            let cart = await cartDao.getCarts();
            res.render('cart', { cart })
        } catch (error) {
            res.json({ error })
        }
    }
    async cartsId(req, res) {
        const cid = (req.params.cid)
        try {
            let result = await cartDao.getCartById(cid)
            console.log(result.products)
            res.render('cart', { result })
        } catch (error) {
            res.json({ error })
        }
    }
    async register(req, res) {
        const email = req.session.user;
        if (email) {
            return res.redirect('/perfil');
        }
        res.render('register', {
            style: 'style',
        });
    }
    async userId(req, res, next) {
        try {
            const id = req.params.id;
            const user = await this.#service.findById({ _id: id });
            if (!user) {
                res
                    .status(404)
                    .send({ error: `Usuario con id ${id} no encontrado` });
                return;
            }
            res.render("viewUsuario", user);
        } catch (error) {
            next(error);
        }
    }
    async login(req, res) {
        const email = req.session.user;
        if (email) {
            return res.redirect('/perfil');
        }
        res.render('login');
    }
    async perfil(req, res) {
        try {
            const user = req.session.user = req.user
            res.render('perfil', {
                nombre: user.nombre,
                apellido: user.apellido,
                edad: user.edad,
                email: user.email,
            });
        } catch (error) {
            res.json({ error })
        }
    }
}

const controller = new ViewController( new UserService());
export default controller