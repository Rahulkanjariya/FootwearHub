const swaggerJsdoc = require("swagger-jsdoc");
require("dotenv").config();

/**
 * Configuration options for swagger documentation
 */
const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'FootwearHub API',
            version: '1.0.0',
            description: 'API documentation for FootwearHub',
        },
        servers: [
            {
                url: process.env.BASE_URL,
                description: 'Development server',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [{
            bearerAuth: []
        }],
    },
    apis: [
        "./swaggerDocument/auth/*.js",
        "./swaggerDocument/admin/*.js",
        "./swaggerDocument/user/*.js",
    ],
};

const swaggerSpec = swaggerJsdoc(options)
module.exports = {
    swaggerSpec
};


