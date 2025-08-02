import React, { useState } from 'react'
import '../Style/CodeComplexity.css'
import Editor from 'react-simple-code-editor';
import prism from "prismjs";
import { PROMPTS } from '../Others/Instructions/Prompt';
import axios from 'axios' ; 
import ComplexityChart from '../Others/Items/ComplexityChart';
import { useEffect } from 'react';
import Spinner from '../Others/Loader/Spinner';
import Markdown from 'react-markdown';
import toast from 'react-hot-toast';


const CodeComplexity = () => {

  // --------------- useStates -------------------
  const [code , setCode] = useState(`
  int sum ( int a , int b ){
    int c = a + b ; 
    return c ; 
  }
  `) ; 
  const [complexity , setComplexity] = useState('') ; 
  const [pieceofcode , setPieceofcode] = useState('') ; 
  const [whythis , setWhythis] = useState('') ; 
  const [howtoimprove , setHowtoimprove] = useState('') ; 
  const [loading , setLoading] = useState('') ; 
  const [time, setTime] = useState('O(1)');
  const [space, setSpace] = useState('O(1)');

  // -------------- Handlers --------------------

    useEffect(() => {
      if (complexity) {
        const parts = complexity.trim().split(' ');
        if (parts.length >= 2) {
          setTime(parts[0]);
          setSpace(parts[1]);
        } else {
          setTime('Not Found');
          setSpace('Not Found');
        }
      }
    }, [complexity]);

    const ComplexityFetch = async () => {
      try {
        setLoading(true) ; 
        const Prompt = PROMPTS.ComplexityAnalyzer ; 
        const res = await axios.post("https://codeechobackend.onrender.com/ai/get-response" ,
           {code , instruction : Prompt , title:"Complexity_Analyzer"}
            , {withCredentials: true}) ; 

        const raw = res.data ; 
        const cleaned = raw.replace(/```json|```/g, '').trim();

        try {
          const parsedJSON = JSON.parse(cleaned);
          setComplexity(parsedJSON) ;
          setComplexity(parsedJSON.Complexity); 
          setPieceofcode(parsedJSON.PieceOfCode); 
          setHowtoimprove(parsedJSON.HowToImprove); 
          setWhythis(parsedJSON.WhyThisComplexity); 
          setLoading(false); 
        } catch (error) {
          toast.error("An error occured") ; 
        }
      }
      catch (error) {
        toast.error(error.response.data.message) ; 
      }
    }

    
  // ---------------------------------------------

  return (


    <div className="comp-main">

      <header className="comp-header">
        <div className="by">
          <h1>Complexity Analyzer</h1>
          <p>By CodeEcho</p>
        </div>
        <div className="comp-btn">
          <div className="comp-loader">
            {
              loading ? <Spinner/> : ''
            }
          </div>
          <button onClick={ComplexityFetch} className='ex-btn'> {loading ? 'loading..' : 'Analyze'} </button>
        </div>
      </header>

      <header className="comp-suggest">
        <div className="suggest">
          <p className='ct'> How to improve : </p>
          <Markdown>{String(howtoimprove)}</Markdown>
        </div>
      </header>

      <section className="comp-section">

        <div className="comp-outer">

          <div className="comp-left">

            <div className="comp-code">
              <Editor 
              value={code}
              onValueChange={code => setCode(code)}
              highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
              padding={10}
              className='comp-cc'
              style={{
                fontFamily: '"Fira code", "Fira mono", monospace',
                fontSize: 14,
                borderRadius: "5px",
                height: "100%",
                width: "100%",
                overflow: "auto",
              }}
              />
            </div>

            <div className="comp-piece">
              <div className="pieceofcode">
                <p className='ct'> Piece of code : </p>
                <Markdown>{String(pieceofcode)}</Markdown>
              </div>
            </div>

          </div>

          <div className="comp-right">

            <div className="comp-chart">
              <div className="chart-text">
                  <div className="time">
                    <p>Time : <span>{time}</span></p>
                  </div>
                  <div className="space">
                    <p>Space : <span>{space}</span></p>
                  </div>
              </div>
              <div className="chart-chart">
                <ComplexityChart time={time} space={space} />
              </div>
            </div>

            <div className="comp-why">
              <div className="why">
                <p className='ct'> Why this complexity : </p>
                <Markdown>{String(whythis)}</Markdown>
              </div>
            </div>

          </div>

        </div>

      </section>

    </div>


  )
}

export default CodeComplexity
