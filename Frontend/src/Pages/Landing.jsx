import React, { useEffect, useState } from 'react'
import '../Style/Landing.css'
import '../Style/Navbar.css'
import { SiGooglegemini } from "react-icons/si";
import { TbCodeDots } from "react-icons/tb";
import { PiSealQuestionDuotone } from "react-icons/pi";
import { VscOpenPreview } from "react-icons/vsc";
import { IoBulb } from "react-icons/io5";
import { PiFlowArrowBold } from "react-icons/pi";
import PricingSection from './Pricing';
import logoimg from '../Others/Assets/codeecho-logo.png'
import TypingEffect from '../Others/Typing/typing'
import demo from '../Others/Assets/codeecho-demo.mp4'
import { Link, useNavigate } from 'react-router-dom';
import { FaCode } from "react-icons/fa";
import { VscDebugConsole } from "react-icons/vsc";
import { MdTimeline } from "react-icons/md";
import { LiaCommentsSolid } from "react-icons/lia";
import { FaCheckDouble } from "react-icons/fa";
import { TbArrowBigUpLinesFilled } from "react-icons/tb";
import { FaUserCircle } from "react-icons/fa";
import axios from 'axios' ; 
import toast from 'react-hot-toast' ; 
import { FaBars, FaTimes, FaChevronDown } from 'react-icons/fa';
import { FaAngleUp } from "react-icons/fa6";
import { TbArrowsExchange2 } from "react-icons/tb";
import { SiQuizlet } from "react-icons/si";
import { MdOutlineReviews } from "react-icons/md";
import emailjs from '@emailjs/browser';
import Footer from '../Components/Footer';
import { MdScreenshotMonitor } from "react-icons/md";
import snapshot1 from '../Others/Assets/snapshot1.png'; 
import snapshot2 from '../Others/Assets/snapshot2.png'; 
import snapshot3 from '../Others/Assets/snapshot3.png'; 
import snapshot4 from '../Others/Assets/snapshot4.png'; 
import snapshot5 from '../Others/Assets/snapshot5.png'; 
import snapshot6 from '../Others/Assets/snapshot6.png'; 
import snapshot7 from '../Others/Assets/snapshot7.png'; 
import snapshot8 from '../Others/Assets/snapshot8.png'; 
import snapshot9 from '../Others/Assets/snapshot9.png'; 
import snapshot10 from '../Others/Assets/snapshot10.png'; 
import { PiToolboxFill } from "react-icons/pi";
import { RiFlashlightLine } from "react-icons/ri";



