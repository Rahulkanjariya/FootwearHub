"use strict";

const services = require("../../../../helpers/index");
const Msg = require("../../../../helpers/localization");
const { HttpStatus } = require("../../../../errors/code");
const orderRepo = require("../../../../data-access/orderRepo");
const productRepo = require("../../../../data-access/productRepo");
const addressRepo = require("../../../../data-access/addressRepo");
const couponRepo = require("../../../../data-access/couponRepo");

module.exports = {
    /**
     * This function will create a new place order with the provided information
     * 
     * @param {string} req.body.userId -The id of the user
     * @param {string} req.body.productId -The id of the product
     * @param {number} req.body.quantity -The quantity of the product
     * @param {number} req.body.price -The price of the product
     * @param {number} req.body.totalAmount -The total amount of the order
     * @param {number} req.body.orderStatus -The order status of the product
     * @param {number} req.body.paymentMethod -The payment method of the order
     * @param {number} req.body.paymentStatus -The payment status of the order
     * @param {string} req.body.addressId -The id of the address for the order
     * @returns Order create and return new order id
     */
    placeNewOrder: async function (req, res) {
        try {
            if (services.hashValidatorErrors(req, res)) {
                return;
            }

            const product = await productRepo.getDetail({ _id:req.body.productId });
            if (!product) {
                return res.send(
                    services.prepareResponse(
                        HttpStatus.NOT_FOUND,
                        Msg.PRODUCT_NOT_FOUND
                    )
                );
            }

            const address = await addressRepo.getDetail({ _id:req.body.addressId });
            if (!address) {
                return res.send(
                    services.prepareResponse(
                        HttpStatus.NOT_FOUND,
                        Msg.USER_ADDRESS_NOT_FOUND
                    )
                )
            }

            const price = product.price;
            const quantity = req.body.quantity;
            const totalAmount = price * quantity;

            const orderDetail = {
                userId: req.authUser.id,
                productId: req.body.productId,
                quantity: req.body.quantity,
                totalAmount: totalAmount,
                paymentMethod: req.body.paymentMethod,
                orderStatus: req.body.orderStatus,
                paymentStatus: req.body.paymentStatus,
                addressId: req.body.addressId,
            };

            const newOrder = await orderRepo.placeNewOrder(orderDetail);
            return res.send(
                services.prepareResponse(
                    HttpStatus.CREATED,
                    Msg.ORDER_PLACED,
                    { id: newOrder.id }
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

    applyCoupon: async function (req,res) {
        try {
            if (services.hashValidatorErrors(req,res)) {
                return;
            }

            const { orderId,couponId } = req.body;

            const order = await orderRepo.getDetail({ _id:orderId });
            if (!order) {
                return res.send(
                    services.prepareResponse(
                        HttpStatus.NOT_FOUND,
                        Msg.ORDER_NOT_FOUND
                    )
                )
            }

            let discount = 0;

            if (req.body.couponId) {
                const coupon = await couponRepo.getDetail({ _id:couponId });
                if (!coupon) {
                    return res.send(
                        services.prepareResponse(
                            HttpStatus.BAD_REQUEST,
                            Msg.INVALID_COUPON
                        )
                    );
                }

                const currentDate = new Date();
                const couponExpiryDate = new Date(coupon.expiryDate);
                if (currentDate > couponExpiryDate) {
                    return res.send(
                        services.prepareResponse(
                            HttpStatus.BAD_REQUEST,
                            Msg.COUPON_EXPIRED
                        )
                    );
                }

                if (coupon.usedCount >= coupon.maxUses) {
                    return res.send(
                        services.prepareResponse(
                            HttpStatus.BAD_REQUEST,
                            Msg.COUPON_MAX_USES
                        )
                    );
                }
                discount = coupon.discount;
                await couponRepo.updateCouponUsage(req.body.couponId);
            }
            
            const discountAmount = discount;
            const totalAmount = (order.totalAmount) - discount;

            await orderRepo.updateOrder(orderId, { totalAmount });

            return res.send(
                services.prepareResponse(
                    HttpStatus.OK,
                    Msg.COUPON_APPLIED,
                    {
                        discountAmount,
                        totalAmount
                    }
                )
            )
            
        } catch (error) {
            return res.send(
                services.prepareResponse(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    Msg.SERVER_ERROR
                )
            )
        }
    },

    /**
     * This function will list of all order
     *
     * @param {number} req.query.page -The page number
     * @param {number} req.query.perPage -The number of record per page
     * @returns Return all order list
     */
    listOrder : async function (req,res) {
        try {
            if (services.hashValidatorErrors(req, res)) {
                return;
            }
            
            const userId = req.authUser._id;
            const { perPage, page, skip } = services.parsePagination(req.query);
            const { list, total } = await orderRepo.list(userId, skip, perPage);
            const totalPages = Math.ceil(total / perPage);
            
            res.send(
                services.prepareResponse(
                    HttpStatus.OK,
                    Msg.SUCCESS,
                    {
                        order: list,
                        page: page + 1,
                        perPage: perPage,
                        totalRecords: total,
                        totalPages: totalPages
                    }
                )
            );

        } catch (error){
            return res.send(
                services.prepareResponse(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    Msg.SERVER_ERROR
                )
            );
        }
    },

    /**
     * This function will return order detail by id
     * 
     * @param {string} req.params.id -The id of the order
     * @return Return order detail by id
     */
    orderDetail : async function (req,res) {
        try {
            if (services.hashValidatorErrors(req, res)) {
                return;
            }

            const orderId = req.params.id;
            
            const orderInfo = await orderRepo.getDetail({ _id:orderId });
            if (!orderInfo) {
                return res.send(
                    services.prepareResponse(
                        HttpStatus.NOT_FOUND,
                        Msg.ORDER_NOT_FOUND
                    )
                );
            }
            return res.send(
                services.prepareResponse(
                    HttpStatus.OK,
                    Msg.SUCCESS,
                    { orderInfo }
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
     * This function will return order cancel by id
     * 
     * @param {string} req.params.id -The id of the order
     * @return Return order cancel by id
     */
    cancelOrder : async function (req,res) {
        try {
            if (services.hashValidatorErrors(req, res)) {
                return;
            }

            const orderId = req.params.id;

            const updatedOrder = await orderRepo.cancelOrder(orderId);
            if (!updatedOrder) {
                return res.send(
                    services.prepareResponse(
                        HttpStatus.NOT_FOUND,
                        Msg.ORDER_NOT_FOUND
                    )
                )
            }
            return res.send(
                services.prepareResponse(
                    HttpStatus.OK,
                    Msg.ORDER_CANCELLED
                )
            )

        } catch (error) {
            return res.send(
                services.prepareResponse(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    Msg.SERVER_ERROR
                )
            )
        }
    },
    
}

