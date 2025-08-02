const User = require('../Models/UserModel') ; 
const jwt = require('jsonwebtoken') ; 
const bcrypt = require('bcrypt') ; 
require('dotenv').config() ; 
const Jwt_Secret = process.env.JWT_SECRET ; 

//~---------- SignUp Controller -----------------

exports.SignUp = async (req , res) => {

    // --- xtracting the data ---
    const {name , email , password} = req.body ; 
    const HashedPassword = await bcrypt.hash(password , 10) ; 
    await User.create({
        name , email , password : HashedPassword
    }); 
    res.status(201).json({
        success : true , 
        message : "Signup SuccessFully"
    }); 

}; 


//~---------- Login Controller -----------------

exports.Login = async (req , res) => {

    // --- Xtracting the data --- 
    const {email , password} = req.body ; 
    const user = await User.findOne({email}) ; 
    if(!user){
        return res.status(404).json({
            success : false , 
            message : "User Not Exist" 
        }); 
    }

    const isMatch = await bcrypt.compare(password , user.password) ; 
    if(!isMatch){
        return res.status(401).json({
            success : false , 
            message : "Wrong Password"
        })
    }

    const token = jwt.sign({ id : user._id } , Jwt_Secret) ; 

    res.cookie("token" , token , {
        httpOnly : true , 
        secure : true , 
        maxAge : 7 * 24 * 60 * 60 * 1000 , 
        sameSite: 'None',
    })

    res.status(200).json({
        success : true, 
        message : "Login SuccessFully",
    }); 

}

//~---------- LogOut Controller -----------------

exports.Logout = async ( req , res) => {

    res.clearCookie('token' , {
        httpOnly : true , 
        sameSite: 'None',
        secure: true,
    }); 
    res.status(200).json({
        success : true , 
        message : "Logout SuccessFully"
    }); 
    
}; 

