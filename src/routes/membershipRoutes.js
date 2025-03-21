const express = require("express");
const { registerMember } = require("../controllers/membershipController");
const upload = require("../utils/fileUpload");

const router = express.Router();

router.post("/register", upload.fields([
  { name: "passportPhoto", maxCount: 1 },
  { name: "paymentReceipt", maxCount: 1 },
]), registerMember);

module.exports = router;