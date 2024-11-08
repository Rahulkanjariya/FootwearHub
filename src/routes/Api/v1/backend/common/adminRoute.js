const express = require("express");
const router = express.Router();

const indexRoute = require('../routesConfig/index');
const customerRoute = require('../routesConfig/customerRoute');
const addressRoute = require("../routesConfig/addressRoute");
const categoryRoute = require('../routesConfig/categoryRoute');
const subcategoryRoute = require('../routesConfig/subcategoryRoute');
const brandRoute = require("../routesConfig/brandRoute");
const productRoute = require("../routesConfig/productRoute");

const couponRoute = require("../routesConfig/couponRoute");

const reviewRoute = require("../routesConfig/reviewRoute");

// Use routes
router.use('/admin', indexRoute);
router.use('/admin', customerRoute);
router.use('/admin', addressRoute);
router.use('/admin', categoryRoute);
router.use('/admin', subcategoryRoute);
router.use('/admin', brandRoute);
router.use("/admin", productRoute);

router.use("/admin", couponRoute);

router.use('/admin', reviewRoute);

module.exports = router;
