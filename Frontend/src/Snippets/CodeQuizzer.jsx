import React, { useState } from 'react'
import '../Style/CodeQuizzer.css'; 
import {PROMPTS} from '../Others/Instructions/Prompt';
import axios from 'axios'; 
import prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import Editor from 'react-simple-code-editor';
import Markdown from 'react-markdown';
import { VscDebugStart } from "react-icons/vsc";
import Spinner from '../Others/Loader/Spinner'; 
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import { TbSend } from "react-icons/tb";
import toast from 'react-hot-toast';


const CodeQuizzer = () => {

  // ------------- UseState Hook ---------------------
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
  const[loading , setLoading] = useState('') ; 
  const[questions , setQuestions] = useState([]) ; 
  const[index , setIndex] = useState(0) ; 
  const[count , setCount] = useState(0) ; 
  //---------- Submit Usestates ------------
  const[correctAnswer , setCorrectAnswer] = useState(0) ; 
  const[wrongAnswer , setWrongAnswer] = useState(0) ; 

  // -------------- Handlers -------------------------

  const FetchQuiz = async () => {

    try {
      setLoading(true) ; 
      const Prompt = PROMPTS.CodeQuizzer ; 
      const res = await axios.post("https://codeechobackend.onrender.com/ai/get-response" , 
        { code , instruction : Prompt , title:"CodeQuizzer" }, 
        {withCredentials : true}
      ); 

      const raw = res.data ; 
      const cleaned = raw.replace(/```json|```/g, '').trim(); 

      try {
        const parsedJSON = JSON.parse(cleaned);
        setResponse(parsedJSON) ;
        setQuestions(parsedJSON.questions) ; 
        setIndex(0) ; 
        setLoading(false) ; 
        toast("Test Started!")
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


  const currentQ = questions[index] || {question: '' , options: []} ; 

  const next = (selectedAnswer) => {
    if( selectedAnswer === currentQ.correct ){
      setCount(prev => prev + 1);
    }
  
    if(index < questions.length - 1 ){
      setIndex(prev => prev + 1); 
    }
  }

  const submitQuiz = () => {
    if( index > 18 ){
      setCorrectAnswer(count) ; 
      setWrongAnswer(20-count) ; 
      toast("Test Submitted") ; 
    }
    else{
      toast("Attempt All") ; 
    }
  }
  

  // -------------------------------------------------


  return (


    <div className="q-main">

      <header className="q-header">
        <div className="q-title">
          <p className="q-p">Code Quizzer</p>
          <p className="q-by">By CodeEcho</p>
        </div>
        <div className="q-controls">

          <div className="loader">
            {
              loading ? <Spinner/> : ''
            }
          </div>

          {/* <button onClick={next} className='qu-btn'><TbPlayerTrackNextFilled /></button> */}
          <button onClick={FetchQuiz} className='qu-btn'><VscDebugStart /></button>
          <button onClick={submitQuiz} className='qu-btn'><TbSend /></button>
        </div>
      </header>

      <div className="q-contents">
        
        <div className="q-left">
          <div className="q-code">
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
              }}
            />
          </div>
          <div className="q-bar">
            <p>CodeQuizzer transforms your code into a playground of questions, sparking curiosity with every line.
              It’s not just analysis — it’s an elegant dance between logic and learning.  </p>
          </div>
        </div>

        <div className="q-right">
          
          <div className="q-question">
              <p> <span>Question.{index+1} :</span>  {currentQ.question} </p>
          </div>

          <div className="optsec-1">
            <div className="q-option q-a" onClick={() => next(currentQ.options[0])}> <p><span>A : </span>  {currentQ.options[0]}</p> </div>
            <div className="q-option q-b" onClick={() => next(currentQ.options[1])} > <p><span>B : </span> {currentQ.options[1]}</p> </div>
          </div>

          <div className="optsec-2">
            <div className="q-option q-c" onClick={() => next(currentQ.options[2])} > <p><span>C : </span> {currentQ.options[2]}</p> </div>
            <div className="q-option q-d" onClick={() => next(currentQ.options[3])} > <p><span>D : </span> {currentQ.options[3]}</p> </div>
          </div>

          {/* <div className="q-solvedbar">
            Bars!
          </div> */}

          <div className="q-result">
            <div className="q-r">
              <div className="r1">
                <p>Total Questions </p>
                <p>20</p>
              </div>
              <div className="r2">
                <p>Correct Answer</p>
                <p>{correctAnswer}</p>
              </div>
              <div className="r3">
                <p>Wrong Answer</p>
                <p>{wrongAnswer}</p>
              </div>
            </div>
            <div className="q-w">
              <p className='rules'>Directives : </p>
              <div className='ru'>
                <p>Input must be a valid code snippet (C++, Python, Java, etc.).</p>
                <p>System will generate 20 MCQ-based questions.</p>
                <p>Questions cover logic, output, syntax, complexity, etc.</p>
                <p>Each question has 4 options, only one is correct.</p>
                <p>Submit to track your score (correct , incorrect) </p>
                <p>Questions are randomly ordered for fairness.</p>
                <p>One question is visible at a time for better focus.</p>
              </div>
            </div>
          </div>

        

        </div>

      </div>

    </div>


  )

}

export default CodeQuizzer
