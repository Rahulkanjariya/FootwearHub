/**
 * @swagger
 * /api/admin/list/review:
 *   get:
 *     summary: List all review for a product
 *     tags: [Admin/Review]
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
 *                       reviewId:
 *                         type: string
 *                         example: "60b8d295f9f1b2a7d03c5e70"
 *                       userId:
 *                         type: string
 *                         example: "60b8d295f9f1b2a7d03c5e71"
 *                       productId:
 *                         type: string
 *                         example: "60b8d295f9f1b2a7d03c5e6f"
 *                       rating:
 *                         type: integer
 *                         example: 4
 *                       comment:
 *                         type: string
 *                         example: "Great product, very satisfied!"
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
 * /api/admin/review/detail/{id}:
 *   get:
 *     summary: Get review detail
 *     tags: [Admin/Review]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "60b8d295f9f1b2a7d03c5e70"
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
 *                     reviewId:
 *                       type: string
 *                       example: "60b8d295f9f1b2a7d03c5e70"
 *                     userId:
 *                       type: string
 *                       example: "60b8d295f9f1b2a7d03c5e71"
 *                     productId:
 *                       type: string
 *                       example: "60b8d295f9f1b2a7d03c5e6f"
 *                     rating:
 *                       type: integer
 *                       example: 4
 *                     comment:
 *                       type: string
 *                       example: "Great product, very satisfied!"
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
