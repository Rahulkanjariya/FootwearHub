"use strict";

const services = require("../../../../helpers/index");
const Msg = require("../../../../helpers/localization");
const { HttpStatus } = require("../../../../errors/code");
const couponRepo = require("../../../../data-access/couponRepo");
const moment = require("moment");

module.exports = {
    /**
     * This function will create a new coupon with the provided information
     * 
     * @param {string} req.body.code -The code of the coupon
     * @param {string} req.body.description -The description of the coupon
     * @param {number} req.body.discount -The amount of discount
     * @param {string} req.body.expiryDate -The expiry date of the coupon
     * @param {number} req.body.maxUses -The maximum number of uses for the coupon
     * @param {number} req.body.usedCount -The count of how many times the coupon has been used
     * @returns Create coupon and return new coupon id
     */
    addCoupon: async function (req, res) {
        try {
            if (services.hashValidatorErrors(req, res)) {
                return;
            }

            const existingCoupon = await couponRepo.getDetail({ code: req.body.code });
            if (existingCoupon) {
                return res.send(
                    services.prepareResponse(
                        HttpStatus.CONFLICT,
                        Msg.COUPON_CODE_ALREADY_EXIST
                    )
                )
            }
            
            const couponDetail = {
                code: req.body.code,
                description: req.body.description,
                discount: req.body.discount,
                expiryDate: moment(req.body.expiryDate, "DD-MM-YYYY").valueOf(),
                maxUses: req.body.maxUses,
                usedCount: req.body.usedCount,
            };
            
            const newCoupon = await couponRepo.create(couponDetail);
            return res.send(
                services.prepareResponse(
                    HttpStatus.CREATED,
                    Msg.COUPON_CREATED,
                    { id: newCoupon.id }
                )
            );

        } catch (error) {
            return res.send(
                services.prepareResponse(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    Msg.SERVER_ERROR
                )
            );
        }
    },

    /**
     * This function will list of all coupon
     *
     * @param {number} page -The page term
     * @param {number} perPage -The number of record per page
     */
    listCoupon : async function (req,res) {
        try {
            if (services.hashValidatorErrors(req, res)) {
                return;
            }

            const { perPage, page, skip } = services.parsePagination(req.query);
            const { list, total } = await couponRepo.list(skip, perPage);
            const totalPages = Math.ceil(total / perPage);

            return res.send(
                services.prepareResponse(
                    HttpStatus.OK,
                    Msg.SUCCESS,
                    {
                        coupon: list,
                        page: page + 1,
                        perPage: perPage,
                        totalRecords: total,
                        totalPages: totalPages,
                    }
                )
            );
            
        } catch (error) {
            return res.send(
                services.prepareResponse(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    Msg.SERVER_ERROR
                )
            );
        }
    },

    /**
     * This function will return coupon detail by id
     * 
     * @param {string} req.params.id -The id of the coupon
     * @returns Return coupon detail by id
     */
    couponDetail : async function (req,res) {
        try {
            if (services.hashValidatorErrors(req, res)) {
                return;
            }

            const couponId = req.params.id;

            const couponInfo = await couponRepo.getDetail({ _id:couponId });
            if (!couponInfo) {
                return res.send(
                    services.prepareResponse(
                        HttpStatus.NOT_FOUND,
                        Msg.COUPON_NOT_FOUND
                    )
                );
            }
            return res.send(
                services.prepareResponse(
                    HttpStatus.OK,
                    Msg.SUCCESS,
                    { couponInfo }
                )
            );

        } catch (error) {
            return res.send(
                services.prepareResponse(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    Msg.SERVER_ERROR
                )
            );
        }
    },
    
    /**
     * This function will delete coupon by id
     * 
     * @param {string} req.params.id -The id of the coupon
     * @returns Delete coupon by id
     */
    deleteCoupon : async function (req,res) {
        try {
            if (services.hashValidatorErrors(req, res)) {
                return;
            }

            const couponId = req.params.id;

            const deleteCoupon = await couponRepo.deleteCoupon(couponId);
            if (!deleteCoupon) {
                return res.send(
                    services.prepareResponse(
                        HttpStatus.NOT_FOUND,
                        Msg.COUPON_NOT_FOUND
                    )
                );
            }
            return res.send(
                services.prepareResponse(
                    HttpStatus.NO_CONTENT,
                    Msg.COUPON_DELETED
                )
            );

        } catch (error) {
            return res.send(
                services.prepareResponse(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    Msg.SERVER_ERROR
                )
            );
        }
    }
}