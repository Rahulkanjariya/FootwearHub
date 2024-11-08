const couponModel = require('../../../../models/coupon');
const { HttpStatus } = require("../../../../errors/code");
const Msg = require("../../../../helpers/localization");
const Service = require("../../../../helpers/index");
const moment = require('moment');

module.exports = {
    /**
     * List all coupons
     */
    list: async function (req, res, next) {
        try {
            const page = parseInt(req.query.page) || 1;
            const itemsPerPage = parseInt(req.query.limit) || 10;
            const skip = (page - 1) * itemsPerPage;
            const searchQuery = req.query.search || '';
    
            // Construct the search filter
            const searchFilter = searchQuery ? {
                $or: [
                    { code: { $regex: searchQuery, $options: 'i' } },
                ]
            } : {};
    
            const totalCoupons = await couponModel.countDocuments(searchFilter);
    
            const coupons = await couponModel.find(searchFilter)
                .skip(skip)
                .limit(itemsPerPage);
    
            const totalPages = Math.ceil(totalCoupons / itemsPerPage);
    
            res.render('admin/coupon', {
                title: 'FootwearHub',
                coupons, 
                currentPage: page,    
                totalPages, 
                itemsPerPage,
                searchQuery,
                moment
            });
    
        } catch (error) {
            console.error('Error listing coupons:', error);
            next(error);
        }
    },
    

    /**
     * Add new coupon
     */
    add: async function (req, res, next) {
        try {
            if (Service.hasValidatorErrorsBackend(req, res)) {
                return;
            }
    
            const { code, description, discount, expiryDate, maxUses } = req.body;
    
            const couponExist = await couponModel.findOne({ code }).exec();
            if (couponExist) {
                return res.status(HttpStatus.BAD_REQUEST).send({ 'message': Msg.COUPON_EXISTS });
            }

            const expiryDateTimestamp = moment(expiryDate).valueOf();

            const newCoupon = new couponModel({
                code,
                description,
                discount,
                expiryDate: expiryDateTimestamp,
                maxUses,
                usedCount: 0
            });

            await newCoupon.save();
            return res.redirect('/admin/coupon');
        } catch (error) {
            console.error('Error adding coupon:', error);
            next(error);
        }
    },
    

    /**
     * Delete coupon
     */
    delete: async function (req, res, next) {
        try {
            const { id } = req.params;

            const coupon = await couponModel.findByIdAndDelete(id);

            if (!coupon) {
                return res.status(HttpStatus.NOT_FOUND).send({ 'message': Msg.COUPON_NOT_FOUND });
            }

            return res.redirect('/admin/coupon');
        } catch (error) {
            console.error('Error deleting coupon:', error);
            next(error);
        }
    }
};
