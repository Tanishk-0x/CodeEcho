import React, { useState } from 'react'
import '../Style/CodeSummarizer.css'
import { FaSeedling } from "react-icons/fa";
import { FaTools } from "react-icons/fa";
import { FaSitemap } from "react-icons/fa";
import prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import Editor from 'react-simple-code-editor';
import { IoIosCopy } from "react-icons/io";
import { PROMPTS } from '../Others/Instructions/Prompt';
import axios from 'axios';
import TypingEffect from '../Others/Typing/typing' ; 
import toast from 'react-hot-toast'
import Spinner from '../Others/Loader/Spinner' ;

const CodeSummarizer = () => {

  // ------------ USeStates --------------
  const [code , setCode] = useState(`
  int clac ( int n ){
    int sum = 0 ; 
      for(int i=0 ; i<=n ; i++ ){
        sum += i ; 
      }
    return sum ;     
  }  
  `) ; 
  const[words , setWords] = useState(50) ; 
  const[hash , setHash] = useState('#logic') ; 
  const[tag , setTag] = useState('summary') ; 
  const[level , setLevel] = useState('Begineer') ; 
  const[response , setResponse] = useState('') ; 
  const[loading , setLoading] = useState(false) ; 

  // ------------- Handlers --------------

  const FetchCodeSummarizer = async () => {

    try {
      setResponse('') ; 
      setLoading(true) ; 

      const PROMPT = PROMPTS.CodeSummarizer ; 
      const params = `The level of the summary should be ${level}, the number of words should be ${words}, the tags are ${tag}, and the focus hashtag is ${hash}`;
      const FinalPrompt = PROMPT + " " + " { " + params + " } " ; 
      
      const res = await axios.post("https://codeechobackend.onrender.com/ai/get-response" , 
        {code , instruction : FinalPrompt , title:"Code_Summarizer" } ,
         {withCredentials : true } ); 

      setResponse(res.data) ; 
      setLoading(false) ;    
    }
    
    catch (error) {
      toast.error(error.response.data.message) ; 
      setLoading(false) ; 
    }
  }

  // ------------------------------------


  return (


    <div className="sum-main">
      
      <header className="sum-header">

        <div className="sum-title">
          <p className='sum-p'>Code Summarizer</p>
          <p className="sum-by">By CodeEcho</p>
        </div>

        <div className="sum-controls">

          <div className="sum-views">
            <div>
              <p>Choose Summary View : </p>
            </div>
            <div className='view'>
              <p onClick={() => setLevel('Begineer')}><FaSeedling /></p>
              <p onClick={() => setLevel('Technical')}><FaTools /></p>
              <p onClick={() => setLevel('Architectural')}><FaSitemap /></p>
            </div>
          </div>
          
          <div className="tag-btn">
            <div className="sum-tags">
              <div className="tag" onClick={() => setTag('Function Wise Summary')}>Function Wise Summary</div>
              <div className="tag" onClick={() => setTag('High Level Logic') }>High Level Logic </div>
              <div className="tag" onClick={() => setTag('Data Structure Used')}>Data Structure Used</div>
              <div className="tag" onClick={() => setTag('Flow Summary')}>Flow Summary</div>
              <div className="tag" onClick={() => setTag('Important Conditions')}>Important Conditions </div>
              <div className="tag" onClick={() => setTag('Complexity Brief')}>Complexity Brief</div>
              <div className="tag" onClick={() => setTag('Edge Case Handling')}>Edge Case Handling</div>
            </div>
            {
              loading ? <Spinner/> : 
              <div>
                <button className='sum-btn'  onClick={FetchCodeSummarizer}>Summarize</button>
              </div>
              
            }
          </div>


        </div>

      </header>


      <div className="sum-contents">

        <div className="sum-left">
          <div className="code-header">
            <div className="dots">
              <div className="red"></div>
              <div className="yellow"></div>
              <div className="green"></div>
            </div>
            <p className='sum-copy' onClick={() => {navigator.clipboard.writeText(code) ; toast("Copied to Clipboard")}}><IoIosCopy /></p>
          </div>
          <div className="sum-code">
            <Editor 
              value={code}
              onValueChange={code => setCode(code)}
              highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
              padding={10}
              className='sum-codee'
              style={{
                fontFamily: '"Fira code", "Fira mono", monospace',
                height: "100%",
                width: "100%",
                overflow: "scroll",
              }}
            />
          </div>
        </div>

        <div className="sum-right">
          <div className="sum-nav">
            <div className='sum-inp'>
              <input type="number" placeholder='Words' onChange={(event) => setWords(event.target.value)}/>
              <input type="text" placeholder='#Tags' onChange={(event) => setHash(event.target.value)}  />
            </div>
            <div className='btn-dis'>
              <button className='copy-btn' onClick={() => {navigator.clipboard.writeText(response) ; toast("Copied to Clipboard")}}><IoIosCopy /></button>
            </div>
          </div>
          <div className="sum-response">
            <TypingEffect text={response} speed={30}/>
          </div>
        </div>

      </div>

    </div>
 

  )

}

export default CodeSummarizer
