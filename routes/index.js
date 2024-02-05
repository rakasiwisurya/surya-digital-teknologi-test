const express = require("express");
const router = express.Router();
const {
  addUser,
  deleteUser,
  getUsers,
  updateUser,
} = require("../controllers/user");
const { getZones } = require("../controllers/zone");
const { sendEmail } = require("../controllers/message");

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - title
 *         - author
 *         - finished
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the book
 *         title:
 *           type: string
 *           description: The title of your book
 *         author:
 *           type: string
 *           description: The book author
 *         finished:
 *           type: boolean
 *           description: Whether you have finished reading the book
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the book was added
 *       example:
 *         id: d5fE_asz
 *         title: The New Turing Omnibus
 *         author: Alexander K. Dewdney
 *         finished: false
 *         createdAt: 2020-03-10T04:05:06.157Z
 *     BadRequestError:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *         message:
 *           type: string
 *       example:
 *         status: Failed
 *         message: payload is required
 *     InternalServerError:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *         message:
 *           type: string
 *       example:
 *         status: Failed
 *         message: Internal server error
 *     GetUsersResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *         message:
 *           type: string
 *         data:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: number
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               email:
 *                 type: string
 *               birth_date:
 *                 type: string
 *                 format: date
 *               location:
 *                 type: string
 *               message:
 *                 type: string
 *               status_message:
 *                 type: string
 *               sent_time:
 *                 type: string
 *               created_at:
 *                 type: string
 *                 format: date
 *               updated_at:
 *                 type: string
 *                 format: date
 *       example:
 *         status: Success
 *         message: Success get all user
 *         data:
 *          - id: 2
 *            first_name: Rakasiwi
 *            last_name: Surya
 *            email: rakasiwi.surya@gmail.com
 *            birth_date: 1997-02-05
 *            location: Asia/Jakarta
 *            message: it’s your birthday
 *            status_message: UNSENT
 *            sent_time: 2024-02-05T01:00:33.679Z
 *            created_at: 2024-02-05T01:00:33.679Z
 *            updated_at: 2024-02-05T01:00:33.679Z
 *     AddUserRequest:
 *       type: object
 *       required:
 *         - first_name
 *         - last_name
 *         - email
 *         - birth_date
 *       properties:
 *         first_name:
 *           type: string
 *         last_name:
 *           type: string
 *         email:
 *           type: string
 *         birth_date:
 *           type: string
 *           format: date
 *         location:
 *           type: string
 *         message:
 *           type: string
 *       example:
 *         first_name: Rakasiwi
 *         last_name: Surya
 *         email: rakasiwi.surya@gmail.com
 *         birth_date: 1997-02-05
 *         location: Asia/Jakarta
 *         message: Happy birthday
 *     AddUserResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *         message:
 *           type: string
 *       example:
 *         status: Success
 *         message: Success add user
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The users managing API
 * /users:
 *   get:
 *     summary: Lists all the user
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: The list of the user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetUsersResponse'
 *       500:
 *         description: Some server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalServerError'
 * /user:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddUserRequest'
 *     responses:
 *       200:
 *         description: The created user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AddUserResponse'
 *       400:
 *         description: Bad request user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BadRequestError'
 *       500:
 *         description: Some server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalServerError'
 * /books/{id}:
 *   get:
 *     summary: Get the book by id
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The book id
 *     responses:
 *       200:
 *         description: The book response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: The book was not found
 *   put:
 *    summary: Update the book by the id
 *    tags: [Books]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The book id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Book'
 *    responses:
 *      200:
 *        description: The book was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Book'
 *      404:
 *        description: The book was not found
 *      500:
 *        description: Some error happened
 *   delete:
 *     summary: Remove the book by id
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The book id
 *
 *     responses:
 *       200:
 *         description: The book was deleted
 *       404:
 *         description: The book was not found
 */

// /**
//  *  @swagger
//  *  paths:
//  *    '/user':
//  *      post:
//  *        tags:
//  *        - Add User
//  *        summary: Add new user
//  *        requestBody:
//  *          required: true
//  *          contents:
//  *            application/json:
//  *              schema:
//  *                $ref: '#/components/schemas/AddUserRequest'
//  *        responses:
//  *          200:
//  *            description: Success
//  *            content:
//  *              application/json
//  *                schema:
//  *                  $ref: '#/components/schemas/AddUserResponse'
//  *
//  *  components:
//  *    schemas:
//  *      AddUserRequest:
//  *        type: object
//  *        required:
//  *          - first_name
//  *          - last_name
//  *          - email
//  *          - birth_date
//  *        properties:
//  *          first_name:
//  *            type: string
//  *            default: Rakasiwi
//  *          last_name:
//  *            type: string
//  *            default: Surya
//  *          email:
//  *            type: string
//  *            default: rakasiwisurya@example.com
//  *          birth_date:
//  *            type: string
//  *            format: date
//  *            default: 1997-02-05
//  *          location:
//  *            type: string
//  *            default: Asia/Jakarta
//  *          message:
//  *            type: string
//  *            default: it’s your birthday
//  *      AddUserResponse:
//  *        type: object
//  *        properties:
//  *          status:
//  *            type: Success
//  *          message:
//  *            type: Success add user
//  */

router.post("/user", addUser);
router.get("/users", getUsers);
router.put("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);

router.get("/zones", getZones);

router.post("/send-bulk-email", sendEmail);

module.exports = router;
