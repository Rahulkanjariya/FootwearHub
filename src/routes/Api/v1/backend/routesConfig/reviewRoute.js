const express = require('express');
const router = express.Router();
const reviewController = require('../../../../../controllers/Api/v1/backend/reviewController');

router.get('/review', reviewController.list);

module.exports = router;