const Landing = () => {

  const navigate = useNavigate() ; 

  const images = [
    snapshot9,
    snapshot3 , 
    snapshot2 , 
    snapshot10 , 
    snapshot5 , 
    snapshot4 , 
    snapshot8 , 
    snapshot6 , 
    snapshot7 , 
  ];

  const features = [
    {
      icon: <PiToolboxFill />,
      heading: 'All-in-One Toolkit' , 
      title: 'From code summarization to complexity analysis - access every feature you need under one roof',
    },
    {
      icon: <SiGooglegemini />,
      heading : 'Ai-Powered Precision',
      title: 'Experience smart code analysis backend by Gemini Api. Get accurate explanation and instant analysis',
    },
    {
      icon: <RiFlashlightLine />,
      heading: 'Understand Instantly',
      title: 'No more guessing what a block does. Get instant human readable analysis for even the complex code logic',
    },
    
  ];

  // ----------- Navbar Responsive Usestate/Handler ------------
    const [toggle, setToggle] = useState(false);
    const [featuresOpen, setFeaturesOpen] = useState(false);
  // ----------------------------------------------------------

  // ----------------------- UseStates -------------------------
    const [user , setUser] = useState(null) ; // to check ?? 
    const [username , setUserName] = useState('') ; 
  // -----------------------------------------------------------


  // -- UseEffect that call CheckLoginStatus() i.e check where the user is logged in or not ?? --
  // -- useEffect Executes on the first render --

  useEffect( () => {

    const checkLoginStatus = async () => {

        try {
          const res = await axios.get("https://codeechobackend.onrender.com/check/authme" , {withCredentials : true}) ; 
          if(res.data.success){
            setUser(res.data.user) ; 
            setUserName(res.data.user.name) ; 
          }
          else{
            setUser(null) ; 
          }
        }

        catch (error) {
          setUser(null) ; 
        }

    }

    checkLoginStatus() ; // calling ... 

  }, []); 


  // -------------------------------------------------------------
  const[message , setMessage] = useState('') ;  

  const templateParams = {
    from_name : username , 
    message : message , 
  }; 

  const sendMessage = () => {
    emailjs.send(
      "service_mxlswiq" , 
      "template_hebqdcv" , 
      templateParams ,  
      "CEoGpm9Q9kVRKa3DR" , 
    )
    .then( (result) => {
      setMessage('') ; 
      toast("Message send to admin")
 
    } , 
    (error) => {
    }
  )

  }


  // -------------------------------------------------------------

  // ------------------------------------------------------------

  return (

    <div className="landing-main">
      
      <header className="navbar">

        <div className="nav-logo">
          <img src={logoimg} alt="CodeEcho" />
        </div>

        <div className='nav-round'>
          <div> Go beyond the syntax to unlock real understanding </div>
        </div>

        <nav className={`nav-links ${toggle ? 'open' : ''}`}>

          <div className="nav-item dropdown">
            <button className='features' onClick={() => setFeaturesOpen(!featuresOpen)}>
              Features 
              {
                featuresOpen ? <FaAngleUp className="chevron"/> : <FaChevronDown className="chevron"/>
              }
            </button>

            <div className={`dropdown-menu ${featuresOpen ? 'show' : ''}`}>
              <div className="dropdown-item" onClick={() => navigate('/codeexplainer')}><FaCode />Code Explainer</div>
              <div className="dropdown-item" onClick={() => navigate('/codecomplexity')}><MdTimeline /> Complexity </div>
              <div className="dropdown-item" onClick={() => navigate('/codeconverter')}><TbArrowsExchange2 /> Language Con</div>
              <div className="dropdown-item" onClick={() => navigate('/codecomment')}><LiaCommentsSolid /> Comment Gen</div>
              <div className="dropdown-item" onClick={() => navigate('/codereviewer')}><MdOutlineReviews /> Code Reviewer</div>
              <div className="dropdown-item" onClick={() => navigate('/codequizzer')}><SiQuizlet /> Code Quizzer</div>
              <div className="dropdown-item" onClick={() => navigate('/codesummarizer')}><FaCheckDouble /> Code Sumarizer</div>
              <div className="dropdown-item" onClick={() => navigate('/codeoptimizer')}><TbArrowBigUpLinesFilled /> Code Optimizer</div>
              <div className="dropdown-item" onClick={() => navigate('/topicexplainer')}><PiFlowArrowBold /> Topic Explainer </div>
            </div>
          </div>

          
          <div className="nav-item" onClick={() => navigate('/chatbots')}>ChatEase</div>
          <div className="nav-item" onClick={() => navigate('/docs')}>About</div>

          <div className="auth-btns">
            {
              user ? 
                <div className='nav-profile'>
                  <div className='plg' onClick={() => navigate('/profile')}><FaUserCircle /></div>
                </div>
                :
                <div className='lrbtns'>
                  <button className="login" id='log-btn'onClick={() =>navigate('/login')}>Login</button>
                  <button className="register" id='rg-btn' onClick={() => navigate('/signup')} >Signup</button>
                </div>
            }
          </div>
        </nav>

        <div className="menu-icon" onClick={() => setToggle(!toggle)}>
          {toggle ? <FaTimes /> : <FaBars />}
        </div>

        {toggle && <div className="overlay" onClick={() => setToggle(false)}></div>}
          
      </header>

      <div className="landing-texts">

        <div className="texts-outer">
          <div className="text-round">
            <p><span><SiGooglegemini /></span> Gemini x CodeEcho: Dev Revolution</p>
          </div>
          <div className="intro">
            <p>AI-Driven Coding<span> Companion</span></p>
          </div>
          <div className="tagline">
            <p>Transform complex code into clear insights with CodeEcho's intelligent AI tools.</p>
          </div>
          <div className="para">
            <p>CodeEcho is your intelligent coding companion that brings clarity and ease to development</p>
          </div>
          <div className="landing-btn">
          <input type="text" placeholder='type a message' onChange={(e) => setMessage(e.target.value)} value={message}/>
          <button onClick={sendMessage}>Explore</button>
          </div>
        </div>


      </div>

      <div className="preview">
        <div className="demo">
          <video className='demo-video' src={demo} autoPlay loop muted />
        </div>
      </div>

      <div className="features-section">

        <div className="feature-header">
          <p className='feat-heading why-title'>Features</p>
          <p className='feat-para'>Equipped with smart features, CodeEcho transforms how to approach code—from insight to execution</p>
        </div>
        <div className="feat">
          
            <div className="feat-card">
              <div className="high"><TbCodeDots /><button onClick={() => navigate('/codeexplainer')}>try now</button></div>
              <div className="mid">Code Explainer</div>
              <div className="low"> Understand what your code is doing with clear, AI-powered explanations. Perfect for grasping logic, structure, and flow—whether it's your own code or someone else's </div>
            </div>
            <div className="feat-card">
              <div className="high"><VscDebugConsole /><button onClick={() => navigate('/codeconverter')}>try now</button></div>
              <div className="mid">Code Convertor</div>
              <div className="low"> Seamlessly translate your code between languages with AI accuracy. Maintain logic and structure while adapting to your preferred programming environment provides multi-language support</div>
            </div>
            <div className="feat-card">
              <div className="high"><MdTimeline /><button onClick={() => navigate('/codecomplexity') }>try now</button></div>
              <div className="mid">Complexity Analyzer</div>
              <div className="low"> Get precise time and space complexity analysis. Understand performance bottlenecks and optimize your code with AI-driven insights for faster, optimized programming </div>
            </div>
            <div className="feat-card">
              <div className="high"><LiaCommentsSolid /><button onClick={() => navigate('/codecomment')}>try now</button></div>
              <div className="mid">Comment Generator</div>
              <div className="low"> Automatically generate clear, meaningful comments for your code. Enhance readability, documentation, and team collaboration with AI-curated descriptions tailored to your logic and structure </div>
            </div>
            <div className="feat-card">
              <div className="high"><FaCheckDouble /><button onClick={() => navigate('/codesummarizer')}>try now</button></div>
              <div className="mid">Code Summarizer</div>
              <div className="low"> Get concise overviews of your code. Instantly understand logic, flow, and functionality with AI-generated summaries that simplify complex code for faster learning and clarity. </div>
            </div>
            <div className="feat-card">
              <div className="high"><TbArrowBigUpLinesFilled /><button onClick={() => navigate('/codeoptimizer')}>try now</button></div>
              <div className="mid">Code Optimizer</div>
              <div className="low"> Optimize your code’s time and space complexity with AI-driven improvements. Refactor logic, eliminate redundancies, and enhance performance while maintaining clean, efficient, and scalable structure </div>
            </div>
            <div className="feat-card">
              <div className="high"><PiSealQuestionDuotone /><button onClick={() => navigate('/codequizzer')}>try now</button></div>
              <div className="mid">Code Quizzer</div>
              <div className="low"> Paste your code and get AI-generated quizzes tailored to it. Reinforce concepts, spot weak points, and enhance understanding through focused, code-related assessments </div>
            </div>
            <div className="feat-card">
              <div className="high"><VscOpenPreview /><button onClick={() => navigate('/codereviewer')}>try now</button></div>
              <div className="mid">Code Reviewer</div>
              <div className="low"> Get clear AI feedback on your code’s structure, logic, quality, readability, performance, and overall best practices to help you write cleaner and more reliable programs </div>
            </div>
            <div className="feat-card">
              <div className="high"><IoBulb /><button onClick={() => navigate('/topicexplainer')}>try now</button></div>
              <div className="mid">Topic Explainer</div>
              <div className="low"> Understand complex programming concepts with simple, AI-powered breakdowns, relatable analogies, crisp definitions, real-world examples, and instant, hassle-free clarity for better learning </div>
            </div>

        </div>
      </div>



      <section className="why-us-section">
        <h2 className="why-title">Why CodeEcho</h2>
        
        <div className="why-cards">
          {features.map((item, index) => (
            <div className="why-card" key={index}>
              <div className="why-icon">
                <div className='why-logo'> {item.icon} </div>
                <div className='why-heading'> {item.heading} </div>
              </div>
              <p className='why-desc'>{item.title}</p>
            </div>
          ))}
        </div>
      </section>


      <div className="masonry-gallery">
        <h2 className="gallery-title"> <span className='snapshot'> <MdScreenshotMonitor /> </span>Snapshots</h2>
        <div className="gallery-masonry">
          {images.map((src, index) => (
            <div className="gallery-item" key={index}>
              <img src={src} alt={`gallery-${index}`} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
      

      <PricingSection/>

      
      <Footer/>   

      <div className="text-wrapper">
        <div className="shadow-dance-container">
            <h1 className="shadow-dance-text">CodeEcho</h1>
        </div>
      </div>

      

    </div>

    

  )

}

export default Landing
