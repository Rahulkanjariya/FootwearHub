/**
 * @swagger
 * /api/v1/user/list/coupon:
 *   get:
 *     summary: List all coupon
 *     tags: [User/Coupon]
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
*     responses:
 *       200:
 *         description: A list of coupon
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
 *                     example: SAVE10
 *                   discountType:
 *                     type: integer
 *                     enum: [1, 2] 
 *                     example: 1
 *                   discountAmount:
 *                     type: number
 *                     example: 10
 *                   expiryDate:
 *                     type: string
 *                     format: date
 *                     example: "2024-12-31"
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
 * /api/v1/user/coupon/detail/{id}:
 *   get:
 *     summary: Get coupon detail
 *     tags: [User/Coupon]
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
 *                   example: SAVE10
 *                 discountType:
 *                   type: integer
 *                   enum: [1, 2] 
 *                   example: 1
 *                 discountAmount:
 *                   type: number
 *                   example: 10
 *                 expiryDate:
 *                   type: string
 *                   format: date
 *                   example: "2024-12-31"
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
