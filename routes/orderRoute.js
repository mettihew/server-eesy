import express from "express"
const router = express.Router()
import {  createOrder, deleteCart, deleteOrder, getOrder  } from "../controllers/orderCtrl.js"

router.post("/order/order", createOrder)
router.post("/order/get-order", getOrder)
router.delete("/order/delete-order", deleteOrder)
router.delete("/order/delete-cart", deleteCart)

export default router