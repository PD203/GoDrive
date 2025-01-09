const express = require('express')
const router = express.Router()
const { body } = require("express-validator")
const { registerUser, loginUser, getUserProfile, logoutUser, updateUserProfile } = require('../controllers/user')
const { authUser } = require('../middleware/auth')

router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
],
    registerUser
)


router.post('/login', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
],
   loginUser 
)

router.get('/profile', authUser, getUserProfile)

router.put('/profile', authUser, updateUserProfile)

router.get('/logout', authUser, logoutUser)



module.exports = router;