const User = require('../Models/UserModel') ; 
const tierLimits = require('../Config/tierLimits') ; 

const checkApiLimit = async(req , res , next) => {

    const user = await User.findById(req.user.id) ; 
    const limit = tierLimits[user.tier || 'free'] ; 

    const title = req.body.title || 'unknown' ;  

    // ------------ Auto Reset ----------------
    const now = new Date() ; 
    const lastReset = user.lastApiReset || new Date(0) ; 
    const hoursPassed = ( now - lastReset ) / (1000 * 60 * 60) ; 
    // ---------------------------------------

    if( hoursPassed >= 24 ){
        user.apiCallsMade = 0 ; 
        user.lastApiReset = now ; 
    }


    if(user.apiCallsMade >= limit){
        return res.status(403).json({
            success : false , 
            message : "Tier Limit Reached" 
        }); 
    }

    if( title === "Comment_Generator" || title === "Complexity_Analyzer" || title === "Language_Converter" || 
        title === "Code_Explainer" || title === "Code_Optimizer" || title === "CodeQuizzer" ||
        title === "Code_Reviewer" || title === "Code_Summarizer" || title === "Topic_Explainer"  || title === "ChatEase"
        || title === "Chat"
    ){
        user.apiCallsMade += 1 ; 
    }


    
    await user.save() ; 
    next() ; 

}

module.exports = checkApiLimit ; 