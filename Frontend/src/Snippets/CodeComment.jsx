import React, { useState } from 'react'
import '../Style/CodeComment.css' 
import axios from 'axios' ; 
import prism from "prismjs";
import Editor from 'react-simple-code-editor';
import Markdown from 'react-markdown';
import { BsFillEraserFill } from "react-icons/bs";
import { FaCopy } from "react-icons/fa6";
import toast from 'react-hot-toast'
import Spinner from '../Others/Loader/Spinner'

const CodeComment = () => {

  // --------------- Usestates ------------------
  const [code , setCode] = useState(`
  int sum (int a , int b){
    int c = a + b ; 
    return c ; 
  }
  `) ; 
  const[response , setResponse] = useState('Response generated here .. ') ; 
  const [loading , setLoading] = useState(false) ; 
  const [level , setLevel] = useState('Inline') ; 

  // ------------- Functions Logic --------------

  const ChangeHandler = (event) => {
    const val = parseInt(event.target.value) ; 
    if ( val === 0){
      setLevel('Inline') ; 
    }
    else if ( val === 1 ){
      setLevel('Fun&Friendly') ; 
    }
    else if( val === 2){
      setLevel('OnTop')
    }
  }

  const fetchData = async () => {
    
    try {
      setLoading(true) ; 
      const Prompt = ` 
      You are a code comment generator.
        Your task is to receive a code snippet and generate comments based on the user’s selected level of explanation.
        The user's selected style is: ${level}
        Follow the rules below based on the selected level:
        1. ${level} = inline
        Add inline comments directly beside or above relevant lines of code.
        Do not over-comment — focus only on the core logic.
        Return the code with inline comments only.
        No extra explanation, no markdown, and no headers.
        2. ${level} = funAndFriendly
        Return the same code with fun, human-style, beginner-friendly comments.
        Use light humor or relatable phrases where appropriate, but keep it relevant.
        Maintain code readability — comments should not overwhelm the code.
        3. ${level} = onTop
        Add brief but clear summary comments at the top of the entire code, describing what the code does.
        If the code conatins any comments you can remove those comments 
        Do not insert any comment inline or in the middle of the code.
        Return the code with only a block of top-level comments, nothing else.
        Global Rules:
        Do not return any explanation, markdown, or additional formatting.
        Do not repeat the user’s instruction — just return the final output.
        Be minimal yet professional — avoid clutter or over-commenting.
        Keep comments meaningful, technically accurate, and suited to the chosen style.
    ` ; 

      const res = await axios.post("http://localhost:5000/ai/get-response" , 
        { code , instruction : Prompt , title : "Comment_Generator"} , 
        { withCredentials : true } 
      ); 

      setResponse(res.data) ; 
      setLoading(false) ; 
    }
    
    catch (error) {
      toast.error(error.response.data.message) ;
      setLoading(false) ; 
    }

  }

  
  // -------------------------------------------

  return (

    <div className="comm-main">

      <header className="comm-header">

        <div className="by">
          <h1>Comment Generator</h1>
          <p>By CodeEcho</p>
        </div>
        

        <div className="comment-level">

            <div className="silder-wrap">
              <input
               type='range'
               min="0"
               max="2"
               step="1"
               onChange={ChangeHandler}
               className='comment-slider'
               />

              <div className="comment-labels">
                 <span>Inline</span>
                 <span>Fun&Friendly</span>
                 <span>OnTop</span>
               </div>
             </div>

             <div className="selected">
               Selected <strong>{level}</strong>
             </div>

        </div>

        <div className="comm-btn">
          <div className="comm-loader">
            {
              loading ? <Spinner/> : ''
            }
          </div>
          <button onClick={fetchData}>Generate</button>
        </div>

      </header>

      <div className="comm-outer">

        <div className="comm-left">
            <div className="comm-bars">
              <div className="dots">
                <div className="red"></div>
                <div className="yellow"></div>
                <div className="green"></div>
              </div>
              <div className="mac-btns">
                <button><BsFillEraserFill onClick={() => setCode('') }/></button>
                <button onClick={() => {navigator.clipboard.writeText(code) ; toast("Copied to Clipboard")}}><FaCopy /></button>
              </div>
            </div>
          <div className="comm-code">
            <Editor 
               value={code}
               onValueChange={code => setCode(code)}
               highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
               padding={10}
               className='como-cd'
               style={{
                 fontFamily: '"Fira code", "Fira mono", monospace',
                 borderRadius: "5px",
                 height: "100%",
                 width: "100%",
                 overflow: "scroll",
               }}
             />
          </div>
        </div>

        <div className="comm-right">
          <div className="comm-nav">
            <button onClick={() => {navigator.clipboard.writeText(response) ; toast("Copied to Clipboard")} }><FaCopy/></button>
          </div>
          <div className="comm-output">
            <Markdown>{String(response)}</Markdown>
          </div>
        </div>

      </div>

    </div>

  )

}

export default CodeComment
