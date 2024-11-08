"use strict";

const services = require("../../../../helpers/index");
const Msg = require("../../../../helpers/localization");
const { HttpStatus } = require("../../../../errors/code");
const orderRepo = require("../../../../data-access/orderRepo");

module.exports = {
    /**
     * This function will list of all order
     *
     * @param {number} page -The page term
     * @param {number} perPage -The number of record per page
     * @returns Return all order list
     */
    listOrder : async function (req,res) {
        try {
            if (services.hashValidatorErrors(req, res)) {
                return;
            }

            const { perPage, page, skip } = services.parsePagination(req.query);

            let sort = {};
            if (req.query.sortBy) {
                sort[req.query.sortBy] = req.query.sortOrder === 'desc' ? -1 : 1;
            }
            
            const { list, total } = await orderRepo.list(skip, perPage);
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
     * Update the status of a specific order
     * 
     * @param {string} req.params.id -The id of the order
     * @param {number} orderStatus -Status of the order
     * @returns Update order status and return id 
     */
    updateStatus: async function (req, res) {
        try {
            if (services.hashValidatorErrors(req, res)) {
                return;
            }
            
            const orderId = req.params.id;

            const existingOrder = await orderRepo.getDetail({ _id:orderId });
            if (!existingOrder) {
                return res.send(
                    services.prepareResponse(
                        HttpStatus.NOT_FOUND,
                        Msg.ORDER_NOT_FOUND
                    )
                );
            }

            const orderInfo = {
                orderStatus: req.body.orderStatus
            };

            const orderStatus = await orderRepo.updateStatus(orderId,orderInfo)
            return res.send(
                services.prepareResponse(
                    HttpStatus.OK,
                    Msg.ORDER_STATUS,
                    { id: orderStatus.id }
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
}