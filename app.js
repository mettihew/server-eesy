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

app.get("/", async(req, res) => {
  res.json("OK")
})

// app.post("/home-cat", async (req, res) => {
//   try {
//     const cat = await Product.find(req.body).limit(4);
//     res.json(cat);
//   } catch (err) {
//     throw new Error(err);
//   }
// });

app.post("/search-home", async (req, res) => {
  const search = await Product.find({ name: { $regex: req.body.search, $options: "i" } } ).limit(4)
  res.json(search)
});
app.post("/cat-home", async (req, res) => {
  console.log('heeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeereeeeeeeeeeeeeeee', req.body);
  
  const cat = await Product.find(req.body).limit(4);
  res.json(cat)
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

// app.post("/get-search-header-only-category", async (req, res) => {
//   try {
//     const { type } = req.body;
//       const search = await Product.find({
//       $and:[  {category: { $regex: type, $options: "i"} },  ]
//  });
//       res.json(search);
//   } catch (err) {
//     throw new Error(err);
//   }
// });

app.post("/search", async (req, res) => {
  try {
    let { k, sort, min_price, max_price, cat, page, brand } = req.query;
    page = Number(page);
    if (!page) page = 1;
    const limit = 4;
    const skip = limit * (page - 1);
    const start = skip;

    if(brand){
      if (cat) {
        if (!min_price) {
          const search = await Product.find({
            $and: [{ name: { $regex: k, $options: "i" } }, { category: cat }, { brand }],
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
              { brand }
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
          const search = await Product.find({$and: [{ name: { $regex: k, $options: "i" } },{ brand }]})
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
              { brand }
            ],
          })
            .sort(sort)
            .skip(skip)
            .limit(limit);
          res.json({ search, limit, page, start });
        }
      }
    }

    if(!brand){

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
        const search = await Product.find({name: { $regex: k, $options: "i" }})
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
    } //cat
  } //brand
  } catch (err) {
    res.status(500).json(err.message);
  }
});

//  Only number - pagination
app.post("/search-countDocuments", async (req, res) => {
  try {
    let { k, sort, min_price, max_price, cat, page, brand } = req.query;

if(brand){
    if (cat) {
      if (!min_price) {
        const number = await Product.find({
          $and: [{ name: { $regex: k, $options: "i" } }, { category: cat }, {brand} ],
        }).countDocuments();
        res.json({ number });
      }
      if (min_price) {
        const number = await Product.find({
          $and: [
            { name: { $regex: k, $options: "i" } },
            { price: { $gte: min_price, $lte: max_price } },
            { category: cat },
            {brand}
          ],
        }).countDocuments();
        res.json({ number });
      }
    }
    if (!cat) {
      if (!min_price) {
        const search = await Product.find({$and: [{ name: { $regex: k, $options: "i" } },{ brand }]})
        res.json({ search });
      }
      if (min_price) {
        const number = await Product.find({
          $and: [
            { name: { $regex: k, $options: "i" } },
            { price: { $gte: min_price, $lte: max_price } },
            {brand}
          ],
        }).countDocuments();
        res.json({ number });
      }
    }
  }

if(!brand){
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
}
  } catch (err) {
    res.status(500).json(err.message);
  }
});

//  no sort no limit no skip - filter 
app.post("/search-all", async (req, res) => {
  try {
    let { k, min_price, max_price, cat, page, brand } = req.query;
    if(brand){
      if (cat) {
        if (!min_price) {
          const find = await Product.find({
            $and: [{ name: { $regex: k, $options: "i" } }, { category: cat }, {brand}],
          });
          res.json(find);
        }
        if (min_price) {
          const find = await Product.find({
            $and: [
              { name: { $regex: k, $options: "i" } },
              { price: { $gte: min_price, $lte: max_price } },
              { category: cat },
              {brand}
            ],
          });
          res.json(find);
        }
      }
      if (!cat) {
        if (!min_price) {
        const find = await Product.find({name: { $regex: k, $options: "i" }}, {brand}).countDocuments();
          res.json(find);
        }
        if (min_price) {
          const find = await Product.find({
            $and: [
              { name: { $regex: k, $options: "i" } },
              { price: { $gte: min_price, $lte: max_price } },
              {brand}
            ],
          });
          res.json(find);
        }
      }
    }

    if(!brand){
    if (cat) {
      if (!min_price) {
        const find = await Product.find({
          $and: [{ name: { $regex: k, $options: "i" } }, { category: cat }],
        });
        res.json(find);
      }
      if (min_price) {
        const find = await Product.find({
          $and: [
            { name: { $regex: k, $options: "i" } },
            { price: { $gte: min_price, $lte: max_price } },
            { category: cat },
          ],
        });
        res.json(find);
      }
    }
    if (!cat) {
      if (!min_price) {
        const find = await Product.find({
          name: { $regex: k, $options: "i" },
        });
        res.json(find);
      }
      if (min_price) {
        const find = await Product.find({
          $and: [
            { name: { $regex: k, $options: "i" } },
            { price: { $gte: min_price, $lte: max_price } },
          ],
        });
        res.json(find);
      }
    }
  }
  } catch (err) {
    res.status(500).json(err.message);
  }
});





