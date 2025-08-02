const User = require('../Models/UserModel') ; 


exports.authme = async ( req , res) => {

    try {
        const user = await User.findById(req.user.id).select('-password') ; // exclude password 
        if(!user){
            return res.status(404).json({
                success : false , 
                message : "User not found!"
            }); 
        }  
        res.json({ success : true , user }) ; 
    }

    catch (error) {
        res.status(500).json({
            success : false , 
            message : "Server error"
        }); 
    }
    
}