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

router.post("/user", addUser);
router.get("/users", getUsers);
router.put("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);

router.get("/zones", getZones);

router.post("/send-bulk-email", sendEmail);

module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     BadRequestError:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *         message:
 *           type: string
 *       example:
 *         status: Failed
 *         message: Bad request from the payload
 *
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
 *
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
 *
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
 *
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
 *
 *     UpdateUserRequest:
 *       type: object
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
 *
 *     UpdateUserResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *         message:
 *           type: string
 *       example:
 *         status: Success
 *         message: Success update user
 *
 *     DeleteUserResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *         message:
 *           type: string
 *       example:
 *         status: Success
 *         message: Success delete user
 *
 *     GetZonesResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *         message:
 *           type: string
 *         data:
 *           type: array
 *           items:
 *             type: string
 *
 *       example:
 *         status: Success
 *         message: Success get all zone
 *         data:
 *           - Africa/Abidjan
 *           - Africa/Accra
 *           - Africa/Addis_Ababa
 *           - Africa/Algiers
 *           - Africa/Asmara
 *           - Africa/Asmera
 *           - Africa/Bamako
 *           - Africa/Bangui
 *           - Africa/Banjul
 *           - Africa/Bissau
 *           - Africa/Blantyre
 *
 *     SendMessageResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *         message:
 *           type: string
 *       example:
 *         status: Success
 *         message: Success send all email
 */

/**
 * @swagger
 *
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
 *
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
 *
 * /user/{id}:
 *   put:
 *     summary: Update the user by the id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUserRequest'
 *     responses:
 *       200:
 *         description: The user was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UpdateUserResponse'
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
 *
 *   delete:
 *     summary: Remove the user by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: The user was deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeleteUserResponse'
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
 *
 * /zones:
 *   get:
 *     summary: Lists all the zone
 *     tags: [Zones]
 *     responses:
 *       200:
 *         description: The list of the zone
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetZonesResponse'
 *       500:
 *         description: Some server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalServerError'
 *
 * /send-bulk-email:
 *   post:
 *     summary: The hit bulk send email right now
 *     tags: [Message]
 *     responses:
 *       200:
 *         description: The hit bulk send email right now
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SendMessageResponse'
 *       500:
 *         description: Some server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalServerError'
 */
