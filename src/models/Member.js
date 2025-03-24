const pool = require("../config/db");

class Member {
  static async create(memberData) {
    const query = `
      INSERT INTO members (
        full_name, contact_address, phone_number, email, community, lga, state,
        farm_location, next_of_kin, next_of_kin_contact, relationship,
        membership_category, business_name, business_address, business_phone, 
        business_email, passport_photo, payment_receipt
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
      RETURNING *;
    `;
    const values = [
      memberData.full_name,
      memberData.contact_address,
      memberData.phone_number,
      memberData.email,
      memberData.community,
      memberData.lga,
      memberData.state,
      memberData.farm_location,
      memberData.next_of_kin,
      memberData.next_of_kin_contact,
      memberData.relationship,
      memberData.membership_category,
      memberData.business_name,
      memberData.business_address,
      memberData.business_phone,
      memberData.business_email,
      memberData.passport_photo,
      memberData.payment_receipt
    ];

    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw new Error(`Database error: ${error.message}`);
    }
  }

  static async findByEmailOrPhone(email, phone_number) {
    const query = `
      SELECT * FROM members
      WHERE email = $1 OR phone_number = $2;
    `;
    const values = [email, phone_number];

    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw new Error(`Database error: ${error.message}`);
    }
  }
}

module.exports = Member;