const express = require('express');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('./config/mongoose.config');   
const app = express();
// const jwt = require("jsonwebtoken");
app.use(cookieParser());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json());                          
app.use(express.urlencoded({ extended: true }));   

require('./routes/crypto.routes')(app);
app.listen(8000, () => {
    console.log("Listening at Port 8000")
})
