import cartDao from "../dao/cartDao.js";
import productDao from "../dao/productDao.js";

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
        await cartDao.createCart(req.body)
        res.json({ status: 'Success' })
    } catch (error) {
        res.json({ error })
    }
}

export const updateCart = async (req, res) => {
    const { cid } = req.params
    const product = req.body
    try {
        const response = await cartDao.updateCart(cid, product)
        res.status(200).send({ message: 'Cart Updated', response })
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export const updateQuantity = async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    try {
        await cartDao.updateQuantityToCart(cid, pid, quantity)
        res.status(200).send({ message: `quantity of product ${pid} in cart ${cid} increased by ${quantity}` })

    } catch (error) {
        res.status(500).send(error.message)
    }
}

export const deleteProductFromCart = async (req, res) => {
    const { cid, pid } = req.params;
    let exists = await productDao.getProductById(pid)
    try {
        if (!exists) res.status(404).json({ "error": "Product not found on DB" })
        else {
            try {
                await cartDao.deleteProductFromCart(cid, pid)
                res.json({ status: 'success', info: 'Product deleted from cart' })
            } catch (error) {
                res.json({ error })
            }
        }
    } catch (error) {
        res.json({ error })
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