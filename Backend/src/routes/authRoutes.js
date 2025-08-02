const express = require('express') ; 
const router = express.Router() ; 
const { SignUp , Login , Logout } = require('../controllers/authController') ; 


router.post('/signup' , SignUp) ; 
router.post('/login' , Login) ; 
router.get('/logout' , Logout) ; 


module.exports = router ; 