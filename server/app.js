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
  res.send("API working");
});


// using Routes
app.use('/user', userRouter)
app.use('/captain', captainRouter)
app.use('/maps', mapRoutes)
app.use('/ride', rideRoutes)

module.exports = app;