const express = require('express');
const router = express.Router();
const couponController = require('../../../../../controllers/Api/v1/backend/couponController');

router.get('/coupon', couponController.list);

router.get('/addCoupon', (req, res) => {
    res.render('admin/addCoupon', { title: 'FootwearHub' });
});

router.post('/addCoupon', couponController.add);

router.post('/coupon/delete/:id', couponController.delete);

module.exports = router;
