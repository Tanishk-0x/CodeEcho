const express = require('express') ; 
const router = express.Router() ; 
const authMiddleware = require('../Middlewares/authMiddleware') ; 
const { getUserDetails } = require('../controllers/userProfile') ; 


router.get('/getuserdetails' , authMiddleware , getUserDetails ) ; 


module.exports = router ; 