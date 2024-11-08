/**
 * @swagger
 * /api/admin/add/product:
 *   post:
 *     summary: Add a new product
 *     tags: [Admin/Product]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Running Shoes
 *               categoryId:
 *                 type: string
 *                 example: "60b8d295f9f1b2a7d03c5e6f"
 *               subCategoryId:
 *                 type: string
 *                 example: "60b8d295f9f1b2a7d03c5e70"
 *               brandId:
 *                 type: string
 *                 example: "60b8d295f9f1b2a7d03c5e71"
 *               price:
 *                 type: number
 *                 example: 1000
 *               description:
 *                 type: string
 *                 example: High quality running shoes
 *               image:
 *                 type: string
 *                 format: binary
 *               size:
 *                 type: string
 *                 example: "10"
 *               color:
 *                 type: string
 *                 example: "Red"
 *               stock:
 *                 type: integer
 *                 example: 50
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
 * /api/admin/list/product:
 *   get:
 *     summary: Get a list of product
 *     tags: [Admin/Product]
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
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *           example: "Nike"
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
 *                       id:
 *                         type: string
 *                         example: "60b8d295f9f1b2a7d03c5e6f"
 *                       name:
 *                         type: string
 *                         example: Running Shoes
 *                       categoryId:
 *                         type: string
 *                         example: "60b8d295f9f1b2a7d03c5e6f"
 *                       subCategoryId:
 *                         type: string
 *                         example: "60b8d295f9f1b2a7d03c5e70"
 *                       brandId:
 *                         type: string
 *                         example: "60b8d295f9f1b2a7d03c5e71"
 *                       price:
 *                         type: number
 *                         example: 99.99
 *                       description:
 *                         type: string
 *                         example: High quality running shoes
 *                       imageUrl:
 *                         type: string
 *                         example: http://example.com/images/product.jpg
 *                       size:
 *                         type: string
 *                         example: "10"
 *                       color:
 *                         type: string
 *                         example: "Red"
 *                       stock:
 *                         type: integer
 *                         example: 50
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
 * /api/admin/product/detail/{id}:
 *   get:
 *     summary: Get product detail
 *     tags: [Admin/Product]
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
 *                     id:
 *                       type: string
 *                       example: "60b8d295f9f1b2a7d03c5e6f"
 *                     name:
 *                       type: string
 *                       example: Running Shoes
 *                     categoryId:
 *                       type: string
 *                       example: "60b8d295f9f1b2a7d03c5e6f"
 *                     subCategoryId:
 *                       type: string
 *                       example: "60b8d295f9f1b2a7d03c5e70"
 *                     brandId:
 *                       type: string
 *                       example: "60b8d295f9f1b2a7d03c5e71"
 *                     price:
 *                       type: number
 *                       example: 2000
 *                     description:
 *                       type: string
 *                       example: High quality running shoes
 *                     imageUrl:
 *                       type: string
 *                       example: http://example.com/images/product.jpg
 *                     size:
 *                       type: string
 *                       example: "10"
 *                     color:
 *                       type: string
 *                       example: "Red"
 *                     stock:
 *                       type: integer
 *                       example: 50
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
 * /api/admin/update/product/{id}:
 *   put:
 *     summary: Update product detail
 *     tags: [Admin/Product]
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
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Running Shoes
 *               categoryId:
 *                 type: string
 *                 example: "60b8d295f9f1b2a7d03c5e6f"
 *               subCategoryId:
 *                 type: string
 *                 example: "60b8d295f9f1b2a7d03c5e70"
 *               brandId:
 *                 type: string
 *                 example: "60b8d295f9f1b2a7d03c5e71"
 *               price:
 *                 type: number
 *                 example: 99.99
 *               description:
 *                 type: string
 *                 example: High quality running shoes
 *               image:
 *                 type: string
 *                 format: binary
 *               size:
 *                 type: string
 *                 example: "10"
 *               color:
 *                 type: string
 *                 example: "Red"
 *               stock:
 *                 type: integer
 *                 example: 50
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
 * /api/admin/delete/product/{id}:
 *   delete:
 *     summary: Delete a product
 *     tags: [Admin/Product]
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
