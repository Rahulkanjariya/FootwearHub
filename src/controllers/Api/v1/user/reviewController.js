"use strict";

const services = require("../../../../helpers/index");
const Msg = require("../../../../helpers/localization");
const { HttpStatus } = require("../../../../errors/code");
const reviewRepo = require("../../../../data-access/reviewRepo");

module.exports = {
    /**
     * This function will create a new review with the provided information
     * 
     * @param {string} req.body.userId -The id of the user
     * @param {string} req.body.productId -The id of the product
     * @param {number} req.body.rating -The rating given by the user
     * @param {string} req.body.comment -The comment provided by the user
     * @returns Review create and return new review id 
     */
    addReview : async function (req,res) {
        try {
            if (services.hashValidatorErrors(req, res)) {
                return;
            }

            const reviewDetail = {
                userId: req.body.userId,
                productId: req.body.productId,
                rating: req.body.rating,
                comment: req.body.comment,
            };

            const newReview = await reviewRepo.create(reviewDetail);
            return res.send(
                services.prepareResponse(
                    HttpStatus.CREATED,
                    Msg.DATA_SAVED,
                    { id: newReview.id }
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
     * This function will list of all review
     *
     * @param {number} req.query.page -The page number
     * @param {number} req.query.perPage -The number of record per page
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
     * @return Return review detail by id
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

    /**
     * This function will update a review with the provided information
     * 
     * @param {string} req.params.id -The id of the review
     * @param {string} req.body.userId -The id of the user
     * @param {string} req.body.productId -The id of the product
     * @param {number} req.body.rating -The rating given by the user
     * @param {string} req.body.comment -The comment provided by the user
     * @returns Update review and return new review id
     */
    updateReview : async function (req,res) {
        try {
            if (services.hashValidatorErrors(req, res)) {
                return;
            }
            
            const reviewId = req.params.id;

            const existReview = await reviewRepo.getDetail({ _id:reviewId });
            if (!existReview) {
                return res.send(
                    services.prepareResponse(
                        HttpStatus.NOT_FOUND,
                        Msg.REVIEWS_NOT_FOUND
                    )
                );
            }
            const reviewDetail = {
                userId: req.body.userId,
                productId: req.body.productId,
                rating: req.body.rating,
                comment: req.body.comment,
            };

            const updatedReview = await reviewRepo.update(reviewId,reviewDetail);
            return res.send(
                services.prepareResponse(
                    HttpStatus.OK,
                    Msg.DATA_SAVED,
                    { id: updatedReview.id }
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
     * This function will delete review by Id
     * 
     * @param {string} req.params.id -The id of the review
     * @returns Delete review detail by id
     */
    deleteReview : async function (req,res) {
        try {
            if (services.hashValidatorErrors(req, res)) {
                return;
            }

            const reviewId = req.params.id;

            const deleteReview = await reviewRepo.deleteReview(reviewId);
            if (!deleteReview) {
                return res.send(
                    services.prepareResponse(
                        HttpStatus.NOT_FOUND,
                        Msg.REVIEWS_NOT_FOUND
                    )
                );
            }
            return res.send(
                services.prepareResponse(
                    HttpStatus.NO_CONTENT,
                    Msg.DATA_DELETED,
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