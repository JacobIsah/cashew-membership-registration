const pool = require("../config/db");

class Member {
  static async create(memberData) {
    const query = `
      INSERT INTO members (
        full_name, contact_address, phone_number, email, community, lga, state,
        farm_location, next_of_kin, next_of_kin_contact, relationship,
        membership_category, business_name, business_address, business_phone, business_email
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
      RETURNING *;
    `;
    const values = [
      memberData.fullName,
      memberData.contactAddress,
      memberData.phoneNumber,
      memberData.email,
      memberData.community,
      memberData.lga,
      memberData.state,
      memberData.farmLocation,
      memberData.nextOfKin,
      memberData.nextOfKinContact,
      memberData.relationship,
      memberData.membershipCategory,
      memberData.businessName,
      memberData.businessAddress,
      memberData.businessPhone,
      memberData.businessEmail,
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  }
}

module.exports = Member;