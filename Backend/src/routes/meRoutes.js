const express = require('express') ; 
const router = express.Router() ; 
const authMiddleware = require('../Middlewares/authMiddleware') ; 
const { authme } = require('../controllers/authme') ; 

router.get('/authme' , authMiddleware , authme) ; 

module.exports = router ; 