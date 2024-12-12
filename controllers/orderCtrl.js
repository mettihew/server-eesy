import Order from "../models/orderModel.js"
import Cart from "../models/cartModel.js"
import asyncHandler from "express-async-handler"

export const createOrder = asyncHandler(async(req, res) => {
    try {
        const createOrder = await Order.create({order: req.body})
        res.json(createOrder)
    } catch (error) {
        throw new Error(error)
    }
})

export const getOrder = asyncHandler(async(req, res) => {
    try {
        const get = await Order.find()
        res.json(get)
    } catch (error) {
        throw new Error(error)
    }
})
export const deleteOrder = asyncHandler(async(req, res) => {
    try {
        // const get = await Order.deleteMany()
        res.json(get)
    } catch (error) {
        throw new Error(error)
    }
})

export const deleteCart = asyncHandler(async(req, res) => {
    try {
        // const del = await Cart.deleteMany()
        res.json(del)
    } catch (error) {
        throw new Error(error)
    }
})
