import express from 'express'
const router = express.Router()
import {  getProducts, getOneProduct,search , addProducts, getFavorites, getCategory, reviewRating, getUserCartProducts, homeCat } from '../controllers/productCtrl.js'

router.post('/home-cat', homeCat)
router.get('/get', getProducts)
router.get('/add', addProducts)
router.post('/category', getCategory)
router.post('/s', search)
router.post('/get-one/:id', getOneProduct)
router.post('/get-favorites', getFavorites)
router.post('/review', reviewRating)
router.post('/get-user-cart', getUserCartProducts)


export default router