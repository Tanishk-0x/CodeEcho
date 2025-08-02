import React, { useState } from 'react'
import '../Style/TopicExplainer.css';
import Spinner from '../Others/Loader/Spinner'; 
import MermaidChart from '../Others/Items/MermaidChart'
import {PROMPTS} from '../Others/Instructions/Prompt';
import axios from 'axios' ; 
import TypingEffect from '../Others/Typing/typing';
import toast from 'react-hot-toast';

const TopicExplainer = () => {

    // ------------- UseStates -------------------
    const[topic , setTopic] = useState('jsonwebtoken') ; 
    const[response , setResponse] = useState('') ; 
    const[loading , setLoading] = useState(false) ; 

    const[flowChart , setFlowChart] = useState(`
      flowchart TD
        A[Start] --> B(User Inputs a Technical Topic)
        B --> C(Check Topic Validity)
        C -->|Valid| D(Generate Definition)
        D --> E(Create Real-life Example)
        E --> F(Explain Working & Use-Cases)
        F --> G(Generate Mermaid Flowchart)
        G --> H(Assemble Final Explanation Block)
        H --> I[Display Complete Topic Explanation]
    `);

    const[defination , setDefination] = useState('') ; 
    const[description , setDescription] = useState('') ; 
    const[example , setExample] = useState('') ; 

    // -------------- Scale ------------------

    const [scale, setScale] = useState(1);

    const zoomIn = () => setScale(prev => Math.min(prev + 0.1, 3));
    const zoomOut = () => setScale(prev => Math.max(prev - 0.1, 0.5));

    // -------------- Handlers ------------------

    const fetchChartData = async () => {

      try {
        setLoading(true) ; 
        const Prompt = PROMPTS.FlowChartData ; 
        const res = await axios.post("https://codeechobackend.onrender.com/ai/get-response" , 
          {code : topic , instruction : Prompt , title:"Topic_Explainer" }, 
          {withCredentials : true}
        ); 
        

        const raw = res.data ; 
        const cleared = raw.replace(/```mermaid|```/g, '').trim();
        setFlowChart(cleared) ; 

        const Prompt0 = PROMPTS.TopicExplain ; 
        const result = await axios.post("https://codeechobackend.onrender.com/ai/get-response" , 
          {code : topic , instruction : Prompt0 , title:"NULL"}, 
          {withCredentials : true}
        ); 

        const temp = result.data ; 
        const cleanedjson = temp.replace(/```json|```/g, '').trim(); 

        try {
          const parsedJSON = JSON.parse(cleanedjson);
          setResponse(parsedJSON) ;
          setDefination(parsedJSON.definition) ; 
          setDescription(parsedJSON.description) ; 
          setExample(parsedJSON.example) ; 
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


    // ------------------------------------------

  return (


    <div className="top-main">

      <header className="top-header">
        <div className="top-title">
          <p className='top-p'>Topic Explainer</p>
          <p className='top-by'>By CodeEcho</p>
        </div>
        <div className="top-controls">
          {
            loading ? <Spinner/> : <input type="text" placeholder='enter topic' onChange={(event) => setTopic(event.target.value)}/>
          }
          <button className='ex-btn' onClick={fetchChartData}>Explain</button>
          
        </div>
      </header>

      <div className="top-contents">
        
        <div className="top-left">
          <div className="top-defin">
            <span className='df df1'>#Defination : <span className='dfe'><TypingEffect text={defination} speed={30}/></span></span>
          </div>
          <div className="top-desc">
            <span className='df df2'>#Description : <span className='dfe'><TypingEffect text={description} speed={30}/></span></span>
          </div>
          <div className="top-example">
            <span className='df df3'>#Example : <span className='dfe'><TypingEffect text={example} speed={30}/></span></span>
          </div>
        </div>

        

        <div className="top-upper-right">
          <div className="tur">
            <div className="ps">
              <button onClick={zoomIn} className='qu-btn'>+</button>
              <button onClick={zoomOut} className='qu-btn'>-</button>
            </div>
          </div>
          <div className="top-right">
            <div className="top-chart" style={{ transform: `scale(${scale})` }}>
              <MermaidChart chart={flowChart} />
            </div>
          </div>
        </div>

      </div>


    </div>


  )
}

export default TopicExplainer
