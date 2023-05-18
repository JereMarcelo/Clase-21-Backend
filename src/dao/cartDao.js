import { cartModel } from '../dao/models/cart.models.js'

class cartDao {

    async getCarts(limit) {
        if (limit === 0 || !limit) {
        return await cartModel.find({})
    } else {
        return await cartModel.find({}).limit(limit)
    }
}

    async getCartById(id) {
        return cartModel.findById(id).populate('products.product')
    }

    async createCart(cart) {
        return await cartModel.create(cart)
    }

    async updateCart(cid, product) {
    const myProduct = {
        product: product._id,
        quantity: 1,
    }

    try {
        const cart = await cartModel.findById(cid)
        const productIndex = cart.products.findIndex(product => product.product.toString() === myProduct.product)
        if (productIndex === -1) {
            cart.products.push(myProduct);
        const savedCart = await cart.save()
        return savedCart
        } else {
        cart.products[productIndex].quantity++;
        const savedCart = await cart.save()
        return savedCart
        }
    } catch (error) {
        throw new Error(error)
    }
}

    async updateQuantityToCart(cid, pid, quantity)  {
		try {
			await cartModel.updateOne({ id: cid, 'products.product': pid }, { $inc: { 'products.$.quantity': quantity } })
		} catch (error) {
			throw new Error(error)
		}
	}

    async deleteProductFromCart(cid, pid) {
        return await cartModel.findByIdAndUpdate({ _id: cid },
        { $pull: { products: { product: pid } } },
        { new: true, useFindAndModify: false })
    }

    async emptyCart(cid) {
        return await cartModel.findByIdAndDelete({ _id: cid },
        { $set: { products: [] } })
    }
}

export default new cartDao();