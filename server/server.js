const express = require('express');
const cors = require('cors');
const app = express();
const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser');

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json());                          
app.use(express.urlencoded({ extended: true }));   
app.use(cookieParser());
require('./config/mongoose.config');   
require('./routes/crypto.routes')(app);
require('dotenv').config();
app.listen(8000, () => {
    console.log("Listening at Port 8000")
})
