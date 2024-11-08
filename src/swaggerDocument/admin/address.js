/**
 * @swagger
 * /api/admin/list/address:
 *   get:
 *     summary: List all address
 *     tags: [Admin/Address]
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
 *           example: "surat"
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
 *                       userId:
 *                         type: string
 *                         example: "60b8d295f9f1b2a7d03c5e6e"
 *                       apartmentName:
 *                         type: string
 *                         example: "Apt 101"
 *                       streetNo:
 *                         type: string
 *                         example: "1234 Elm Street"
 *                       city:
 *                         type: string
 *                         example: "Surat"
 *                       state:
 *                         type: string
 *                         example: "Gujarat"
 *                       postalCode:
 *                         type: string
 *                         example: "62704"
 *                       country:
 *                         type: string
 *                         example: "India"
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
 * /api/admin/address/detail/{id}:
 *   get:
 *     summary: Get address detail
 *     tags: [Admin/Address]
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
 *                 responseData:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: string
 *                       example: "60b8d295f9f1b2a7d03c5e6e"
 *                     apartmentName:
 *                       type: string
 *                       example: "Apt 101"
 *                     streetNo:
 *                       type: string
 *                       example: "1234 Elm Street"
 *                     city:
 *                       type: string
 *                       example: "Surat"
 *                     state:
 *                       type: string
 *                       example: "Gujarat"
 *                     postalCode:
 *                       type: string
 *                       example: "62704"
 *                     country:
 *                       type: string
 *                       example: "India"
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
