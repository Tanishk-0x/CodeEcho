const jwt = require('jsonwebtoken') ; 
require('dotenv').config() ; 

const Jwt_Secret = process.env.JWT_SECRET ; 


const authMiddleware = (req , res , next) => {

    // --- Xtracting token from cookies ---
    const token = req.cookies.token ; 
    // console.log("TOKEN IS : " , token) ; 
    if(!token){
        return res.status(401).json({
            success : false , 
            message : "Token Missing" 
        })
    }

    try {
        const decoded = jwt.verify(token , Jwt_Secret) ; 
        req.user = decoded ; 
        next() ; 
    }
    
    catch (error) {
        res.status(403).json({
            success : false , 
            message : "Invalid Token"
        })
    }

}; 

module.exports = authMiddleware ; 