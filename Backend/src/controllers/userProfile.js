const User = require('../Models/UserModel') ; 

//~---------- GetUserDetails Controller -----------------

exports.getUserDetails = async (req , res) => {

    try {
        const user = await User.findById(req.user.id).select('-password') ; // exclude password 
        if(!user){
            return res.status(404).json({
                success : false ,
                message : "Unable to fetch user"
            }); 
        }
        res.json({
            success : true , 
            user
        }); 
    } 

    catch (error) {
        res.status(500).json({
            success : false , 
            message : "Server error while fetching user profile"
        }); 
    }

}