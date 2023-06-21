import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
import { productCollection } from "./products.models.js"

const cartCollection = 'carts'

const cartSchema = new mongoose.Schema({
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: productCollection
      },
      quantity: Number,
    }
  ]
})

cartSchema.methods.total = function () {
  return this.products.reduce((total, item) => {
    return total + (item.product.price * item.quantity)
  }, 0)
}

cartSchema.pre('find', function () {
  this.populate('products.product')
})

cartSchema.plugin(mongoosePaginate)

export const cartModel = mongoose.model(cartCollection, cartSchema)