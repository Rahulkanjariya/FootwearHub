const express = require('express');
const router = express.Router();
const customerController = require('../../../../../controllers/Api/v1/backend/customerController');

router.get('/customer', customerController.list);

router.post('/customer/delete/:id', customerController.delete);

module.exports = router;
