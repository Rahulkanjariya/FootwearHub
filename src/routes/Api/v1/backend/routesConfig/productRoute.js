const express = require('express');
const router = express.Router();
const productController = require('../../../../../controllers/Api/v1/backend/productController');

router.get('/product', productController.list);

router.get('/addProduct/add', productController.addForm);

router.post('/product', productController.add);

router.get('/product/edit/:id', productController.edit);

router.post('/product/edit/:id', productController.update);

router.post('/product/delete/:id', productController.delete);

module.exports = router;
