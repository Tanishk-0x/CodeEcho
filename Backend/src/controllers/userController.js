const User = require('../Models/UserModel') ; 
const tierLimits = require('../Config/tierLimits') ; 


//~---------- AddFavourite Controller -----------------

exports.AddFavourite = async (req , res) => { 

    const {code , response} = req.body ; 
    const user = await User.findById(req.user.id) ; 
    user.favourites.push({ code , response }) ; 
    await user.save() ;  
    res.status(200).json({
        success : true , 
        message : "Added To Favourite"
    }); 

}; 

//~ ---------- Delete Favourite ----------------------

exports.DeleteFavourite = async (req , res) => {
    const userId = req.user.id ; 
    const favId = req.body.id.toString() ; 

    try {
        const result = await User.findOneAndUpdate(
            { _id : userId} , 
            {
                $pull : {favourites : {_id : favId} }
            }, { new : true }
        ); 

        if(!result){
            return res.status(404).json({
                message : "User not Found!"
            }); 
        }

        res.json({
            success : true , 
            message : "Favourite Deleted SuccessFully"
        }); 
    }
    
    catch (error) {
        res.status(500).json({
            success : false , 
            message : "Something went wrong while deleting favourite" , 
            error 
        }); 
        console.log(error) ; 
    }

}

//~---------- GetFavourite Controller -----------------

exports.getFavourites = async (req , res) => {

    const user = await User.findById(req.user.id) ; 
    res.status(200).json(
        user.favourites , 
    )

}; 

//~---------- Api_Usage Controller -----------------

exports.getApiUsage = async (req , res) => {

    const user = await User.findById(req.user.id) ; 
    const max = tierLimits[user.tier || 'free'] ; 
    res.json({
        used : user.apiCallsMade , 
        remaining : max - user.apiCallsMade , 
        max 
    });

};

//~------------ History Controller --------------------

exports.usageHistory = async (req , res) => {

    try {
        const user = await User.findById(req.user.id) ; 
        const History = user.history.reverse() ; 

        res.status(200).json({
            success : true , 
            message : "History fetched SuccessFully" , 
            history : History ,
        }); 
    }

    catch (error) {
        return res.status(500).json({
            success : false , 
            message : "Error While Fetching User History" ,
        }); 
    }

}