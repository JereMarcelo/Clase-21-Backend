import cartDao from "../dao/cartDao.js";
import productDao from "../dao/productDao.js";
import UserService from "../dao/services/user.service.js";
import TicketService from "../dao/services/ticket.service.js";


export const getAllCarts = async (req, res) => {
    try {
        res.json(await cartDao.getCarts());
    } catch (error) {
        res.json({ error })
    }
}

export const getCartById = async (req, res) => {
    const cid = (req.params.cid)
    try {
        res.json(await cartDao.getCartById(cid))
    } catch (error) {
        res.json({ error })
    }
}

export const postCart = async (req, res) => {
    try {
        const result = await cartDao.createCart(req.body)
        res.json({ status: 'Success', result })
    } catch (error) {
        res.json({ error })
    }
}

export const updateCart = async (req, res, next) => {
    const { cid, pid } = req.params
    const { quantity } = req.body
    try {
        const result = await cartDao.findOneAndUpdate(
            { _id: cid, 'products.product': pid },
            { $set: { 'products.$.quantity': quantity } },
            { new: true }
        )
        res.send({
            message: `Product with id ${pid} updated to quantity ${quantity} in cart with id ${cid}`
        })
    } catch (error) {
        res.json({ error })
    }
}

export const addProduct = async (req, res, next) => {
    const { cid } = req.params
    const { pid } = req.params

    try {
        const cart = await cartDao.getCartById({ _id: cid })
        console.log(cart);
        const product = cart.products.find(
            (product) => product.product._id.toString() === pid
        )
        if (!product) {
            const newProduct = { quantity: 1, product: pid }
            cart.products.push(newProduct)
            res.send(newProduct)
        } else {
            product.quantity += 1
            res.send(product)
        }
        await cart.save()

    } catch (error) {
        res.json({ error: "Error hermano" })
    }
}

export const deleteProductFromCart = async (req, res) => {
    const { cid, pid } = req.params
    try {
        const result = await cartDao.findOneAndUpdate(
            { _id: cid },
            { $pull: { products: { product: pid } } },
            { new: true }
        )
        if (!result) {
            res.send({ error: "Not found" })
        }
        res.send({
            message: `Product with id ${pid} deleted from cart with id ${cid}`
        })
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export const deleteCart = async (req, res) => {
    const { cid } = req.params;
    try {
        await cartDao.emptyCart(cid)
        res.json({ message: 'Cart deleted' })
    } catch (error) {
        res.json({ error })
    }
}

export const purchase = async (req, res) => {
    const userService = new UserService();
    const ticketService = new TicketService();
    const { cid } = req.params
    try {
        const cart = await cartDao.getCartById({ _id: cid })
        console.log(cart);
        if (!cart) {
            console.log("error1");
        }
        const user = await userService.findByCartId(cid)
        if (!user) {
            console.log("error2");
        }
        const purchaser = user ? user.email : null

        const purchasableProducts = []
        const nonPurchasableProducts = []

        for (const item of cart.products) {
            const idString = item.product._id.toString()
            const product = await productDao.getProductById({ _id: idString })
            if (!product) {
                console.log("error4");

                return
            }
            if (product.stock >= item.quantity) {
                await productDao.updateProductStock(product._id, item.quantity)
                purchasableProducts.push(item)
            } else {
                nonPurchasableProducts.push(item)
            }
        }

        const amount = purchasableProducts.reduce((total, item) => total + (item.product.price * item.quantity), 0)

        const ticketData = {
            amount,
            purchaser,
            cartId: cid,
            purchased_products: purchasableProducts
        }
        const newTicket = await ticketService.create(ticketData)
        if (!newTicket) {
            console.log("error5");

            return
        }

        cart.products = nonPurchasableProducts;
        const updateCart = await cartDao.updateCart(cart);

        if (!updateCart) {
            console.log("error6");
        }

        const mailSent = await cartDao.PurchaseMail(purchaser)
        res.send({
            message: 'Purchase completed',
            nonPurchasableProducts: nonPurchasableProducts.map(item => item.product._id)
        })
    } catch (error) {
        console.log(error);
    }
}
