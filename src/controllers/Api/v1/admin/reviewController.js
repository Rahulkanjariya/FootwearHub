"use strict";

const services = require("../../../../helpers/index");
const Msg = require("../../../../helpers/localization");
const { HttpStatus } = require("../../../../errors/code");
const reviewRepo = require("../../../../data-access/reviewRepo");

module.exports = {
     /**
     * This function will list of all review
     *
     * @param {number} page -The page term
     * @param {number} perPage -The number of record per page
     * @returns Return all review list
     */
    listReview : async function (req,res) {
        try {
            if (services.hashValidatorErrors(req, res)) {
                return;
            }

            const { perPage, page, skip } = services.parsePagination(req.query);
            const { list, total } = await reviewRepo.list(skip, perPage);
            const totalPages = Math.ceil(total / perPage);

            return res.send(
                services.prepareResponse(
                    HttpStatus.OK,
                    Msg.SUCCESS,
                    {
                        review: list,
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
     * This function will return review detail by id
     * 
     * @param {string} req.params.id -The id of the review
     * @returns Return review detail by id
     */
    reviewDetail : async function (req,res) {
        try {
            if (services.hashValidatorErrors(req, res)) {
                return;
            }
            
            const reviewId = req.params.id;

            const review = await reviewRepo.getDetail({ _id:reviewId });
            if (!review) {
                return res.send(
                    services.prepareResponse(
                        HttpStatus.NOT_FOUND,
                        Msg.REVIEWS_NOT_FOUND
                    )
                );
            }
            return res.send(
                services.prepareResponse(
                    HttpStatus.OK,
                    Msg.SUCCESS,
                    { review }
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