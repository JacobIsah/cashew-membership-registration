const Member = require("../models/Member");
const { sendConfirmationEmail } = require("../utils/emailService");

const registerMember = async (req, res) => {
  try {
    const memberData = req.body;
    const files = req.files;

    const newMember = await Member.create(memberData);

    await sendConfirmationEmail(memberData.email, memberData.fullName);

    res.status(201).json({
      success: true,
      message: "Membership registration successful",
      data: newMember,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred during registration",
      error: error.message,
    });
  }
};

module.exports = { registerMember };