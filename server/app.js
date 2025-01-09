const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require('cors')
const cookieParser = require('cookie-parser')
const app = express();
const connectToDb = require('./db/db')

//Importing Routes
const userRouter = require('./routes/user')
const captainRouter = require('./routes/captain')
const mapRoutes = require('./routes/map')
const rideRoutes = require('./routes/ride')

connectToDb()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("API working with api/v1");
});


// using Routes
app.use('/api/v1/user', userRouter)
app.use('/api/v1/captain', captainRouter)
app.use('/api/v1/maps', mapRoutes)
app.use('/api/v1/ride', rideRoutes)

module.exports = app;