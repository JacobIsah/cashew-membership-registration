const express = require('express');
const cors = require('cors');
const membershipRoutes = require('./routes/membershipRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use('/api/membership', membershipRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});