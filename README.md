This is a Node.js API for managing membership registrations. It allows users to register upload their passport photo and payment receipt.

## Installation

To install the necessary dependencies, run:

```bash
npm install
```

## Usage

To start the server, run:

```bash
npm start
```

## API Endpoints

### Register Member

- **URL:** `/api/membership/register`
- **Method:** `POST`
- **Description:** Registers a new member by uploading their passport photo and payment receipt.

#### Request

- **Headers:**
  - `Content-Type: multipart/form-data`
- **Body:**
  - `passportPhoto`: The passport photo of the member (file)
  - `paymentReceipt`: The payment receipt of the member (file)
  - Other member data fields as required (e.g., `fullName`, `email`)

#### Response

- **Success (201):**
  ```json
  {
    "success": true,
    "message": "Membership registration successful",
    "data": {
      "_id": "member_id",
      "fullName": "Member Full Name",
      "email": "member@example.com",
      // Other member data fields
    }
  }
  ```

- **Error (500):**
  ```json
  {
    "success": false,
    "message": "An error occurred during registration",
    "error": "Error message"
  }
  ```

## License

[MIT](https://choosealicense.com/licenses/mit/)