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
  compare:{
    type: Array,
    default: [],
    required: true
  },
  favorite:{
    type: Array,
    default: [],
    required: true
  },
  history:{
    type: Array,
    default: [],
  },
  cart:{
    type: Array,
    default: [],
    required: true
  },
})

module.exports = mongoose.model("User", userSchema)