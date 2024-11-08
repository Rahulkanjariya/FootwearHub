"use strict";

const HttpStatus = {
    CREATED: 201,
    OK: 200,
    NO_CONTENT: 204,
    
    // Client Error
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,

    // Server Error
    INTERNAL_SERVER_ERROR: 500,
    REQUIRED_CODE: 422,
};

module.exports = { HttpStatus };