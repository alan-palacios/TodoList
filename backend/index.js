require('dotenv').config();
require('./config/db')
const express = require("express");
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', require('./app/routes/routes'));

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});