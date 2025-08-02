const User = require('../Models/UserModel') ; 

const AdminBoard = async (req , res) => {

    try {
        const users = await User.find({}).select('-password -favourites'); 
        const totalEntries = await User.countDocuments({}) ; 

        const totalApiCalls = users.reduce( (sum , user) => sum + user.apiCallsMade , 0 ) ; 

        const averageApiCalls = Math.floor(totalApiCalls / totalEntries) ;

        // --------------------------------------------

        const stats = {
            'Code_Explainer' : 0 , 
            'Complexity_Analyzer' : 0 ,  
            'Language_Converter' : 0 , 
            'Comment_Generator' : 0 , 
            'Code_Reviewer' : 0 , 
            'Code_Quizzer' : 0 , 
            'Code_Summarizer' : 0 ,
            'Code_Optimizer' : 0 , 
            'Topic_Explainer' : 0 , 
            'ChatEase' : 0 , 

        }; 

        users.forEach(user => {
            user.history.forEach( itr => {
                if(itr.featuredUsed === 'Code_Explainer') stats['Code_Explainer']++ ; 
                else if(itr.featuredUsed === 'Complexity_Analyzer') stats['Complexity_Analyzer']++ ; 
                else if(itr.featuredUsed === 'Language_Converter') stats['Language_Converter']++ ; 
                else if(itr.featuredUsed === 'Comment_Generator') stats['Comment_Generator']++ ; 
                else if(itr.featuredUsed === 'Code_Reviewer') stats['Code_Reviewer']++ ;

                else if(itr.featuredUsed === 'CodeQuizzer') stats['Code_Quizzer']++ ;
                else if(itr.featuredUsed === 'Code_Summarizer') stats['Code_Summarizer']++ ;
                else if(itr.featuredUsed === 'Code_Optimizer') stats['Code_Optimizer']++ ;
                else if(itr.featuredUsed === 'Topic_Explainer') stats['Topic_Explainer']++ ;
                else if(itr.featuredUsed === 'ChatEase') stats['ChatEase']++ ;

            });
        });

        // --------------------------------------------

        res.status(200).json({
            success : true , 
            message : "User fetched successfully" , 
            totalusers : totalEntries ,
            totalCalls : totalApiCalls ,
            averageCallPerUser : averageApiCalls , 
            stats : stats ,
            users : users , 
        }); 

        
    } 

    catch (error) {
        res.status(500).json({
            success : false , 
            message : "Error while fetching users"
        }); 
    }

}


//~ ----------------------------------------------------------
const getFeatureUsageStats = async (req , res) => {

    try {
        const users = await User.find({}) ; 

        const stats = {
            'Code_Explainer' : 0 , 
            'Complexity_Analyzer' : 0 , 
            'Code_Reviewer' : 0 , 
            'Language_Converter' : 0 
        }; 

        users.forEach(user => {
            user.history.forEach( itr => {
                if(itr.featuredUsed === 'Code_Explainer') stats['Code_Explainer']++ ; 
                else if(itr.featuredUsed === 'Complexity_Analyzer') stats['Complexity_Analyzer']++ ; 
                else if(itr.featuredUsed === 'Code_Reviewer') stats['Code_Reviewer']++ ; 
                else if(itr.featuredUsed === 'Language_Converter') stats['Language_Converter']++ ; 
            });
        });

        return res.status(200).json({
            success : true , 
            message : "Users Stats Fetched SuccessFully" , 
            stats , 
        }); 

    } 
    
    catch (error) {
        return res.status(500).json({
            success : false , 
            message : "Error While fetching Users Stats" 
        }); 
    }
}


module.exports = { AdminBoard , getFeatureUsageStats } ; 
