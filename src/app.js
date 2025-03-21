const express = require("express");
const membershipRoutes = require("./routes/membershipRoutes");

const app = express();

app.use(express.json());
app.use("/api/membership", membershipRoutes);

module.exports = app;
