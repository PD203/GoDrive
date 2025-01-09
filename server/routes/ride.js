const express = require('express');
const router = express.Router();
const { body, query } = require('express-validator');
const { createRide, getFare, confirmRide, startRide, endRide } = require('../controllers/ride');
const { authUser, authCaptain } = require('../middleware/auth');


router.post('/create',
    body('pickup').isString().isLength({ min: 3 }).withMessage('Invalid pickup address'),
    body('destination').isString().isLength({ min: 3 }).withMessage('Invalid destination address'),
    body('vehicleType').isString().isIn([ 'auto', 'car', 'moto' ]).withMessage('Invalid vehicle type'),
    authUser,
    createRide
)

router.get('/get-fare',
    query('pickup').isString().isLength({ min: 3 }).withMessage('Invalid pickup address'),
    query('destination').isString().isLength({ min: 3 }).withMessage('Invalid destination address'),
    authUser,
    getFare
)

router.post('/confirm',
    body('rideId').isMongoId().withMessage('Invalid ride id'),
    authCaptain,
    confirmRide
)

router.get('/start-ride',
    query('rideId').isMongoId().withMessage('Invalid ride id'),
    query('otp').isString().isLength({ min: 6, max: 6 }).withMessage('Invalid OTP'),
    authCaptain,
    startRide
)

router.post('/end-ride',
    body('rideId').isMongoId().withMessage('Invalid ride id'),
    authCaptain,
    endRide
)

module.exports = router;