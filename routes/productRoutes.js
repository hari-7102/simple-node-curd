const express = require('express');
const router = express.Router();
// const Product = require('../models/productsModels');
const {createProducts, getAllProducts, updateProducts, DeleteProducts} = require('../contoller/productController');
const { adminOnly  ,  authMiddleware} = require('../authenicateMiddleware/authMiddleware');



router.post('/',authMiddleware, adminOnly, createProducts);
router.get('/',authMiddleware, getAllProducts);
router.put('/:id',authMiddleware, updateProducts);
router.delete('/:id',authMiddleware, DeleteProducts);

 
module.exports = router


