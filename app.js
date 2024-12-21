const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const auth = require("./middleware/auth");
const morgan = require("morgan");
const path = require("path");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use("/uploads/images", express.static(path.join("uploads", "images")));
app.use(morgan("dev"));

//////////////////////// PRODUCT
const Product = require("./models/productModel");

app.post("/home-cat", async (req, res) => {
  try {
    const cat = await Product.find(req.body).limit(4);
    res.json(cat);
  } catch (error) {
    throw new Error(error);
  }
});

app.get("/get-products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    throw new Error(error);
  }
});

app.get("/product/:id", async (req, res) => {
  const { id } = req.params
  const getOne = await Product.findById(id)
  res.json(getOne)
})

app.post("/category", async (req, res) => {
  try {
    const { cat } = req.query;
    const category = await Product.find({ category: cat });
    res.json(category);
  } catch (error) {
    throw new Error(error);
  }
});

app.get("/search", async (req, res) => {
  try {
    let { k, sort, min_price, max_price, cat } = req.query;
    if (cat) {
      if(!min_price){
        const search = await Product.find({
          $and: [
            { name: { $regex: k, $options: "i" } },
            { category: cat },
          ],
        })
        // }).sort(sort);
        res.json(search);
      }
      if(min_price){
      const search = await Product.find({
        $and: [
          { name: { $regex: k, $options: "i" } },
          { price: { $gte: min_price, $lte: max_price } },
          { category: cat },
        ],
      }).sort(sort);
      res.json(search);
    }
    }
    if (!cat) {
      if(!min_price){
        const search = await Product.find(
            { name: { $regex: k, $options: "i" } },
        ).sort(sort)
        res.json(search);
      }
      if(min_price){
        const search = await Product.find({
          $and: [
            { name: { $regex: k, $options: "i" } },
            { price: { $gte: min_price, $lte: max_price } },
        ],
      }).sort(sort)
      res.json(search);
    }
  }
  } catch (error) {
    throw new Error(error);
  }
});

app.get("/add-product", async (req, res) => {
});

//////////////////////// USER
const User = require("./models/userModel");
const Cart = require("./models/cartModel");
const bcrypt = require("bcrypt");

app.get("/user", async (req, res) => {
  const users = await User.find();
  res.send(users);
  res.end();
});

app.post("/user/login", async (req, res) => {
  res.cookie("one", "two");

  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      throw new Error({
        kasdljflaksdjflkajsdklfjaklsdjflkadjsfklajdsf:
          "You need to register first",
      });
    const comparedPass = await bcrypt.compare(password, user.password);
    if (!comparedPass) throw new Error("Email or password is wrong");
    const token = jwt.sign({ userId: user._id }, process.env.JWT_TOKEN, {
      expiresIn: "1m",
    });
    user.password = null;
    user.token = token;
    res.cookie("token", token, {
      httpOnly: true,
    });
    res.cookie("one", "two");
    res.json(user);
  } catch (error) {
    throw new Error(error);
  }
});

app.post("/user/register", async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    const user = await User.findOne({ email });
    if (user) {
    } else {
      const cryptedPassword = await bcrypt.hash(password, 12);
      const createUser = await User.create({
        name,
        email,
        password: cryptedPassword,
      });
      res.json(createUser);
    }
  } catch (error) {
    throw new Error(error);
  }
});

app.post("/user/add-to-cart", async (req, res) => {
  const { uId, pId } = req.body;
  const user = await Cart.findOne({ userId: uId });
  if (user) {
    const product = user.products.find((ev) => {
      return ev.productId === pId;
    });
    if (product) {
      product.quantity = product.quantity += 1;
      await Cart.findByIdAndUpdate(user._id, user, { new: true });
    } else {
      /// if product not exist
      await Cart.findByIdAndUpdate(
        user._id,
        { $push: { products: { productId: pId, quantity: 1 } } },
        { new: true }
      );
    }
  } else {
    /// if user not exist
    const user = await Cart.create({
      userId: uId,
      products: [{ productId: pId, quantity: 1 }],
    });
    res.json(user);
  }
  res.end();
});

app.get("/user/cart", async (req, res) => {
  const cart = await Cart.find();
  res.json(cart);
});

app.post("/user/cart", async (req, res) => {
  try {
    const { uId } = req.body;
    const cart = await Cart.find({ userId: uId });
    res.json(cart);
  } catch (er) {
    throw new Error("error happend");
  }
});

mongoose
 // .connect(process.env.MONGO_URL)
  .connect('mongodb+srv://Jeff-Bezos:ohShit1234@cluster0.qwfgcrz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(console.log("Connected to MongoDB"))
  .catch((er) => console.log(er));

app.listen(4000, console.log("Connected to 4000"));