app.get("/add-product", async (req, res) => {
  await Product.insertMany([


    {
        name: 'Fair Isle Sweater Women Plus Size Vintage Long Sleeve Crewneck Sweater Fair Isle Knit Pullover Sweater Tops S-4XL',
        category: 'women',
        price: 122,
        brand: 'Amazon',
        color: ['white', 'pink', 'red', 'grey'],
        images: {
          title: 'https://m.media-amazon.com/images/I/61fAu0V2n7L._AC_SX466_.jpg',
          others: ['https://m.media-amazon.com/images/I/51yW3b9m9pL._SX38_SY50_CR,0,0,38,50_.jpg', 'https://m.media-amazon.com/images/I/61kKXNCHmWL._SX38_SY50_CR,0,0,38,50_.jpg', 'https://m.media-amazon.com/images/I/61p1lxJyGKL._SX38_SY50_CR,0,0,38,50_.jpg', 'https://m.media-amazon.com/images/I/41sD3+POxAL._SX38_SY50_CR,0,0,38,50_.jpg'],
          special: 'https://m.media-amazon.com/images/S/aplus-media-library-service-media/20da964d-dda9-4fd3-b60c-0b920a5da2ce.__CR0,0,1464,600_PT0_SX1464_V1___.jpg',
        },
        best_seller: true,
        detail: [
            {first: 'Fabric type' , second: '82%Polyester 12%Rayon 6%Spandex'},
          {first: 'Care instructions', second: 'Machine Wash' },
         {first: 'Origin', second: 'Imported' },
         {first: 'Closure type', second: 'Pull On' },
        ],
         stock : 200,
         about_this_item: ['Fabrics: The Basic Tee Shirts are made with breathable, stretchy materials.Super soft and elastic, lightweight and Comfortable to wear.', 'Styling: Wear these trendy long sleeve shirts with leggings or shorts for your workout, or pair them with low-waist jeans or cargo pants for a y2k-inspired look', 'Occassion: Going out tops great for women, juniors, teens, girls. Perfect for daily casual wear, streetwear, home, school, office, street, beach, party, club, shopping, dating, holiday, vacations', 'Design: This top features a soft, comfy, and casual style with a crew neck and long sleeves. It comes in both cropped and regular styles, giving you the option to wear it as a regular top or fold it up for a trendy top look', 'Wearing: This basic shirt is a fashion clothes. It pairs perfectly with shorts, jeans, skirts, yoga pants, or cargo pants for a fashion-forward Y2K look'],
         more: [{first: 'Department', second: 'womens'}, {first: 'Date First Available', second: 'August 10, 2024'}, {first: 'ASIN', second: 'B0DCS8HD4V'}, {first: 'Best Sellers Rank', second: '#23,239 in Clothing, Shoes & Jewelry '}, ],
         description: 'Customers appreciate the sweatshirts design, quality, and softness. They find the image cute and fun, with bright colors. Many find it comfortable and well-made. However, some customers are unhappy with the fabric quality - it mentions polyester and spandex instead of cotton. There are mixed opinions on sizing.',
    },


    {
        name: 'ZOCAVIA Womens Y2K Art Cat Sweatshirts Fall Abstract Cat Graphic Pullover Tops Long Sleeve Oil Painting Cat Printed T Shirts',
        category: 'women',
        price: 166,
        brand: 'Amazon',
        color: ['white', 'pink', 'red', 'grey'],
        images: {
          title: 'https://m.media-amazon.com/images/I/71qd3+4XLYL._AC_SX569_.jpg',
          others: ['https://m.media-amazon.com/images/I/515GXBnkBoL._SX38_SY50_CR,0,0,38,50_.jpg', 'https://m.media-amazon.com/images/I/51VfoqeSPCL._SX38_SY50_CR,0,0,38,50_.jpg', 'https://m.media-amazon.com/images/I/51HUs5QKBTL._SX38_SY50_CR,0,0,38,50_.jpg', 'https://m.media-amazon.com/images/I/51YfY76CUjL._SX38_SY50_CR,0,0,38,50_.jpg'],
          special: 'https://m.media-amazon.com/images/S/aplus-media-library-service-media/c012b637-3cc4-42ea-8c38-3a842f27fbb9.__CR0,0,2928,1200_PT0_SX1464_V1___.jpg',
        },
        best_seller: false,
        detail: [
            {first: 'Fabric type' , second: '82%Polyester 12%Rayon 6%Spandex'},
          {first: 'Care instructions', second: 'Machine Wash' },
         {first: 'Origin', second: 'Imported' },
         {first: 'Closure type', second: 'Pull On' },
        ],
         stock : 200,
         about_this_item: ['Fabrics: The Basic Tee Shirts are made with breathable, stretchy materials.Super soft and elastic, lightweight and Comfortable to wear.', 'Styling: Wear these trendy long sleeve shirts with leggings or shorts for your workout, or pair them with low-waist jeans or cargo pants for a y2k-inspired look', 'Occassion: Going out tops great for women, juniors, teens, girls. Perfect for daily casual wear, streetwear, home, school, office, street, beach, party, club, shopping, dating, holiday, vacations', 'Design: This top features a soft, comfy, and casual style with a crew neck and long sleeves. It comes in both cropped and regular styles, giving you the option to wear it as a regular top or fold it up for a trendy top look', 'Wearing: This basic shirt is a fashion clothes. It pairs perfectly with shorts, jeans, skirts, yoga pants, or cargo pants for a fashion-forward Y2K look'],
         more: [{first: 'Department', second: 'womens'}, {first: 'Date First Available', second: 'August 10, 2024'}, {first: 'ASIN', second: 'B0DCS8HD4V'}, {first: 'Best Sellers Rank', second: '#23,239 in Clothing, Shoes & Jewelry '}, ],
         description: 'Customers appreciate the sweatshirts design, quality, and softness. They find the image cute and fun, with bright colors. Many find it comfortable and well-made. However, some customers are unhappy with the fabric quality - it mentions polyester and spandex instead of cotton. There are mixed opinions on sizing.',
    },


    {
        name: 'AQOTHES Womens Loose Casual Zipper Sherpa Fleece Pockets Pullover Sweatshirt for Women',
        category: 'women',
        price: 215,
        brand: 'Amazon',
        color: ['white', 'pink', 'red', 'grey'],
        images: {
          title: 'https://m.media-amazon.com/images/I/41SKlLVXxyL._SX38_SY50_CR,0,0,38,50_.jpg',
          others: ['https://m.media-amazon.com/images/I/51RY0AFnT6L._SX38_SY50_CR,0,0,38,50_.jpg', 'https://m.media-amazon.com/images/I/41nEjawsB2L._SX38_SY50_CR,0,0,38,50_.jpg', 'https://m.media-amazon.com/images/I/41wFV9QYhuL._SX38_SY50_CR,0,0,38,50_.jpg', 'https://m.media-amazon.com/images/I/41c8Q8xBKFL._SX38_SY50_CR,0,0,38,50_.jpg'],
          special: 'https://m.media-amazon.com/images/S/aplus-media/sc/ff5daca2-70c7-4d65-b213-b39c63afdb41.__CR0,50,970,600_PT0_SX970_V1___.jpg',
        },
        best_seller: false,
        detail: [
            {first: 'Fabric type' , second: '82%Polyester 12%Rayon 6%Spandex'},
          {first: 'Care instructions', second: 'Machine Wash' },
         {first: 'Origin', second: 'Imported' },
         {first: 'Closure type', second: 'Pull On' },
        ],
         stock : 200,
         about_this_item: ['Fabrics: The Basic Tee Shirts are made with breathable, stretchy materials.Super soft and elastic, lightweight and Comfortable to wear.', 'Styling: Wear these trendy long sleeve shirts with leggings or shorts for your workout, or pair them with low-waist jeans or cargo pants for a y2k-inspired look', 'Occassion: Going out tops great for women, juniors, teens, girls. Perfect for daily casual wear, streetwear, home, school, office, street, beach, party, club, shopping, dating, holiday, vacations', 'Design: This top features a soft, comfy, and casual style with a crew neck and long sleeves. It comes in both cropped and regular styles, giving you the option to wear it as a regular top or fold it up for a trendy top look', 'Wearing: This basic shirt is a fashion clothes. It pairs perfectly with shorts, jeans, skirts, yoga pants, or cargo pants for a fashion-forward Y2K look'],
         more: [{first: 'Department', second: 'womens'}, {first: 'Date First Available', second: 'August 10, 2024'}, {first: 'ASIN', second: 'B0DCS8HD4V'}, {first: 'Best Sellers Rank', second: '#23,239 in Clothing, Shoes & Jewelry '}, ],
         description: 'Customers appreciate the sweatshirts design, quality, and softness. They find the image cute and fun, with bright colors. Many find it comfortable and well-made. However, some customers are unhappy with the fabric quality - it mentions polyester and spandex instead of cotton. There are mixed opinions on sizing.',
    },


    {
        name: 'KIRUNDO Womens 2025 Winter Fuzzy Fleece Hoodies Sweatshirts Casual Long Sleeves Shaggy Sherpa Pullover With Pockets',
        category: 'women',
        price: 99,
        brand: 'Amazon',
        color: ['white', 'pink', 'red', 'grey'],
        images: {
          title: 'https://m.media-amazon.com/images/I/81XgfAxd2mL._AC_SX466_.jpg',
          others: ['https://m.media-amazon.com/images/I/51+oHu4QqBL._SX38_SY50_CR,0,0,38,50_.jpg', 'https://m.media-amazon.com/images/I/61jDnbp+tuL._SX38_SY50_CR,0,0,38,50_.jpg', 'https://m.media-amazon.com/images/I/51qRe8BK85S._SX38_SY50_CR,0,0,38,50_.jpg', 'https://m.media-amazon.com/images/I/51pCjzgzsVL._SX38_SY50_CR,0,0,38,50_.jpg'],
          special: 'https://m.media-amazon.com/images/S/aplus-media-library-service-media/fba032a3-2a7c-4f98-afe6-3cf12c7d01cc.__CR0,0,1464,600_PT0_SX1464_V1___.jpg',
        },
        best_seller: true,
        detail: [
            {first: 'Fabric type' , second: '82%Polyester 12%Rayon 6%Spandex'},
          {first: 'Care instructions', second: 'Machine Wash' },
         {first: 'Origin', second: 'Imported' },
         {first: 'Closure type', second: 'Pull On' },
        ],
         stock : 200,
         about_this_item: ['Fabrics: The Basic Tee Shirts are made with breathable, stretchy materials.Super soft and elastic, lightweight and Comfortable to wear.', 'Styling: Wear these trendy long sleeve shirts with leggings or shorts for your workout, or pair them with low-waist jeans or cargo pants for a y2k-inspired look', 'Occassion: Going out tops great for women, juniors, teens, girls. Perfect for daily casual wear, streetwear, home, school, office, street, beach, party, club, shopping, dating, holiday, vacations', 'Design: This top features a soft, comfy, and casual style with a crew neck and long sleeves. It comes in both cropped and regular styles, giving you the option to wear it as a regular top or fold it up for a trendy top look', 'Wearing: This basic shirt is a fashion clothes. It pairs perfectly with shorts, jeans, skirts, yoga pants, or cargo pants for a fashion-forward Y2K look'],
         more: [{first: 'Department', second: 'womens'}, {first: 'Date First Available', second: 'August 10, 2024'}, {first: 'ASIN', second: 'B0DCS8HD4V'}, {first: 'Best Sellers Rank', second: '#23,239 in Clothing, Shoes & Jewelry '}, ],
         description: 'Customers appreciate the sweatshirts design, quality, and softness. They find the image cute and fun, with bright colors. Many find it comfortable and well-made. However, some customers are unhappy with the fabric quality - it mentions polyester and spandex instead of cotton. There are mixed opinions on sizing.',
    },


    {
        name: 'Nlife Bring On The Sunshine Graphic Long Sleeves Tees Blouses for Women Tops Sweaters for Women',
        category: 'women',
        price: 66,
        brand: 'Amazon',
        color: ['white', 'pink', 'red', 'grey'],
        images: {
          title: 'https://m.media-amazon.com/images/I/81UqIy7BBNL._AC_SX569_.jpg',
          others: ['https://m.media-amazon.com/images/I/51PSZmbuz0L._SX38_SY50_CR,0,0,38,50_.jpg', 'https://m.media-amazon.com/images/I/51l7plm+rTL._SX38_SY50_CR,0,0,38,50_.jpg', 'https://m.media-amazon.com/images/I/51ezKulCEdL._SX38_SY50_CR,0,0,38,50_.jpg', 'https://m.media-amazon.com/images/I/51zlpjaBCML._SX38_SY50_CR,0,0,38,50_.jpg'],
          special: 'https://m.media-amazon.com/images/S/aplus-media-library-service-brand-media/3da0604cffe28178c468a06b714da233.w3000.h1500.__CR288,0,2425,1500_PT0_SX970_V1___.jpg',
        },
        best_seller: false,
        detail: [
            {first: 'Fabric type' , second: '82%Polyester 12%Rayon 6%Spandex'},
          {first: 'Care instructions', second: 'Machine Wash' },
         {first: 'Origin', second: 'Imported' },
         {first: 'Closure type', second: 'Pull On' },
        ],
         stock : 200,
         about_this_item: ['Fabrics: The Basic Tee Shirts are made with breathable, stretchy materials.Super soft and elastic, lightweight and Comfortable to wear.', 'Styling: Wear these trendy long sleeve shirts with leggings or shorts for your workout, or pair them with low-waist jeans or cargo pants for a y2k-inspired look', 'Occassion: Going out tops great for women, juniors, teens, girls. Perfect for daily casual wear, streetwear, home, school, office, street, beach, party, club, shopping, dating, holiday, vacations', 'Design: This top features a soft, comfy, and casual style with a crew neck and long sleeves. It comes in both cropped and regular styles, giving you the option to wear it as a regular top or fold it up for a trendy top look', 'Wearing: This basic shirt is a fashion clothes. It pairs perfectly with shorts, jeans, skirts, yoga pants, or cargo pants for a fashion-forward Y2K look'],
         more: [{first: 'Department', second: 'womens'}, {first: 'Date First Available', second: 'August 10, 2024'}, {first: 'ASIN', second: 'B0DCS8HD4V'}, {first: 'Best Sellers Rank', second: '#23,239 in Clothing, Shoes & Jewelry '}, ],
         description: 'Customers appreciate the sweatshirts design, quality, and softness. They find the image cute and fun, with bright colors. Many find it comfortable and well-made. However, some customers are unhappy with the fabric quality - it mentions polyester and spandex instead of cotton. There are mixed opinions on sizing.',
    },


    {
        name: 'AUTOMET Womens Long Sleeve Shirts Pleated Crew Neck Casual Fall Fashion Tops Loose Fit Lightweight Girls Outfits Clothes',
        category: 'women',
        price: 183,
        brand: 'Amazon',
        color: ['white', 'pink', 'red', 'grey'],
        images: {
          title: 'https://m.media-amazon.com/images/I/71gj-ZRqlBL._AC_SY550_.jpg',
          others: ['https://m.media-amazon.com/images/I/419QWbcJaBL._SX38_SY50_CR,0,0,38,50_.jpg', 'https://m.media-amazon.com/images/I/41ptS2fySuL._SX38_SY50_CR,0,0,38,50_.jpg', 'https://m.media-amazon.com/images/I/41uZhaHnLRL._SX38_SY50_CR,0,0,38,50_.jpg', 'https://m.media-amazon.com/images/I/41I1qbyk3gL._SX38_SY50_CR,0,0,38,50_.jpg'],
          special: 'https://m.media-amazon.com/images/S/aplus-media-library-service-media/eb377fca-172b-4e10-a60b-cd5cf87388c3.__CR0,0,1464,600_PT0_SX1464_V1___.jpg',
        },
        best_seller: false,
        detail: [
            {first: 'Fabric type' , second: '82%Polyester 12%Rayon 6%Spandex'},
          {first: 'Care instructions', second: 'Machine Wash' },
         {first: 'Origin', second: 'Imported' },
         {first: 'Closure type', second: 'Pull On' },
        ],
         stock : 200,
         about_this_item: ['Fabrics: The Basic Tee Shirts are made with breathable, stretchy materials.Super soft and elastic, lightweight and Comfortable to wear.', 'Styling: Wear these trendy long sleeve shirts with leggings or shorts for your workout, or pair them with low-waist jeans or cargo pants for a y2k-inspired look', 'Occassion: Going out tops great for women, juniors, teens, girls. Perfect for daily casual wear, streetwear, home, school, office, street, beach, party, club, shopping, dating, holiday, vacations', 'Design: This top features a soft, comfy, and casual style with a crew neck and long sleeves. It comes in both cropped and regular styles, giving you the option to wear it as a regular top or fold it up for a trendy top look', 'Wearing: This basic shirt is a fashion clothes. It pairs perfectly with shorts, jeans, skirts, yoga pants, or cargo pants for a fashion-forward Y2K look'],
         more: [{first: 'Department', second: 'womens'}, {first: 'Date First Available', second: 'August 10, 2024'}, {first: 'ASIN', second: 'B0DCS8HD4V'}, {first: 'Best Sellers Rank', second: '#23,239 in Clothing, Shoes & Jewelry '}, ],
         description: 'Customers appreciate the sweatshirts design, quality, and softness. They find the image cute and fun, with bright colors. Many find it comfortable and well-made. However, some customers are unhappy with the fabric quality - it mentions polyester and spandex instead of cotton. There are mixed opinions on sizing.',
    },


    {
        name: 'Trendy Queen Womens Oversized Long Sleeve T Shirts 2025 Basic Crewneck Tee Fall Tops Casual Workout Y2K Clothes',
        category: 'women',
        price: 235,
        brand: 'Amazon',
        color: ['white', 'pink', 'red', 'grey'],
        images: {
          title: 'https://m.media-amazon.com/images/I/61taUH3Rm0L._AC_SY550_.jpg',
          others: ['https://m.media-amazon.com/images/I/31ZJ1Ci4fCL._SX38_SY50_CR,0,0,38,50_.jpg', 'https://m.media-amazon.com/images/I/31TbxSK-FpL._SX38_SY50_CR,0,0,38,50_.jpg', 'https://m.media-amazon.com/images/I/31A-MkwVDmL._SX38_SY50_CR,0,0,38,50_.jpg', 'https://m.media-amazon.com/images/I/3126qK1PqxL._SX38_SY50_CR,0,0,38,50_.jpg'],
          special: 'https://m.media-amazon.com/images/S/aplus-media-library-service-media/646d7974-2b70-4a78-aac2-cdad075fb9d8.__CR0,0,1464,600_PT0_SX1464_V1___.jpg',
        },
        best_seller: false,
        detail: [
            {first: 'Fabric type' , second: '82%Polyester 12%Rayon 6%Spandex'},
          {first: 'Care instructions', second: 'Machine Wash' },
         {first: 'Origin', second: 'Imported' },
         {first: 'Closure type', second: 'Pull On' },
        ],
         stock : 200,
         about_this_item: ['Fabrics: The Basic Tee Shirts are made with breathable, stretchy materials.Super soft and elastic, lightweight and Comfortable to wear.', 'Styling: Wear these trendy long sleeve shirts with leggings or shorts for your workout, or pair them with low-waist jeans or cargo pants for a y2k-inspired look', 'Occassion: Going out tops great for women, juniors, teens, girls. Perfect for daily casual wear, streetwear, home, school, office, street, beach, party, club, shopping, dating, holiday, vacations', 'Design: This top features a soft, comfy, and casual style with a crew neck and long sleeves. It comes in both cropped and regular styles, giving you the option to wear it as a regular top or fold it up for a trendy top look', 'Wearing: This basic shirt is a fashion clothes. It pairs perfectly with shorts, jeans, skirts, yoga pants, or cargo pants for a fashion-forward Y2K look'],
         more: [{first: 'Department', second: 'womens'}, {first: 'Date First Available', second: 'August 10, 2024'}, {first: 'ASIN', second: 'B0DCS8HD4V'}, {first: 'Best Sellers Rank', second: '#23,239 in Clothing, Shoes & Jewelry '}, ],
         description: 'Customers appreciate the sweatshirts design, quality, and softness. They find the image cute and fun, with bright colors. Many find it comfortable and well-made. However, some customers are unhappy with the fabric quality - it mentions polyester and spandex instead of cotton. There are mixed opinions on sizing.',
    },


    {
        name: 'VNIRA Women’s Summer Casual Short Sleeve Oversize Workout T-Shirt Tee Tops',
        category: 'women',
        price: 166,
        brand: 'Amazon',
        color: ['white', 'pink', 'red', 'grey'],
        images: {
          title: 'https://m.media-amazon.com/images/I/51Am2qjuheL._AC_SX466_.jpg',
          others: ['https://m.media-amazon.com/images/I/41Q1dKpxFWL._SX38_SY50_CR,0,0,38,50_.jpg', 'https://m.media-amazon.com/images/I/31+98gHOOlL._SX38_SY50_CR,0,0,38,50_.jpg', 'https://m.media-amazon.com/images/I/41KuTSwLZ0L._SX38_SY50_CR,0,0,38,50_.jpg', 'https://m.media-amazon.com/images/I/41pFNkNqYuL._SX38_SY50_CR,0,0,38,50_.jpg'],
          special: 'https://m.media-amazon.com/images/S/aplus-media-library-service-media/03dc3d2a-7b6b-40a5-8018-241178ceab3c.__CR0,0,1464,600_PT0_SX1464_V1___.jpg',
        },
        best_seller: true,
        detail: [
            {first: 'Fabric type' , second: '82%Polyester 12%Rayon 6%Spandex'},
          {first: 'Care instructions', second: 'Machine Wash' },
         {first: 'Origin', second: 'Imported' },
         {first: 'Closure type', second: 'Pull On' },
        ],
         stock : 200,
         about_this_item: ['Fabrics: The Basic Tee Shirts are made with breathable, stretchy materials.Super soft and elastic, lightweight and Comfortable to wear.', 'Styling: Wear these trendy long sleeve shirts with leggings or shorts for your workout, or pair them with low-waist jeans or cargo pants for a y2k-inspired look', 'Occassion: Going out tops great for women, juniors, teens, girls. Perfect for daily casual wear, streetwear, home, school, office, street, beach, party, club, shopping, dating, holiday, vacations', 'Design: This top features a soft, comfy, and casual style with a crew neck and long sleeves. It comes in both cropped and regular styles, giving you the option to wear it as a regular top or fold it up for a trendy top look', 'Wearing: This basic shirt is a fashion clothes. It pairs perfectly with shorts, jeans, skirts, yoga pants, or cargo pants for a fashion-forward Y2K look'],
         more: [{first: 'Department', second: 'womens'}, {first: 'Date First Available', second: 'August 10, 2024'}, {first: 'ASIN', second: 'B0DCS8HD4V'}, {first: 'Best Sellers Rank', second: '#23,239 in Clothing, Shoes & Jewelry '}, ],
         description: 'Customers appreciate the sweatshirts design, quality, and softness. They find the image cute and fun, with bright colors. Many find it comfortable and well-made. However, some customers are unhappy with the fabric quality - it mentions polyester and spandex instead of cotton. There are mixed opinions on sizing.',
    },


    {
        name: 'Women Oversized Half Sleeve Solid Crop Tee Tops Asymmetrical Hem Flowy Crew-Neck Workout Cropped T-Shirt',
        category: 'women',
        price: 420,
        brand: 'Amazon',
        color: ['white', 'pink', 'red', 'grey'],
        images: {
          title: 'https://m.media-amazon.com/images/I/71GsO7b8hHL._AC_SY550_.jpg',
          others: ['https://m.media-amazon.com/images/I/41l4vR2dkNL._SX38_SY50_CR,0,0,38,50_.jpg', 'https://m.media-amazon.com/images/I/41WgK-+AjTL._SX38_SY50_CR,0,0,38,50_.jpg', 'https://m.media-amazon.com/images/I/41qZ7qY1wxL._SX38_SY50_CR,0,0,38,50_.jpg', 'https://m.media-amazon.com/images/I/31i9OAXyfEL._SX38_SY50_CR,0,0,38,50_.jpg'],
          special: 'https://m.media-amazon.com/images/S/aplus-media-library-service-media/03dc3d2a-7b6b-40a5-8018-241178ceab3c.__CR0,0,1464,600_PT0_SX1464_V1___.jpg',
        },
        best_seller: false,
        detail: [
            {first: 'Fabric type' , second: '82%Polyester 12%Rayon 6%Spandex'},
          {first: 'Care instructions', second: 'Machine Wash' },
         {first: 'Origin', second: 'Imported' },
         {first: 'Closure type', second: 'Pull On' },
        ],
         stock : 200,
         about_this_item: ['Fabrics: The Basic Tee Shirts are made with breathable, stretchy materials.Super soft and elastic, lightweight and Comfortable to wear.', 'Styling: Wear these trendy long sleeve shirts with leggings or shorts for your workout, or pair them with low-waist jeans or cargo pants for a y2k-inspired look', 'Occassion: Going out tops great for women, juniors, teens, girls. Perfect for daily casual wear, streetwear, home, school, office, street, beach, party, club, shopping, dating, holiday, vacations', 'Design: This top features a soft, comfy, and casual style with a crew neck and long sleeves. It comes in both cropped and regular styles, giving you the option to wear it as a regular top or fold it up for a trendy top look', 'Wearing: This basic shirt is a fashion clothes. It pairs perfectly with shorts, jeans, skirts, yoga pants, or cargo pants for a fashion-forward Y2K look'],
         more: [{first: 'Department', second: 'womens'}, {first: 'Date First Available', second: 'August 10, 2024'}, {first: 'ASIN', second: 'B0DCS8HD4V'}, {first: 'Best Sellers Rank', second: '#23,239 in Clothing, Shoes & Jewelry '}, ],
         description: 'Customers appreciate the sweatshirts design, quality, and softness. They find the image cute and fun, with bright colors. Many find it comfortable and well-made. However, some customers are unhappy with the fabric quality - it mentions polyester and spandex instead of cotton. There are mixed opinions on sizing.',
    },


    {
        name: 'Langwyqu Womens Tops Oversized Tshirts Summer Short Sleeve T Shirts Casual Loose Fit Basic Tees',
        category: 'women',
        price: 526,
        brand: 'Amazon',
        color: ['white', 'red', 'grey'],
        images: {
          title: 'https://m.media-amazon.com/images/I/61S4CPY9FhL._AC_SY550_.jpg',
          others: ['https://m.media-amazon.com/images/I/41GEFZ0QyaL._SX38_SY50_CR,0,0,38,50_.jpg', 'https://m.media-amazon.com/images/I/41E6XdeHHiL._SX38_SY50_CR,0,0,38,50_.jpg', 'https://m.media-amazon.com/images/I/41SoPrqrFeL._SX38_SY50_CR,0,0,38,50_.jpg', 'https://m.media-amazon.com/images/I/61E94iaxGlL._SX38_SY50_CR,0,0,38,50_.jpg'],
          special: 'https://m.media-amazon.com/images/S/aplus-media-library-service-media/06805946-1230-41a4-9b76-383ebb3facfe.__CR0,0,1464,600_PT0_SX1464_V1___.jpg',
        },
        best_seller: false,
        detail: [
            {first: 'Fabric type' , second: '82%Polyester 12%Rayon 6%Spandex'},
          {first: 'Care instructions', second: 'Machine Wash' },
         {first: 'Origin', second: 'Imported' },
         {first: 'Closure type', second: 'Pull On' },
        ],
         stock : 200,
         about_this_item: ['Fabrics: The Basic Tee Shirts are made with breathable, stretchy materials.Super soft and elastic, lightweight and Comfortable to wear.', 'Styling: Wear these trendy long sleeve shirts with leggings or shorts for your workout, or pair them with low-waist jeans or cargo pants for a y2k-inspired look', 'Occassion: Going out tops great for women, juniors, teens, girls. Perfect for daily casual wear, streetwear, home, school, office, street, beach, party, club, shopping, dating, holiday, vacations', 'Design: This top features a soft, comfy, and casual style with a crew neck and long sleeves. It comes in both cropped and regular styles, giving you the option to wear it as a regular top or fold it up for a trendy top look', 'Wearing: This basic shirt is a fashion clothes. It pairs perfectly with shorts, jeans, skirts, yoga pants, or cargo pants for a fashion-forward Y2K look'],
         more: [{first: 'Department', second: 'womens'}, {first: 'Date First Available', second: 'August 10, 2024'}, {first: 'ASIN', second: 'B0DCS8HD4V'}, {first: 'Best Sellers Rank', second: '#23,239 in Clothing, Shoes & Jewelry '}, ],
         description: 'Customers appreciate the sweatshirts design, quality, and softness. They find the image cute and fun, with bright colors. Many find it comfortable and well-made. However, some customers are unhappy with the fabric quality - it mentions polyester and spandex instead of cotton. There are mixed opinions on sizing.',
    },



    {
        name: 'Legendary Whitetails Mens Buck Camp Flannel, Long Sleeve Plaid Button Down Casual Shirt, Corduroy Cuffs',
        category: 'men',
        price: 35,
        brand: 'Amazon',
        color: ['white', 'red', 'grey'],
        images: {
          title: 'https://m.media-amazon.com/images/I/818b3hI8d9L._AC_SX679_.jpg',
          others: ['https://m.media-amazon.com/images/I/41vZkM5RS5L._SX38_SY50_CR,0,0,38,50_.jpg', 'https://m.media-amazon.com/images/I/51zWndaewoL._SX38_SY50_CR,0,0,38,50_.jpg', 'https://m.media-amazon.com/images/I/51RqA7gCtXL._SX38_SY50_CR,0,0,38,50_.jpg', 'https://m.media-amazon.com/images/I/51Vm0IjUc9L._SX38_SY50_CR,0,0,38,50_.jpg'],
          special: 'https://m.media-amazon.com/images/S/aplus-media-library-service-media/24f27b5a-2e1a-45e7-9207-1e02b5e3a613.__CR0,0,2928,1250_PT0_SX1464_V1___.png',
        },
        best_seller: false,
        detail: [
            {first: 'Fabric type' , second: '82%Polyester 12%Rayon 6%Spandex'},
          {first: 'Care instructions', second: 'Machine Wash' },
         {first: 'Origin', second: 'Imported' },
         {first: 'Closure type', second: 'Pull On' },
        ],
         stock : 200,
         about_this_item: ['Fabrics: The Basic Tee Shirts are made with breathable, stretchy materials.Super soft and elastic, lightweight and Comfortable to wear.', 'Styling: Wear these trendy long sleeve shirts with leggings or shorts for your workout, or pair them with low-waist jeans or cargo pants for a y2k-inspired look', 'Occassion: Going out tops great for men, juniors, teens, girls. Perfect for daily casual wear, streetwear, home, school, office, street, beach, party, club, shopping, dating, holiday, vacations', 'Design: This top features a soft, comfy, and casual style with a crew neck and long sleeves. It comes in both cropped and regular styles, giving you the option to wear it as a regular top or fold it up for a trendy top look', 'Wearing: This basic shirt is a fashion clothes. It pairs perfectly with shorts, jeans, skirts, yoga pants, or cargo pants for a fashion-forward Y2K look'],
         more: [{first: 'Department', second: 'womens'}, {first: 'Date First Available', second: 'August 10, 2024'}, {first: 'ASIN', second: 'B0DCS8HD4V'}, {first: 'Best Sellers Rank', second: '#23,239 in Clothing, Shoes & Jewelry '}, ],
         description: 'Customers appreciate the sweatshirts design, quality, and softness. They find the image cute and fun, with bright colors. Many find it comfortable and well-made. However, some customers are unhappy with the fabric quality - it mentions polyester and spandex instead of cotton. There are mixed opinions on sizing.',
    },

    {
        name: 'ZOCAVIA American Flag Hoodies for Men USA Graphic Hooded Sweatshirts Drawstring Western Ethnic Boys Pullover Tops',
        category: 'men',
        price: 52,
        brand: 'Amazon',
        color: ['white', 'red', 'grey'],
        images: {
          title: 'https://m.media-amazon.com/images/I/51pYLfFH3qL._AC_.jpg',
          others: ['https://m.media-amazon.com/images/I/51K1+ncg8yL._SX38_SY50_CR,0,0,38,50_.jpg', 'https://m.media-amazon.com/images/I/51ZUxe0BzLL._SX38_SY50_CR,0,0,38,50_.jpg', 'https://m.media-amazon.com/images/I/51iovuRHVmL._SX38_SY50_CR,0,0,38,50_.jpg', 'https://m.media-amazon.com/images/I/51pYLfFH3qL._AC_.jpg'],
          special: 'https://m.media-amazon.com/images/S/aplus-media-library-service-media/24f27b5a-2e1a-45e7-9207-1e02b5e3a613.__CR0,0,2928,1250_PT0_SX1464_V1___.png',
        },
        best_seller: false,
        detail: [
            {first: 'Fabric type' , second: '82%Polyester 12%Rayon 6%Spandex'},
          {first: 'Care instructions', second: 'Machine Wash' },
         {first: 'Origin', second: 'Imported' },
         {first: 'Closure type', second: 'Pull On' },
        ],
         stock : 200,
         about_this_item: ['Fabrics: The Basic Tee Shirts are made with breathable, stretchy materials.Super soft and elastic, lightweight and Comfortable to wear.', 'Styling: Wear these trendy long sleeve shirts with leggings or shorts for your workout, or pair them with low-waist jeans or cargo pants for a y2k-inspired look', 'Occassion: Going out tops great for men, juniors, teens, girls. Perfect for daily casual wear, streetwear, home, school, office, street, beach, party, club, shopping, dating, holiday, vacations', 'Design: This top features a soft, comfy, and casual style with a crew neck and long sleeves. It comes in both cropped and regular styles, giving you the option to wear it as a regular top or fold it up for a trendy top look', 'Wearing: This basic shirt is a fashion clothes. It pairs perfectly with shorts, jeans, skirts, yoga pants, or cargo pants for a fashion-forward Y2K look'],
         more: [{first: 'Department', second: 'womens'}, {first: 'Date First Available', second: 'August 10, 2024'}, {first: 'ASIN', second: 'B0DCS8HD4V'}, {first: 'Best Sellers Rank', second: '#23,239 in Clothing, Shoes & Jewelry '}, ],
         description: 'Customers appreciate the sweatshirts design, quality, and softness. They find the image cute and fun, with bright colors. Many find it comfortable and well-made. However, some customers are unhappy with the fabric quality - it mentions polyester and spandex instead of cotton. There are mixed opinions on sizing.',
    },

    {
        name: 'COOFANDY Mens Linen Shirts Short Sleeve Casual Shirts Button Down Shirt for Men Beach Summer Wedding Shirt',
        category: 'men',
        price: 134,
        brand: 'Amazon',
        color: ['white', 'red', 'grey'],
        images: {
          title: 'https://m.media-amazon.com/images/I/81Y6r7df7OL._AC_SY550_.jpg',
          others: ['https://m.media-amazon.com/images/I/31xowI+XzzL._SX38_SY50_CR,0,0,38,50_.jpg', 'https://m.media-amazon.com/images/I/31FYMuh+v0L._SX38_SY50_CR,0,0,38,50_.jpg', 'https://m.media-amazon.com/images/I/319YPyOqUFL._SX38_SY50_CR,0,0,38,50_.jpg', 'https://m.media-amazon.com/images/I/81Y6r7df7OL._AC_SY550_.jpg'],
          special: 'https://m.media-amazon.com/images/S/aplus-media-library-service-media/a606e9b6-d141-40de-bbe8-3a25ce1664a6.__CR0,0,1464,600_PT0_SX1464_V1___.jpg',
        },
        best_seller: true,
        detail: [
            {first: 'Fabric type' , second: '82%Polyester 12%Rayon 6%Spandex'},
          {first: 'Care instructions', second: 'Machine Wash' },
         {first: 'Origin', second: 'Imported' },
         {first: 'Closure type', second: 'Pull On' },
        ],
         stock : 200,
         about_this_item: ['Fabrics: The Basic Tee Shirts are made with breathable, stretchy materials.Super soft and elastic, lightweight and Comfortable to wear.', 'Styling: Wear these trendy long sleeve shirts with leggings or shorts for your workout, or pair them with low-waist jeans or cargo pants for a y2k-inspired look', 'Occassion: Going out tops great for men, juniors, teens, girls. Perfect for daily casual wear, streetwear, home, school, office, street, beach, party, club, shopping, dating, holiday, vacations', 'Design: This top features a soft, comfy, and casual style with a crew neck and long sleeves. It comes in both cropped and regular styles, giving you the option to wear it as a regular top or fold it up for a trendy top look', 'Wearing: This basic shirt is a fashion clothes. It pairs perfectly with shorts, jeans, skirts, yoga pants, or cargo pants for a fashion-forward Y2K look'],
         more: [{first: 'Department', second: 'womens'}, {first: 'Date First Available', second: 'August 10, 2024'}, {first: 'ASIN', second: 'B0DCS8HD4V'}, {first: 'Best Sellers Rank', second: '#23,239 in Clothing, Shoes & Jewelry '}, ],
         description: 'Customers appreciate the sweatshirts design, quality, and softness. They find the image cute and fun, with bright colors. Many find it comfortable and well-made. However, some customers are unhappy with the fabric quality - it mentions polyester and spandex instead of cotton. There are mixed opinions on sizing.',
    },

    {
        name: 'Sailwind Mens Henley Short Sleeve T-Shirt Cotton Casual Shirt',
        category: 'men',
        price: 210,
        brand: 'Amazon',
        color: ['white', 'black', 'oranbe'],
        images: {
          title: 'https://m.media-amazon.com/images/I/71e48dWFu-S._AC_SY741_.jpg',
          others: ['https://m.media-amazon.com/images/I/41JzzwzKPvS._SX38_SY50_CR,0,0,38,50_.jpg', 'https://m.media-amazon.com/images/I/31lp2iSGtaL._SX38_SY50_CR,0,0,38,50_.jpg', 'https://m.media-amazon.com/images/I/41OiSDJAqMS._SX38_SY50_CR,0,0,38,50_.jpg', 'https://m.media-amazon.com/images/I/71e48dWFu-S._AC_SY741_.jpg'],
          special: 'https://m.media-amazon.com/images/S/aplus-media-library-service-media/a606e9b6-d141-40de-bbe8-3a25ce1664a6.__CR0,0,1464,600_PT0_SX1464_V1___.jpg',
        },
        best_seller: true,
        detail: [
            {first: 'Fabric type' , second: '82%Polyester 12%Rayon 6%Spandex'},
          {first: 'Care instructions', second: 'Machine Wash' },
         {first: 'Origin', second: 'Imported' },
         {first: 'Closure type', second: 'Pull On' },
        ],
         stock : 200,
         about_this_item: ['Fabrics: The Basic Tee Shirts are made with breathable, stretchy materials.Super soft and elastic, lightweight and Comfortable to wear.', 'Styling: Wear these trendy long sleeve shirts with leggings or shorts for your workout, or pair them with low-waist jeans or cargo pants for a y2k-inspired look', 'Occassion: Going out tops great for men, juniors, teens, girls. Perfect for daily casual wear, streetwear, home, school, office, street, beach, party, club, shopping, dating, holiday, vacations', 'Design: This top features a soft, comfy, and casual style with a crew neck and long sleeves. It comes in both cropped and regular styles, giving you the option to wear it as a regular top or fold it up for a trendy top look', 'Wearing: This basic shirt is a fashion clothes. It pairs perfectly with shorts, jeans, skirts, yoga pants, or cargo pants for a fashion-forward Y2K look'],
         more: [{first: 'Department', second: 'womens'}, {first: 'Date First Available', second: 'August 10, 2024'}, {first: 'ASIN', second: 'B0DCS8HD4V'}, {first: 'Best Sellers Rank', second: '#23,239 in Clothing, Shoes & Jewelry '}, ],
         description: 'Customers appreciate the sweatshirts design, quality, and softness. They find the image cute and fun, with bright colors. Many find it comfortable and well-made. However, some customers are unhappy with the fabric quality - it mentions polyester and spandex instead of cotton. There are mixed opinions on sizing.',
    },

              

])
  res.json('ok')
});

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

app.post("/add-local-to-cart", async (req, res) => {
  try {
    const { uId, cartLocal } = req.body;
    const add = await User.findByIdAndUpdate(
      uId,
      { $push: { cart:  cartLocal  } },
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

app.post("/get-cart-length", async (req, res) => {
  const { uId } = req.body;
    const user = await User.findOne({ _id: uId })
    res.json(user.cart.length)
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

app.post("/get-cart-local", async (req, res) => {
  const { cartLocal } = req.body;
  try {
    let arr = [];
    cartLocal.map((ev) => {
      arr.push(ev.pId);
    });
    const find = await Product.find({ _id: arr });
    console.log('find', find);
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
  try{
    const { history } = req.body;
    const get = await Product.find({ _id: history }).limit(4)
    res.json(get);
  } catch(err){
    return res.status(500).json(err.message)
  }
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

app.listen(4014, console.log("Connected to 4000"));
