const mongoose = require('mongoose')

 const productSchema = new mongoose.Schema({
  name: {type: String,required: true},
  category: {type: String,required: true, lowercase: true},
  price: {type: Number,required: true},
  brand: {type: String,required: true,lowercase: true},
  color: {type: Array,required: true},
  images: {
    title: { type: String, required: true },
    others: { type: Array, required: true },
    special: { type: String, required: false },
  },
  best_seller: {type: Boolean,default: false},
  weight: { type: Number, required: true },
  height: { type: Number, required: true },
  depth: { type: Number, required: true },
  review: {type: Array,required: false,default: []},
  rating: {type: Array,required: false,default: []}, 
  stock: {type: Number,required: true}
})

module.exports = mongoose.model('Product', productSchema)