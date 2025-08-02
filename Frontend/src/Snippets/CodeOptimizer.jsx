import React, { useState } from 'react'
import '../Style/CodeOptimizer.css' 
import { FaTools } from "react-icons/fa";
import { TbBoltFilled } from "react-icons/tb";
import Editor from 'react-simple-code-editor';
import prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import { IoIosCopy } from "react-icons/io";
import toast from 'react-hot-toast';
import axios from 'axios' ; 
import {PROMPTS} from '../Others/Instructions/Prompt' ; 
import Markdown from 'react-markdown';
import Spinner from '../Others/Loader/Spinner';

const CodeOptimizer = () => {

  // -------------- UseStates -----------------
  const[code , setCode] = useState(`
    int calc( int n ){
      int sum = 0 ; 
        for(int i=0 ; i<=n ; i++ ){
          sum += i ; 
        }
      return sum ; 
    }
  `);
  const[response , setResponse] = useState('') ; 
  const[loading , setLoading] = useState(false) ; 
  const[opticode , setOptiCode] = useState('') ;

  // -------------- Handlers -----------------

  const FetchData = async () => {

    try {
      setLoading(true) ; 
      const Prompt = PROMPTS.OptimizedCode ; 
      const res = await axios.post("https://codeechobackend.onrender.com/ai/get-response" , 
        {code , instruction : Prompt , title:"Code_Optimizer"}, 
        {withCredentials: true}
      ); 

      setOptiCode(res.data) ; 

      // ------ Now Calling for JSON data ------
 
      const PromptJson =  `
        You are a code optimization analysis engine. I will give you two versions of code: the original (unoptimized) and the optimized version.
        Your task is to analyze and compare both versions and return ONLY a JSON object with the following fields:
        {
          "problem_summary": "A short summary of what was wrong in the original code.",
          "fix_summary": "A short summary of what was improved or fixed in the optimized code.",
          "original_code_runtime": "Estimated runtime of the original code (e.g., 120ms ) Give only runtime is ms not any description or anything",
          "optimized_code_runtime": "Estimated runtime of the optimized code (e.g., 30ms ) Give only runtime is ms not any description or anything",
          "original_code_time_complexity": "Time complexity of the original code (e.g., O(n^2))",
          "optimized_code_time_complexity": "Time complexity of the optimized code (e.g., O(n log n))",
          "original_code_space_complexity": "Space complexity of the original code (e.g., O(n))",
          "optimized_code_space_complexity": "Space complexity of the optimized code (e.g., O(1))"
        }
        DO NOT return anything other than the JSON object. No explanation, no markdown, no formatting, just the JSON.
        Here is the code input:
        Optimized Code:
        ${opticode}
        Original Code : 

      `;

      const result = await axios.post("https://codeechobackend.onrender.com/ai/get-response" , 
        {code , instruction : PromptJson , title:"NULL"}, 
        { withCredentials : true }
      ); 
      

      const temp = result.data ; 
      const cleaned = temp.replace(/```json|```/g, '').trim(); 

      try {
        const parsedJSON = JSON.parse(cleaned);
        setResponse(parsedJSON) ;
        setLoading(false) ; 
      }
      catch (error) {
        toast.error("An error occured") ; 
      }
      
    }
    
    catch (error) {
      toast.error(error.response.data.message) ; 
      setLoading(false) ; 
    }
  }

  const QuickFix = async () => {

    try {
      setLoading(true) ; 
      const Prompt = PROMPTS.QuickFix ; 
      const res = await axios.post("https://codeechobackend.onrender.com/ai/get-response" , 
        {code , instruction : Prompt , title:"Quick_Fixer"}, 
        { withCredentials : true }
      ); 
      setOptiCode(res.data) ; 
      setLoading(false) ; 
      
    } 
    catch (error) {
      toast.error(error.response.data.message) ; 
      setLoading(false) ; 
    }
  }

  // -----------------------------------------


  return (


    <div className="opt-main">

      <header className="op-header">
        <div className="opt-title">
          <p className="opt-p">Code Optimizer</p>
          <p className="opt-by">By CodeEcho</p>
        </div>
        <div className="opt-controls">
          <div className="loader">
            { loading ? <Spinner/> : '' }
          </div>
          <button className='opt-bt' onClick={FetchData}><TbBoltFilled /></button>
          <button className='opt-bt' onClick={QuickFix} ><FaTools /></button>
        </div>
      </header>

      <div className="opt-contents">
        <div className="opt-left">

          <div className="opt-code">
            <div className="codee-header">
              <div className="dots">
                <div className="red"></div>
                <div className="yellow"></div>
                <div className="green"></div>
              </div>
              <button className='copy-btn' onClick={() => {navigator.clipboard.writeText(code) ; toast("Copied to Clipboard")}}><IoIosCopy /></button>
            </div>
            <Editor 
              value={code}
              onValueChange={code => setCode(code)}
              highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
              padding={10}
              className='opt-codeee'
              style={{
                fontFamily: '"Fira code", "Fira mono", monospace',
                height: "100%",
                width: "100%",
                overflow: "scroll",
              }}
            />
          </div>
          <div className="opt-section">
            <p className="problem-opt">
              Problem : <span>{response.problem_summary}</span>
            </p>
            <p className="fixing-opt">
              Fixing : <span>{response.fix_summary}</span>
            </p>
          </div>
        </div>

        <div className="opt-right">

          <div className="opt-matric">
            <div className="metric-original">
              <p className='opt-heading'>Orignial code : </p>
              <p className='opt-sp'>Runtime : {response.original_code_runtime} </p>
              <p className='opt-sp'>Time Complexity : {response.original_code_time_complexity} </p>
              <p className='opt-sp'>Space Complexity : {response.original_code_space_complexity} </p>
            </div>
            <div className="matric-optimized">
              <p className='opt-heading'>Optimized code : </p>
              <p className='opt-sp'>Runtime : {response.optimized_code_runtime} </p>
              <p className='opt-sp'>Time Complexity : {response.optimized_code_time_complexity} </p>
              <p className='opt-sp'>Space Complexity : {response.optimized_code_space_complexity} </p>
            </div>
          </div>
          
          <div className="opt-response">
            <div className="res-header">
              <p className='optimized-p'>Optimized Code : </p>
              <p><button className='copy-btn' onClick={() => {navigator.clipboard.writeText(opticode) ; toast("Copied to Clipboard")}}><IoIosCopy /></button></p>
            </div>
            <div className="opt-res">
              <Markdown>{opticode}</Markdown>
            </div>
          </div>
        </div>
      </div>


    </div>


  )

}

export default CodeOptimizer
