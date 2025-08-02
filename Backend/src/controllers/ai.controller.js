// Business Logic ... 
const aiService = require('../services/ai.service') ; 
const User = require('../Models/UserModel') ; 

const getResponse = async (req , res) => {

    const { code , instruction , title } = req.body ; // destructuring .. 

    // ------------------ GEMINI LOGIC ----------------------
    if(!code){
        return res.status(400).send("Input is required!") ; 
    }

    const response = await aiService( code , instruction ) ; 
    // --------------------------------------------------------

    // ------------------ HISTORY LOGIC ------------------------

    const user = await User.findById(req.user.id) ; 

    if( title === "Comment_Generator" || title === "Complexity_Analyzer" || title === "Language_Converter" || 
        title === "Code_Explainer" || title === "Code_Optimizer" || title === "CodeQuizzer" ||
        title === "Code_Reviewer" || title === "Code_Summarizer" || title === "Topic_Explainer" ||
        title === "ChatEase" 
    ){

        user.history.push({
            featuredUsed : title , 
            codeSnippet : code.slice(0,300) , 
        }); 
    }

    await user.save() ; 

    // ---------------------------------------------------------

    res.send(response) ; // sending to response .. 

}


module.exports = { getResponse } ; 