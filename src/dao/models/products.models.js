import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
export const productCollection = 'products'

const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    category: String,
    price: String,
    thumbnailPath: String,
code: {
    type: String,
    unique: true
    },
status: {
    type: Boolean,
    default: true
    },
stock: Number
})

productSchema.pre('findOneAndUpdate', function (next) {
    if (this._update.$inc && this._update.$inc.stock !== undefined) {
      const updatedStock = this._update.$inc.stock
      if (updatedStock <= 0) {
        this._update.status = false
      } else {
        this._update.status = true
      }
    }
    next()
  })

productSchema.plugin(mongoosePaginate)

export const productModel = mongoose.model(productCollection, productSchema)
export default productModel