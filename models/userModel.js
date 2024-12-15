const mongoose = require('mongoose')

 const userSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  },
  token:{
    type: String,
  },
  cart:{
    type: Array,
    default: [],
    required: true
  },
  list:{
    type: Array,
    default: [],
    required: true
  },
})

module.exports = mongoose.model("User", userSchema)