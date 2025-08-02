import '../Style/Chat.css';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';
import Spinner from '../Others/Loader/Spinner'; 
import { IoSend } from "react-icons/io5";
import { LuWorkflow } from "react-icons/lu";
import MermaidChart from '../Others/Items/MermaidChart'
import {PROMPTS} from '../Others/Instructions/Prompt' ; 

import { TbMessageChatbotFilled } from "react-icons/tb";


const Chat = () => {

  const [scale, setScale] = useState(1);
  
    const zoomIn = () => setScale(prev => Math.min(prev + 0.1, 3));
    const zoomOut = () => setScale(prev => Math.max(prev - 0.1, 0.5));

    // ----------------- Usestates -----------------------
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const [topic , setTopic] = useState('') ; 

  const [chartcontent , setChartContent] = useState(`
    flowchart TD
    A[CodeEcho]

  `); 
  const [tempchart , setTempChart] = useState('') ; 

  // -------------- UseEffect --------------------------

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    setTopic(localStorage.getItem('Subject') ); 
  }, [messages, loading , topic]);

  // --------------- Handlers -------------------------

  const handleSend = async () => {

    if (!input.trim()) return;

    const newMessages = [...messages, { from: 'user', text: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const Prompt = `
      You are an AI-powered Master Computer Science Tutor, highly specialized in the core domain of ${topic} 
      (e.g., DSA, DBMS, OS, OOPs, CN, etc.).Your role is to deliver short, precise, and technically accurate 
      explanations suitable for beginners but aligned with academic and industry standards.
      Respond only with concise technical content relevant to the given topic.
      Do not provide any code unless explicitly requested — and if code is requested, 
      return only the code block without explanation or extra text.
      If a question is asked that does not pertain to the topic ${topic}, reply with:
      "Sorry, I specialize only in ${topic}. Please ask questions related to this topic."
      Ensure a professional, tutoring-focused tone throughout your responses.
      `; 
      const res = await axios.post('https://codeechobackend.onrender.com/ai/get-response', {
        code : input , instruction : Prompt , title:"Chat" 
      } , {withCredentials : true});

      setMessages([...newMessages, { from: 'bot', text: res.data }]);
      setLoading(false);
    }
    catch (err) {
      toast.error(err.response.data.message);
      setLoading(false) ; 
    } 
  };


  const FlowChartGenerate = async () => {

    try {
      setLoading(true) ; 
      const PROMPT = PROMPTS.ChatChart ; 
      const res = await axios.post("https://codeechobackend.onrender.com/ai/get-response" , 
        { code : tempchart , instruction : PROMPT , title:"ChatEase" }, 
        {withCredentials : true} 
      ); 


      const raw = res.data ; 
      const Cleaned = raw.replace(/```mermaid|```/g, '').trim(); 

      setChartContent(Cleaned) ; 

      setLoading(false) ; 
    }

    catch (error) {
      toast.error(error.response.data.message) ; 
      setLoading(false) ; 
    }
  }

  // ----------- Enter ---------------------

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // ---------------------------------------




    // ------------------------------------------

  return (


    <div className="top-main">

      <header className="chat-header">
        <div className="chat-title">
          <p className='chat-p'> ChatBot</p>
          <p className='chat-by'>By CodeEcho</p>
        </div>
        <div className="chat-text">
          <p>Heyy! I am expert in {topic} ask me anything about this topic</p>
        </div>
      </header>

      <div className="chat-contents">
        
        <div className="chat-left">
            <div className="gemini-container">

            <div className="chat-thread">
              {messages.map((msg, i) => (
                <div key={i} className={`chat-bubble ${msg.from}`}>
                  {msg.from === 'bot' && <span className="sparkle-icon" onClick={() => setTempChart(msg.text) }><TbMessageChatbotFilled /></span>}
                  <div className="chat-text">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeHighlight]}
                    >
                      {msg.text} 
                    </ReactMarkdown>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="chat-bubble bot">
                  <span className="sparkle-icon"><TbMessageChatbotFilled /></span>
                  <div className="chat-text typing"> Generating.. </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <div className="input-area">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask Codeecho"
              />
              <button onClick={handleSend} disabled={loading}> <IoSend /> </button>
            </div>

          </div>
        </div>

        

        <div className="chat-upper-right top-uu">
          <div className="chat-tur">
            <div className="chat-ps">
              <button className='ex-btn' onClick={FlowChartGenerate}>
                { loading ? 'Loading..' : 'Generate' }
              </button>
              <button onClick={zoomIn} className='chat-btn'>+</button>
              <button onClick={zoomOut} className='chat-btn'>-</button>
            </div>
          </div>
          <div className="chat-right">
            <div className="chat-chart" style={{ transform: `scale(${scale})` }}>
              <MermaidChart chart={chartcontent} />
            </div>
          </div>
        </div>

      </div>


    </div>


  )
}

export default Chat
