"use strict";

const services = require("../../../../helpers/index");
const Msg = require("../../../../helpers/localization");
const { HttpStatus } = require("../../../../errors/code");
const shipmentRepo = require("../../../../data-access/shipmentRepo");

module.exports = {
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