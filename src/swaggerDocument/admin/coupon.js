/**
 * @swagger
 * /api/admin/add/coupon:
 *   post:
 *     summary: Add a new coupon
 *     tags: [Admin/Coupon]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 example: "SUMMER2024"
 *               description:
 *                 type: string
 *                 example: "Get 20% off on all products"
 *               discount:
 *                 type: number
 *                 example: 20
 *               expiryDate:
 *                 type: string
 *                 format: date
 *                 example: "03-12-2024"
 *               maxUses:
 *                 type: integer
 *                 example: 100
 *               usedCount:
 *                 type: integer
 *                 example: 0
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
 *                       example: "60b8d295f9f1b2a7d03c5e6f"
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
 * /api/admin/list/coupon:
 *   get:
 *     summary: List all coupon
 *     tags: [Admin/Coupon]
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
 *           example: 5
*     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "60b8d295f9f1b2a7d03c5e6f"
 *                   code:
 *                     type: string
 *                     example: "SUMMER2024"
 *                   description:
 *                     type: string
 *                     example: "Get 20% off on all products"
 *                   discount:
 *                     type: number
 *                     example: 20
 *                   expiryDate:
 *                     type: string
 *                     format: date
 *                     example: "03-12-2024"
 *                   maxUses:
 *                     type: integer
 *                     example: 100
 *                   usedCount:
 *                     type: integer
 *                     example: 0
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
 * /api/admin/coupon/detail/{id}:
 *   get:
 *     summary: Get coupon detail
 *     tags: [Admin/Coupon]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "60b8d295f9f1b2a7d03c5e6f"
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "60b8d295f9f1b2a7d03c5e6f"
 *                 code:
 *                   type: string
 *                   example: "SUMMER2024"
 *                 description:
 *                   type: string
 *                   example: "Get 20% off on all products"
 *                 discount:
 *                   type: number
 *                   example: 20
 *                 expiryDate:
 *                   type: string
 *                   format: date
 *                   example: "03-12-2024"
 *                 maxUses:
 *                   type: integer
 *                   example: 100
 *                 usedCount:
 *                   type: integer
 *                   example: 0
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
 * /api/admin/delete/coupon/{id}:
 *   delete:
 *     summary: Delete a coupon
 *     tags: [Admin/Coupon]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "60b8d295f9f1b2a7d03c5e6f"
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
