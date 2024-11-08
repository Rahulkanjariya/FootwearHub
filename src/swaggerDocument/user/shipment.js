/**
 * @swagger
 * /api/v1/user/shipment/detail/{id}:
 *   get:
 *     summary: Get shipment detail 
 *     tags: [User/Shipment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "60b8d295f9f1b2a7d03c5e74"
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 responseCode:
 *                   type: integer
 *                 responseMessage:
 *                   type: string
 *                 responseData:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "60b8d295f9f1b2a7d03c5e74"
 *                     orderId:
 *                       type: string
 *                       example: "60b8d295f9f1b2a7d03c5e73"
 *                     status:
 *                       type: integer
 *                       enum: [1, 2, 3, 4, 5]
 *                       example: 1
 *                     trackingNumber:
 *                       type: string
 *                       example: "1Z9999999999999999"
 *                     estimatedDelivery:
 *                       type: string
 *                       format: date
 *                       example: "2024-08-20"
 *       500:
 *         description: Failed 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 responseCode:
 *                   type: integer
 *                 responseMessage:
 *                   type: string
 */
