const express = require('express');
const router = express.Router();
const categoryController = require('../../../../../controllers/Api/v1/backend/categoryController');

router.get('/category', categoryController.list);

router.get('/addCategory', (req, res) => {
    res.render('admin/addCategory',{ title:'FootwearHub'}); 
});

router.post('/addCategory', categoryController.add);

router.get('/category/edit/:id', categoryController.edit); 

router.post('/category/edit/:id', categoryController.update);

router.post('/category/delete/:id', categoryController.delete);

module.exports = router;
