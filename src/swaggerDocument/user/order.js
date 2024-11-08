/**
 * @swagger
 * /api/v1/user/place/order:
 *   post:
 *     summary: Place a new order
 *     tags: [User/Order]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 example: "60b8d295f9f1b2a7d03c5e70"
 *               quantity:
 *                 type: integer
 *                 example: 2
 *               orderStatus:
 *                 type: number
 *                 enum: [1,2,3,4,5]
 *                 example: 1
 *               paymentMethod:
 *                 type: number
 *                 enum: [1,2,3]
 *                 example: 2
 *               paymentStatus:
 *                 type: number
 *                 enum: [1,2,3]
 *                 example: 1
 *               addressId:
 *                 type: string
 *                 example: "60b8d295f9f1b2a7d03c5e72"
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
 * /api/v1/user/apply/coupon:
 *   post:
 *     summary: Apply a coupon to a order
 *     tags: [User/Order]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderId:
 *                 type: string
 *                 example: "66ea6f52b2cbbb71ae4ce06b"
 *               couponId:
 *                 type: string
 *                 example: "66e82993a85e47769517606f"
 *             required: true
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
 *                     discountAmount:
 *                       type: number
 *                     newTotal:
 *                       type: number
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
 * /api/v1/user/list/order:
 *   get:
 *     summary: List all order
 *     tags: [User/Order]
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
 *         name: search
 *         schema:
 *           type: string
 *           example: "shoes"
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           example: "name"
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
 * /api/v1/user/order/detail/{id}:
 *   get:
 *     summary: Get order detail
 *     tags: [User/Order]
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
 * /api/v1/user/cancel/order/{id}:
 *   put:
 *     summary: Cancel an order
 *     tags: [User/Order]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
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
 * /api/v1/user/delete/order/{id}:
 *   delete:
 *     summary: Delete a order
 *     tags: [User/Order]
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
