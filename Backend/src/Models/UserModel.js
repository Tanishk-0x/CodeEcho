const mongoose = require('mongoose') ; 

const favouriteSchema = new mongoose.Schema({
    code : {
        type : String 
    }, 
    response : {
        type : String 
    }, 
}); 


const UsageHistorySchema = new mongoose.Schema({

    featuredUsed : {
        type : String , 
        required : true , 
    }, 
    codeSnippet : {
        type : String , 
        required : true ,
    }, 
    createdAt : {
        type : Date , 
        default : Date.now() ,
    }, 

}); 


const UserSchema = new mongoose.Schema({

    name : {
        type : String , 
        required : true , 
    },
    email : {
        type : String , 
        required : true , 
    },
    password : {
        type : String , 
        required : true , 
    },
    tier : {
        type : String , 
        enum : ["free" , "pro" , "premium"], 
        default : "free" ,
    }, 
    apiCallsMade : {
        type : Number ,
        default : 0 ,
    },
    lastApiReset: {
        type: Date,
        default: Date.now,
    }, 

    favourites : [favouriteSchema],

    history : [UsageHistorySchema],

}); 


module.exports = mongoose.model("User" , UserSchema) ; 