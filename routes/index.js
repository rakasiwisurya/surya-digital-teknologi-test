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
