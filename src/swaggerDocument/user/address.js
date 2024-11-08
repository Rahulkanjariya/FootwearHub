/**
 * @swagger
 * /api/v1/user/add/address:
 *   post:
 *     summary: Add a new address
 *     tags: [User/Address]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               apartmentName:
 *                 type: string
 *                 example: "Apt 101"
 *               streetNo:
 *                 type: string
 *                 example: "1234 Elm Street"
 *               city:
 *                 type: string
 *                 example: "Surat"
 *               state:
 *                 type: string
 *                 example: "Gujarat"
 *               postalCode:
 *                 type: string
 *                 example: "62704"
 *               country:
 *                 type: string
 *                 example: "India"
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
 *                       example: "6311ec073769bb040d6e99db"
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
 * /api/v1/user/list/address:
 *   get:
 *     summary: List all address
 *     tags: [User/Address]
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
 * /api/v1/user/address/detail/{id}:
 *   get:
 *     summary: Get address detail
 *     tags: [User/Address]
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


/**
 * @swagger
 * /api/v1/user/update/address/{id}:
 *   put:
 *     summary: Update address detail
 *     tags: [User/Address]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 example: "60b8d295f9f1b2a7d03c5e6e"
 *               apartmentName:
 *                 type: string
 *                 example: "Apt 101"
 *               streetNo:
 *                 type: string
 *                 example: "1234 Elm Street"
 *               city:
 *                 type: string
 *                 example: "Surat"
 *               state:
 *                 type: string
 *                 example: "Gujarat"
 *               postalCode:
 *                 type: string
 *                 example: "62704"
 *               country:
 *                 type: string
 *                 example: "India"
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
 *                       example: "60b8d295f9f1b2a7d03c5e6e"
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
 * /api/v1/user/delete/address/{id}:
 *   delete:
 *     summary: Delete an address
 *     tags: [User/Address]
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
