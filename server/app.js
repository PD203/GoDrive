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

const corsOptions = {
  origin: "https://godriveclient.vercel.app/", 
  credentials: true, 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
};

// Use CORS middleware
app.use(cors(corsOptions));

// Your other middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("API working fine");
});


// using Routes
app.use('/user', userRouter)
app.use('/captain', captainRouter)
app.use('/maps', mapRoutes)
app.use('/ride', rideRoutes)

module.exports = app;
