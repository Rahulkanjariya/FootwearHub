const express = require('express');
const router = express.Router();
const brandController = require('../../../../../controllers/Api/v1/backend/brandController');

router.get('/brand', brandController.list);

router.get('/addBrand', (req, res) => {
    res.render('admin/addBrand', { title: 'FootwearHub' });
});

router.post('/addBrand', brandController.add);

router.get('/brand/edit/:id', brandController.edit);

router.post('/brand/edit/:id', brandController.update);

router.post('/brand/delete/:id', brandController.delete);

module.exports = router;
