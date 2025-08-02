// Gemini Content ... 
require('dotenv').config() ; 
const {GoogleGenerativeAI} = require("@google/generative-ai"); 

const API_KEY = process.env.GEMINI_API_KEY ; 

const genAI = new GoogleGenerativeAI (API_KEY); 


async function generateContent( prompt , customInstruction = null ) {

    const systemInstruction = customInstruction || `
        🧠 1. Code Explanation:
        Break down the code line-by-line or block-by-block.
        Clearly explain what each part of the code is doing in simple and understandable language.
        Highlight key operations, logic, and flow.

        🔎 2. Problem Identification:
        Find any bad practices, errors, inefficiencies, redundant code, or missing error handling.
        List issues point-by-point.

        🛠️ 3. Code Improvement:
        Suggest a cleaned, optimized, and professional version of the code.
        Fix all detected issues.
        Ensure the new version follows best coding standards (readability, performance, error handling, etc.).
        Keep the code style clean and properly indented.

        📋 4. Final Suggestions (Max 3 points):
        Give up to 3 tips or best practices the developer can apply in general for writing better code.
    ` ; 

    const model = genAI.getGenerativeModel({
        model : "gemini-2.0-flash" , 
        systemInstruction  
    }); 

    const result = await model.generateContent(prompt); 
    return result.response.text() ; 
    
}


module.exports = generateContent ; 


// const API_KEY = "AIzaSyCeNNA5fZw2mfNAyzxes743gArDZ9jOso8" ; 