const mongoose = require('mongoose') ; 
require('dotenv').config() ; 

exports.dbConnect = () => {

    const URL = process.env.MONGODB_URL ;

    mongoose.connect(URL)
    .then( () => {
        console.log('DB Connected Successfully') ; 
    })
    .catch( (error) => {
        console.log('Error in DB Connection' , error) ; 
    })
    
}

