import React, { useState } from 'react'
import '../Style/CodeExplain.css'
import Spinner from '../Others/Loader/Spinner' ; 
import axios from 'axios';
import {PROMPTS} from '../Others/Instructions/Prompt' ; 
import prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import Editor from 'react-simple-code-editor';
import Markdown from 'react-markdown';
import MermaidChart from '../Others/Items/MermaidChart'
import { LiaStarSolid } from "react-icons/lia";
import toast from 'react-hot-toast';
import { FaCopy } from "react-icons/fa6";


const CodeExplainer = () => {

    const [scale, setScale] = useState(1);
  
    const zoomIn = () => setScale(prev => Math.min(prev + 0.1, 3));
    const zoomOut = () => setScale(prev => Math.max(prev - 0.1, 0.5));
  

  // ------------ Usestate ----------------------
  const [code , setCode] = useState(`
    int sum ( int n ){
      int temp = 0 ; 
      for( int i=0 ; i<n ; i++ ){
        temp += i ; 
      }
      return temp ; 
    }
  `) ;
  const [response , setResponse] = useState('Response Generated Here ... ') ; 
  const [loading , setLoading] = useState(false) ; 
  const [chartres , setChartRes] = useState(`
    graph TD
      A[Start] --> B[User Visits CodeEcho]
      B --> C[User Uploads or Pastes Code]
      C --> D[Chooses Feature: Explain, Debug, Optimize, etc.]
      D --> E[Code Sent to Gemini AI Engine]
      E --> F[AI Processes and Analyzes the Code]
      F --> G[Smart Output Generated Explanation, Summary, etc.]
      G --> H[Display Result with Copy, Save, or Favorite Options]
      H --> I[End]
    `) ; 

  // ------------- Handlers ---------------------

  const FetchChart = async () => {

    try {
      setLoading(true) ; 
      const PROMPT = PROMPTS.CodeChartGen ; 

      const res = await axios.post("https://codeechobackend.onrender.com/ai/get-response" , 
        {code , instruction : PROMPT , title : "Code_Chart"} , 
        {withCredentials : true }
      ); 

      const raw = res.data ; 
      const cleared = raw.replace(/```mermaid|```/g, '').trim();
      setChartRes(cleared) ; 

      try {
        const PROMPT = PROMPTS.CodeExplain ; 

        const res = await axios.post("https://codeechobackend.onrender.com/ai/get-response" ,
          {code , instruction : PROMPT , title : "Code_Explainer" } 
          , {withCredentials : true} ) ; 

        setResponse(res.data) ; 
        setLoading(false) ; 
      }

      catch (error) {
        if(error.response.data.message === "" ){
          toast.error("An error occured") ; 
        }
        else{
          toast.error(error.response.data.message) ; 
        }
        setLoading(false) ; 
      }

      
    }
    
    catch (error) {
      toast.error(error.response.data.message) ; 
      setLoading(false) ; 
    }

  }

  // -------------- Add to Favourite ------------
  const AddToFavourite = async () => {
    try {
      const res = await axios.post("https://codeechobackend.onrender.com/user/addfavourite" , {code : code , response : response} , {withCredentials : true}) ; 

      toast(res.data.message) ;  
    }
    catch (error) {
      console.log("An error occured while adding to favourite : " , error)
    }
  }

  // --------------------------------------------


  return (

    <div className="ex-main">
      
      <header className="ex-header">
        <div className="ex-title">
          <p className='ex-p'>Code Explainer</p>
          <p className='ex-by'>By CodeEcho</p>
        </div>

        <div className="ex-controls">

          {
            loading ? <div> <Spinner/> </div> : 
            <button className='ex-fav' onClick={AddToFavourite}> <LiaStarSolid /> </button>
          }

          <button className='ex-fav' onClick={() => {navigator.clipboard.writeText(response) ; toast("Copied to Clipboard")}}> <FaCopy /> </button>
          <button className='ex-btn' onClick={FetchChart}> Explain </button>
        </div>
      </header>


      <div className="ex-contents">
        
        <div className="ex-code">
          <Editor 
              value={code}
              onValueChange={code => setCode(code)}
              highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
              padding={10}
              className='code'
              style={{
                fontFamily: '"Fira code", "Fira mono", monospace',
                height: "100%",
                width: "100%",
                overflow: "scroll",
                border : "none"
              }}
            />
        </div>

        <div className="ex-response">
          <Markdown>{String(response)}</Markdown>
        </div>

        <div className="ps">
              <button onClick={zoomIn} className='qu-btn'>+</button>
              <button onClick={zoomOut} className='qu-btn'>-</button>
        </div>

        <div className="ex-chart">
          <div className="top-chart" style={{ transform: `scale(${scale})` }} >
            <MermaidChart chart={chartres}/>
          </div>
        </div>

      </div>

    </div>

  )

}

export default CodeExplainer
