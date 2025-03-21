const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

const sendConfirmationEmail = async (email, memberName) => {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "Membership Registration Confirmation",
    text: `Dear ${memberName},\n\nThank you for registering with the National Apex of Cashew Farmers, Processors, and Marketing Cooperative Ltd. Your membership has been successfully submitted.\n\nBest regards,\nThe NACOFAMP Team`,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendConfirmationEmail };