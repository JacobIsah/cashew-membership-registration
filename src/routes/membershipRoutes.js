const express = require('express');
const multer = require('multer');
const path = require('path');
const Member = require('../models/Member');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });


router.post('/register', upload.fields([
  { name: 'passport_photo', maxCount: 1 },
  { name: 'payment_receipt', maxCount: 1 }
]), async (req, res) => {
  try {
    // console.log('Received files:', req.files);
    // console.log('Received body:', req.body);

    if (!req.files['passport_photo']?.[0]) {
      return res.status(400).json({ message: 'Passport photo required' });
    }
    
    if (!req.files['payment_receipt']?.[0]) {
      return res.status(400).json({ message: 'Payment receipt required' });
    }

    const existingMember = await Member.findByEmailOrPhone(req.body.email, req.body.phone_number);
    if (existingMember) {
      return res.status(400).json({
        success: false,
        message: 'A member with the same email or phone number already exists'
      });
    }

    const memberData = {
      full_name: req.body.full_name,
      contact_address: req.body.contact_address,
      phone_number: req.body.phone_number,
      email: req.body.email,
      community: req.body.community,
      lga: req.body.lga,
      state: req.body.state,
      farm_location: req.body.farm_location,
      next_of_kin: req.body.next_of_kin,
      next_of_kin_contact: req.body.next_of_kin_contact,
      relationship: req.body.relationship,
      membership_category: req.body.membership_category,
      business_name: req.body.business_name,
      business_address: req.body.business_address,
      business_phone: req.body.business_phone,
      business_email: req.body.business_email,
      passport_photo: req.files['passport_photo'][0].path,
      payment_receipt: req.files['payment_receipt'][0].path

    };

    const newMember = await Member.create(memberData);
    res.status(201).json({
      success: true,
      message: 'Membership registration successful',
      data: newMember
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred during registration',
      error: error.message
    });
  }
});

module.exports = router;