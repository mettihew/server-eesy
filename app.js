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
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/uploads/images", express.static(path.join("uploads", "images")));
app.use(morgan("dev"));

//////////////////////// PRODUCT
const Product = require("./models/productModel");
const Issue = require("./models/issueModel");

app.post("/home-cat", async (req, res) => {
  try {
    const cat = await Product.find(req.body).limit(4);
    res.json(cat);
  } catch (err) {
    throw new Error(err);
  }
});

app.get("/get-products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    throw new Error(err);
  }
});

app.get("/product/:id", async (req, res) => {
  const { id } = req.params;
  const getOne = await Product.findById(id);
  res.json(getOne);
});

app.post("/category", async (req, res) => {
  try {
    const { cat } = req.body;
    const category = await Product.find({ category: cat });
    res.json(category);
  } catch (err) {
    throw new Error(err);
  }
});

app.post("/get-search-header", async (req, res) => {
  try {
    const { type, category } = req.body;
    if (category) {
      const search = await Product.find({
        $and: [{ name: { $regex: type, $options: "i" } }, { category }],
      });
      res.json(search);
    } else {
      const search = await Product.find({
        name: { $regex: type, $options: "i" },
      });
      res.json(search);
    }
  } catch (err) {
    throw new Error(err);
  }
});

app.post("/search", async (req, res) => {
  try {
    let { k, sort, min_price, max_price, cat, page } = req.query;
    page = Number(page);
    if (!page) page = 1;
    const limit = 4;
    const skip = limit * (page - 1);
    const start = skip;

    if (cat) {
      if (!min_price) {
        const search = await Product.find({
          $and: [{ name: { $regex: k, $options: "i" } }, { category: cat }],
        })
          .sort(sort)
          .skip(skip)
          .limit(limit);
        res.json({ search, limit, page, start });
      }
      if (min_price) {
        const search = await Product.find({
          $and: [
            { name: { $regex: k, $options: "i" } },
            { price: { $gte: min_price, $lte: max_price } },
            { category: cat },
          ],
        })
          .sort(sort)
          .skip(skip)
          .limit(limit);
        res.json({ search, limit, page, start });
      }
    }
    if (!cat) {
      if (!min_price) {
        const search = await Product.find({
          name: { $regex: k, $options: "i" },
        })
          .sort(sort)
          .skip(skip)
          .limit(limit);
        res.json({ search, limit, page, start });
      }
      if (min_price) {
        const search = await Product.find({
          $and: [
            { name: { $regex: k, $options: "i" } },
            { price: { $gte: min_price, $lte: max_price } },
          ],
        })
          .sort(sort)
          .skip(skip)
          .limit(limit);
        res.json({ search, limit, page, start });
      }
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
});

//  I TRIED TO GET JUST CATEGORIES HERE TO USE IN FILTER IN SEARCH PAGE
app.post("/search2", async (req, res) => {
  try {
    let { k, sort, min_price, max_price, cat, page } = req.query;
    // page = Number(page)
    // if(!page) page = 1
    // const limit = 4
    // const skip = limit * (page - 1)
    // const start = skip

    if (cat) {
      if (!min_price) {
        const number = await Product.find({
          $and: [{ name: { $regex: k, $options: "i" } }, { category: cat }],
        }).countDocuments();
        res.json({ number });
      }
      if (min_price) {
        const number = await Product.find({
          $and: [
            { name: { $regex: k, $options: "i" } },
            { price: { $gte: min_price, $lte: max_price } },
            { category: cat },
          ],
        }).countDocuments();
        res.json({ number });
      }
    }
    if (!cat) {
      if (!min_price) {
        const number = await Product.find({
          name: { $regex: k, $options: "i" },
        }).countDocuments();
        res.json({ number });
      }
      if (min_price) {
        const number = await Product.find({
          $and: [
            { name: { $regex: k, $options: "i" } },
            { price: { $gte: min_price, $lte: max_price } },
          ],
        }).countDocuments();
        res.json({ number });
      }
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// app.post("/search", async (req, res) => {
//   try {
//     let { k, sort, min_price, max_price, cat, page } = req.query;
//     page = Number(page)
//     if(!page) page = 1
//     const limit = 4
//     const skip = limit * (page - 1)
//     const start = skip

//     if (cat) {
//       if(!min_price){
//         const search = await Product.find({
//           $and: [
//             { name: { $regex: k, $options: "i" } },
//             { category: cat },
//           ],
//         }).sort(sort).skip(skip).limit(limit)
//         const number = await Product.find({
//           $and: [
//             { name: { $regex: k, $options: "i" } },
//             { category: cat },
//           ],
//       }).countDocuments()
//       res.json({search, number, limit, page, start});
//       }
//       if(min_price){
//       const search = await Product.find({
//         $and: [
//           { name: { $regex: k, $options: "i" } },
//           { price: { $gte: min_price, $lte: max_price } },
//           { category: cat },
//         ],
//       }).sort(sort).skip(skip).limit(limit)
//       const number = await Product.find({
//         $and: [
//           { name: { $regex: k, $options: "i" } },
//           { price: { $gte: min_price, $lte: max_price } },
//           { category: cat },
//         ],
//       }).countDocuments()
//     res.json({search, number, limit, page, start});
//     }
//     }
//     if (!cat) {
//       if(!min_price){
//         const search = await Product.find(
//             { name: { $regex: k, $options: "i" } },
//         ).sort(sort).skip(skip).limit(limit)
//         const number = await Product.find(
//           { name: { $regex: k, $options: "i" } },
//       ).countDocuments()
//         res.json({search, number, limit, page, start});
//       }
//       if(min_price){
//         const search = await Product.find({
//           $and: [
//             { name: { $regex: k, $options: "i" } },
//             { price: { $gte: min_price, $lte: max_price } },
//         ],
//       }).sort(sort).skip(skip).limit(limit)
//       const number = await Product.find({
//         $and: [
//           { name: { $regex: k, $options: "i" } },
//           { price: { $gte: min_price, $lte: max_price } },
//       ],
//       }).countDocuments()
//     res.json({search, number, limit, page, start});
//     }
//   }
//   } catch (err) {
//     res.status(500).json(err.message)
//   }
// });

app.get("/add-product", async (req, res) => {});

//////////////////////// USER
const User = require("./models/userModel");
const Cart = require("./models/cartModel");
const bcrypt = require("bcrypt");
const { log } = require("console");

app.get("/user", async (req, res) => {
  // await User.deleteMany();
  const users = await User.find();
  res.json(users);
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw new Error("You need to register first");
    const comparedPass = await bcrypt.compare(password, user.password);
    if (!comparedPass) throw new Error("Email or password is wrong");
    const token = jwt.sign({ userId: user._id }, process.env.JWT_TOKEN, {
      expiresIn: "1m",
    });
    user.password = "";
    user.token = token;
    res.json(user);
  } catch (err) {
    return res.status(401).send(err.message);
  }
});

app.post("/register", async (req, res) => {
  console.log('you are in register 0000------------------------------------------------');
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw new Error("user alresdy exist");
    } else {
      const cryptedPassword = await bcrypt.hash(password, 12);
      const createUser = await User.create({
        name,
        email,
        password: cryptedPassword,
      });
      res.json(createUser);
    }
  } catch (err) {
    return res.status(401).send(err.message);
  }
});

app.post("/delete-from-cart", async (req, res) => {
  const {pId, uId} = req.body
  const del = await User.findByIdAndUpdate(
    uId,
    { $pull: { cart: { pId: pId } } },
    { new: true }
  );
  res.json(del);
})

app.post("/remove-from-cart", async (req, res) => {
  try {
    const { uId, pId, color, qty } = req.body;
    if (qty === 0) {
      const del = await User.findByIdAndUpdate(
        uId,
        { $pull: { cart: { pId: pId } } },
        { new: true }
      );
      res.json(del);
    } else {
      await User.findByIdAndUpdate(
        uId,
        { $pull: { cart: { pId: pId } } },
        { new: true }
      );
      const dec = await User.findByIdAndUpdate(
        uId,
        { $push: { cart: { pId, qty, color } } },
        { new: true }
      );
      res.json(dec);
    }
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

app.post("/add-to-cart", async (req, res) => {
  try {
    const { uId, pId, color } = req.body;
    const add = await User.findByIdAndUpdate(
      uId,
      { $push: { cart: { pId, qty: 1, color } } },
      { new: true }
    );
    res.json(add);
  } catch (err) {
    return res.status(500).json(err.message);
  }
});

app.post("/review", async (req, res) => {
  let { uId, pId, review, rating } = req.body;
  await Product.findByIdAndUpdate(
    pId,
    { $push: { review: { uId, review, rating } } },
    { new: true }
  );
  res.end();
});

app.post("/increase-cart", async (req, res) => {
  try {
    const { uId, pId, color, qty } = req.body;
    await User.findByIdAndUpdate(
      uId,
      { $pull: { cart: { pId: pId } } },
      { new: true }
    );
    const add = await User.findByIdAndUpdate(
      uId,
      { $push: { cart: { pId, qty, color } } },
      { new: true }
    );
    res.json(add);
  } catch (err) {
    return res.status(500).json(err.message);
  }
});

app.post("/get-cart", async (req, res) => {
  const { uId } = req.body;
  try {
    const user = await User.findOne({ _id: uId });
    let arr = [];
    user.cart.map((ev) => {
      arr.push(ev.pId);
    });
    const find = await Product.find({ _id: arr });
    res.json(find);
  } catch (err) {
    return res.status(500).json(err.message);
  }
});

app.post("/get-order", async (req, res) => {
  try {
    const { uId } = req.body;
    const cart = await Cart.findOne({ userId: uId });
    if (cart) {
      const map = cart.products.map((ev) => ev.productId);
      const find = await Product.find({ _id: map });
      res.json(find);
    } else {
      res.json([]);
    }
  } catch (err) {
    return res.status(500).json(err.message);
  }
});

app.get("/report", async (req, res) => {
  // const {pId, issue} = req.body
  // const iss = await Issue.deleteMany()
  const iss = await Issue.find();
  // const iss = await Issue.create({pId, issue })
  //  const iss = await User.findByIdAndUpdate("67971fd30dda39b0fead9815", {role: 'admin'})
  res.json(iss);
});

app.post("/get-issues", async (req, res) => {
  try {
    const { uId } = req.body;
    const user = await User.findById(uId);
    if (user.role !== "admin") return res.status(403).json("permission denied");
    const iss = await Issue.find();
    console.log(iss);

    res.json(iss);
  } catch (err) {
    return res.status(500).json(err.message);
  }
});

app.post("/add-to-favorite", async (req, res) => {
  try {
    const { uId, pId } = req.body;
    const foundUser = await User.findOne({ _id: uId });
    let alreadyExist = foundUser.favorite.find((ev) => {
      return ev === pId;
    });
    if (alreadyExist) {
      const del = await User.findByIdAndUpdate(
        uId,
        { $pull: { favorite: pId } },
        { new: true }
      );
      res.json(del);
    } else {
      const add = await User.findByIdAndUpdate(
        uId,
        { $push: { favorite: pId } },
        { new: true }
      );
      res.json(add);
    }
  } catch (err) {
    return res.status(500).json(err.message);
  }
});

app.post("/get-favorite", async (req, res) => {
  const get = await Product.find({ _id: req.body });
  res.json(get);
});

app.post("/add-to-compare", async (req, res) => {
  try {
    const { uId, pId } = req.body;
    const foundUser = await User.findOne({ _id: uId });
    let alreadyExist = foundUser.compare.find((ev) => {
      return ev === pId;
    });
    if (alreadyExist) {
      const del = await User.findByIdAndUpdate(
        uId,
        { $pull: { compare: pId } },
        { new: true }
      );
      res.json(del);
    } else {
      const add = await User.findByIdAndUpdate(
        uId,
        { $push: { compare: pId } },
        { new: true }
      );
      res.json(add);
    }
  } catch (err) {
    return res.status(500).json(err.message);
  }
});

app.post("/get-compare", async (req, res) => {
  try {
    const get = await Product.find({ _id: req.body });
    res.json(get);
  } catch (err) {
    return res.status(500).json(err.message);
  }
});

// app.post("/add-history", async (req, res) => {
//   const { uId, pId } = req.body;
//   const his = await User.findByIdAndUpdate(
//     uId,
//     { $push: { history: pId } },
//     { new: true }
//   );
//   res.json(his);
// });

app.post("/get-history", async (req, res) => {
  const { history } = req.body;
  const get = await Product.find({ _id: history }).limit(4)
  res.json(get);
});

////////////user location
app.get("/get-ip", async (req, res) => {
  const ip =
    req.headers["cr-connection-ip"] ||
    req.headers["x-real-ip"] ||
    req.headers["x-forwarded-for"] ||
    req.socket.remoteAddress ||
    "";
  res.json(ip);
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("Connected to MongoDB"))
  .catch((er) => console.log(er));

app.listen(4009, console.log("Connected to 4000"));
