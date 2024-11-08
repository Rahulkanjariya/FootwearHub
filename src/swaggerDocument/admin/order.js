/**
 * @swagger
 * /api/admin/list/order:
 *   get:
 *     summary: List all order
 *     tags: [Admin/Order]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: perPage
 *         schema:
 *           type: integer
 *           example: 10
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [name, date]
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           example: "asc"
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
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       orderId:
 *                         type: string
 *                         example: "60b8d295f9f1b2a7d03c5e73"
 *                       userId:
 *                         type: string
 *                         example: "60b8d295f9f1b2a7d03c5e6f"
 *                       productId:
 *                         type: string
 *                         example: "60b8d295f9f1b2a7d03c5e70"
 *                       quantity:
 *                         type: integer
 *                         example: 2
 *                       couponId:
 *                         type: string
 *                         example: "60b8d295f9f1b2a7d03c5e71"
 *                       orderStatus:
 *                         type: integer
 *                         enum: [1, 2, 3, 4, 5]
 *                         example: 1
 *                       paymentMethod:
 *                         type: integer
 *                         enum: [1, 2, 3]
 *                         example: 2
 *                       paymentStatus:
 *                         type: integer
 *                         enum: [1, 2, 3]
 *                         example: 1
 *                       addressId:
 *                         type: string
 *                         example: "60b8d295f9f1b2a7d03c5e72"
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

/**
 * @swagger
 * /api/admin/order/detail/{id}:
 *   get:
 *     summary: Get order detail
 *     tags: [Admin/Order]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "60b8d295f9f1b2a7d03c5e73"
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
 *                     orderId:
 *                       type: string
 *                       example: "60b8d295f9f1b2a7d03c5e73"
 *                     userId:
 *                       type: string
 *                       example: "60b8d295f9f1b2a7d03c5e6f"
 *                     productId:
 *                       type: string
 *                       example: "60b8d295f9f1b2a7d03c5e70"
 *                     quantity:
 *                       type: integer
 *                       example: 2
 *                     couponId:
 *                       type: string
 *                       example: "60b8d295f9f1b2a7d03c5e71"
 *                     orderStatus:
 *                       type: integer
 *                       enum: [1, 2, 3, 4, 5]
 *                       example: 1
 *                     paymentMethod:
 *                       type: integer
 *                       enum: [1, 2, 3]
 *                       example: 2
 *                     paymentStatus:
 *                       type: integer
 *                       enum: [1, 2, 3]
 *                       example: 1
 *                     addressId:
 *                       type: string
 *                       example: "60b8d295f9f1b2a7d03c5e72"
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


/**
 * @swagger
 * /api/admin/update/status/{id}:
 *   put:
 *     summary: Update the status of an order
 *     tags: [Admin/Order]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "60b8d295f9f1b2a7d03c5e73"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderStatus:
 *                 type: integer
 *                 enum: [1, 2, 3, 4, 5]
 *                 example: 3
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
 *                       example: "60b8d295f9f1b2a7d03c5e73"
 *                     status:
 *                       type: integer
 *                       example: 3
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
