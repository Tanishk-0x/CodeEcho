import React, { useEffect, useState } from 'react'
import '../Style/CodeExplain.css'
import Editor from 'react-simple-code-editor';
import prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import MermaidChart from '../Others/Items/MermaidChart'
import {PROMPTS} from '../Others/Instructions/Prompt' ; 
import axios from 'axios';
import Spinner from '../Others/Loader/Spinner' ; 
import toast from 'react-hot-toast';

const CodeReviewer = () => {

  // ----------- UseState ----------------
  const [code , setCode] = useState(`
    int calc ( int n ){
      int sum = 0 ; 
      for(int i=0 ; i<n ; i++ ){
        sum += i ; 
      }
     return sum ; 
    }  
  `) ; 
  const [response , setResponse] = useState('') ; 
  const [pie , setPie] = useState(`
    pie
    "Readable Code" : 16
    "Efficient Logic" : 16
    "Well-Commented" : 16
    "Needs Improvement" : 16
    "Error Handling Present" : 16
    "Modular/Reusable Functions" : 16
  `);
  const [loading , setLoading] = useState(false) ; 

  // ------------ Handlers ---------------

  useEffect( () => {
      setPie(`
        pie
        "Readable Code" : 16
        "Efficient Logic" : 16
        "Well-Commented" : 16
        "Needs Improvement" : 16
        "Error Handling Present" : 16
        "Modular/Reusable Functions" : 16
        `)
  },[]); 


  const fetchData = async () => {
    try {
      setLoading(true) ; 
      const PROMPT = PROMPTS.CodeReviews ; 
      const res = await axios.post("https://codeechobackend.onrender.com/ai/get-response" ,
         {code , instruction : PROMPT , title : "NULL"}, 
         {withCredentials: true}  ) ; 

        const raw = res.data ; 

        const cleaned = raw.replace(/```json|```/g, '').trim();

        try {
          const parsedJSON = JSON.parse(cleaned);
          setResponse(parsedJSON) ;
        } catch (error) {
          toast.error("An error occured") ; 
        }
        setLoading(false) ; 
    }
    catch (error) {
      setLoading(false) ; 
    }
  }

  
  const FetchPieData = async () => {
    try {
      setLoading(true) ; 
      const PROMPT = PROMPTS.PieChart ; 
      const res = await axios.post("https://codeechobackend.onrender.com/ai/get-response" ,
         {code , instruction : PROMPT , title : "Code_Reviewer" } ,
          {withCredentials : true} ) ; 

      setPie(res.data) ;     

    } 
    catch (error) {
      toast.error(error.response.data.message) ; 
    }
  }; 


  // --------------------------------------


  return (


    <div className="review-main">
      
      <header className="review-header">
        <div className="ex-title rev-title">
          <p className='ex-p rev-p'>Code Reviewer</p>
          <p className='ex-by rev-by'>By CodeEcho</p>
        </div>
        <div className="review-controls">
          {
            loading ? <Spinner/> : <div className="score"> {response.score} <span> /10</span></div>
          }
          <button className='rev-btn' onClick={() => { FetchPieData() ; fetchData() } }>Click</button>
        </div>
      </header>

      <div className="review-contents">

          <div className="rev-cr">

            <div className="rev-code">
              <div className="rev-usercode">
                <Editor 
                  value={code}
                  onValueChange={code => setCode(code)}
                  highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
                  padding={10}
                  style={{
                    fontFamily: '"Fira code", "Fira mono", monospace',
                    borderRadius: "5px",
                    height: "100%",
                    width: "100%",
                    overflow: "scroll",
                  }}
                />
              </div>
              <div className="rev-section">
                <p>Perfornmance : <span>{response.performance}</span></p>
              </div>
            </div>

            <div className="rev-pie">
                <MermaidChart chart={pie}/>
            </div>

          </div>

          <div className="rev-others">
            
            <div className="review-scenes">
              <div className="rev-one potential">
                <p>Potential bugs : <span>{response.potential_bugs}</span></p>
              </div>
              <div className="rev-one smell">
                <p>Smell : <span>{response.smell}</span></p>
              </div>
              <div className="rev-one suggestion">
                <p>Suggestion : <span>{response.suggestion}</span></p>
              </div>
            </div>

            <div className="rev-final">
              <p>Final Verdict : <span>{response.final_verdict}</span></p>
            </div>

          </div>

      </div>

    </div>


  )


}

export default CodeReviewer
