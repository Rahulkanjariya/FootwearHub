const express = require('express');
const router = express.Router();
const subcategoryController = require('../../../../../controllers/Api/v1/backend/subcategoryController');

// const { adminAuth } = require('../../middlewares/auth');

router.get('/subCategory', subcategoryController.list);

router.get('/subCategory/add', subcategoryController.addForm);

router.post('/subCategory', subcategoryController.add);

router.get('/subCategory/edit/:id', subcategoryController.edit);

router.post('/subCategory/edit/:id', subcategoryController.update);

router.post('/subCategory/delete/:id', subcategoryController.delete);

module.exports = router;
