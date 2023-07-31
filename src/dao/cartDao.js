import { cartModel } from '../dao/models/cart.models.js';
import { host, port, user, pass } from "../controllers/mail.controller.js";
import nodemailer from "nodemailer";

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

    async findOneAndUpdate(query, update) {
        return cartModel.updateOne(query, update);
    }

    async PurchaseMail(email) {
        const transporter = nodemailer.createTransport({
            host: host,
            port: port,
            auth: {
            user: user,
            pass: pass
        }
        })
    
        transporter.sendMail({
            from: "'CoderBack' <ecommerce@coderhouse.com>",
            to: email,
            subject: 'Aviso de compra',
            html: `<h1> SE RECIBIO SU COMPRA </h1> `
        })
            .then(info => console.log(info))
            .catch(error => console.log(error))

        }
        async updateCart(cart) {
            return cart.save();
        }

    async emptyCart(cid) {
        return await cartModel.findByIdAndDelete({ _id: cid },
        { $set: { products: [] } })
    }
}

export default new cartDao();