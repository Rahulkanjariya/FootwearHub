const express = require('express');
const router = express.Router();
const addressController = require('../../../../../controllers/Api/v1/backend/addressController');

router.get('/customerAddress', addressController.list);

module.exports = router;


