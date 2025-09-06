const express = require('express');
const router = express.Router();
// const Product = require('../models/productsModels');
const {createProducts, getAllProducts, updateProducts, DeleteProducts} = require('../contoller/productController');


router.post('/', createProducts);
router.get('/', getAllProducts);
router.put('/:id', updateProducts);
router.delete('/:id', DeleteProducts);


module.exports = router;