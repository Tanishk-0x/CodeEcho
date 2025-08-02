import React, { useState } from "react";
import { LANGUAGES } from "../Others/Instructions/LangData";
import '../Style/LangConverter.css'
import Editor from 'react-simple-code-editor';
import prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import axios from 'axios';
import Markdown from 'react-markdown';
import Spinner from "../Others/Loader/Spinner";
import toast from 'react-hot-toast'
import { BsFillEraserFill } from "react-icons/bs";
import { FaCopy } from "react-icons/fa6";

const CodeConverter = () => {

  // --------------------- UseStates --------------------------

  const [code , setcode] = useState('Paste Your Code Here ..') ;   
  const [selectedLang, setSelectedLang] = useState('');
  const [response , setresponse] = useState('') ; 
  const [loading , setLoading] = useState(false) ; 

  // ---------------------- Handlers ---------------------------

  const fetchData = async (currentInstruction) => {
    
    try {
        setLoading(true);
        const response = await axios.post('https://codeechobackend.onrender.com/ai/get-response', 
            {  code , instruction : currentInstruction , title : "Language_Converter" } 
            , {withCredentials : true});
        setresponse(response.data);
        setLoading(false);
    }

    catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
            toast(error.response.data.message); 
        } else {
            toast.error("An error occured") ; 
        }
       setLoading(false) ; 
    }
    
  }

  // language select handler ...
  const LanguageSelection = ( event ) => {
    const parameter = `You are now act as a code language converter i gave you the code and your task is to convert the code into ${event} language note that do not give any desciption just give the converted code only` ; 
    setSelectedLang(event) ;
    fetchData(parameter) ; 
  }


  // -------------------------------------------------------------

  return (


    <div className="conv-main">

        <header className="conv-header">
            <div className="by">
                <h1>Language Convertor</h1>
                <p>By CodeEcho</p>
            </div>

            <div className="conv-actions">
                <div className="lang-select">

                    <div className="lang-loader">
                        {
                            loading ? <Spinner/> : ''
                        }
                    </div>

                    <div className="selection-div">
                        <select
                            value={selectedLang}
                            onChange={(e) => LanguageSelection(e.target.value)}
                            className="selection"
                        >
                            <option value="">Select a language</option>
                            {LANGUAGES.map((lang) => (
                            <option key={lang.value} value={lang.value}>
                                {lang.name}
                            </option>
                            ))}
                        </select>
                    </div>

                    <div className="language-logo">
                        {selectedLang && (
                            <div>
                                <img
                                    src={
                                    LANGUAGES.find((lang) => lang.value === selectedLang)?.logo
                                    }
                                    alt={selectedLang}
                                    width="64"
                                    height="64"
                                />
                            </div>
                        )}
                    </div>

             </div>
            </div>

            
        </header>

        <div className="conv-outer">

            <div className="conv-left">
                <div className="conv-bars">
                    <div className="dots">
                        <div className="red"></div>
                        <div className="yellow"></div>
                        <div className="green"></div>
                    </div>
                    <div className="mac-btns">
                        <button onClick={() => setcode('') }><BsFillEraserFill/></button>
                        <button onClick={() => {navigator.clipboard.writeText(code) ; toast("Copied to Clipboard") } }><FaCopy/></button>
                    </div>
                </div>
                <div className="conv-code">
                    <Editor 
                     value={code}
                     onValueChange={code => setcode(code)}
                     highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
                     padding={10}
                     className="conv-co"
                     style={{
                         fontFamily: '"Fira code", "Fira mono", monospace',
                         fontSize: 15,
                         borderRadius: "5px",
                         height: "100%",
                         width: "100%",
                         overflow: "scroll",
                     }}
                    />
                </div>
            </div>

            <div className="conv-right">
                <div className="conv-nav">
                    <button onClick={() => {navigator.clipboard.writeText(response)  ; toast("Copied to Clipboard")} }><FaCopy/></button>
                </div>
                <div className="conv-output">
                    <Markdown>{response}</Markdown>
                </div>
            </div>

        </div>

    </div>

  );
};

export default CodeConverter;