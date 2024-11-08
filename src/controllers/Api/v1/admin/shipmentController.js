"use strict";

const moment = require("moment");
const services = require("../../../../helpers/index");
const Msg = require("../../../../helpers/localization");
const { HttpStatus } = require("../../../../errors/code");
const shipmentRepo = require("../../../../data-access/shipmentRepo");

module.exports = {
    /**
    * This function create a new shipment with the provided information
    * 
    * @param {string} req.body.orderId -The id of the order
    * @param {number} req.body.status -The status of the shipment
    * @param {string} req.body.trackingNumber -The tracking number of the shipment
    * @param {string} req.body.estimatedDelivery -The estimated delivery date
    * @returns Shipment create and return new shipment id
    */
    addShipment: async function (req, res) {
        try {
            if (services.hashValidatorErrors(req, res)) {
                return;
            }

            const shipmentDetail = {
                orderId: req.body.orderId,
                status: req.body.status,
                trackingNumber: req.body.trackingNumber,
                estimatedDelivery: moment(req.body.estimatedDelivery, "DD-MM-YYYY").valueOf(),
            };

            const newShipment = await shipmentRepo.create(shipmentDetail);
            return res.send(
                services.prepareResponse(
                    HttpStatus.CREATED,
                    Msg.SHIPMENT_CREATED,
                    { id: newShipment.id }
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
    * This function update the status of a shipment
    * 
    * @param {string} req.params.id -The id of the shipment
    * @param {number} req.body.status -The new status of the shipment
    * @returns Update shipment status and return updated shipment id
    */
    updateShipmentStatus: async function (req, res) {
        try {
            if (services.hashValidatorErrors(req, res)) {
                return;
            }

            const shipmentId = req.params.id;
            
            const existingShipment = await shipmentRepo.getDetail({ _id:shipmentId });
            if (!existingShipment) {
                return res.send(
                    services.prepareResponse(
                        HttpStatus.NOT_FOUND,
                        Msg.SHIPMENT_NOT_FOUND
                    )
                );
            }

            const { status } = req.body;
            const updatedShipment = await shipmentRepo.updateStatus(shipmentId, { status });

            return res.send(
                services.prepareResponse(
                    HttpStatus.OK,
                    Msg.SHIPMENT_STATUS_UPDATED,
                    { id: updatedShipment._id }
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
     * This function return shipment detail by id
     * 
     * @param {string} req.params.id -The id of the shipment
     * @returns Return shipment detail by id
     */
    shipmentDetail: async function (req, res) {
        try {
            if (services.hashValidatorErrors(req, res)) {
                return;
            }

            const shipmentId = req.params.id;

            const shipmentInfo = await shipmentRepo.getDetail({ _id:shipmentId });
            if (!shipmentInfo) {
                return res.send(
                    services.prepareResponse(
                        HttpStatus.NOT_FOUND,
                        Msg.SHIPMENT_NOT_FOUND
                    )
                );
            }
            return res.send(
                services.prepareResponse(
                    HttpStatus.OK,
                    Msg.SUCCESS,
                    { shipmentInfo }
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