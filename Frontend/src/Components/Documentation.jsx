import React from 'react';
import '../Style/Documentation.css';
import { RxGithubLogo } from "react-icons/rx";
import { RxLinkedinLogo } from "react-icons/rx";



const Documentation = () => {
  return (
    <div className="gallery-wrapper">
      <header className="gallery-header">
        <h1><span>About</span> CodeEcho</h1>
        <p>A multi-featured AI platform designed to decode complexity, enhance productivity</p>
      </header>

      <div className="gallery-container">

        <div className="gallery-itemss tall dark-1">
          <p className='gallery-text'><span className='gal-title'>Overview : </span>CodeEcho is a full-stack MERN application that leverages the power of Gemini AI to empower developers with a suite of intelligent coding tools. Designed to simplify and accelerate software development workflows, CodeEcho brings together an intuitive frontend with a powerful backend and intelligent AI-driven features</p>
        </div>


        <div className="gallery-itemss medium dark-2">
          <p className='gal-title'>TechStack : </p>
          <p>Frontend - <span> React.js </span> </p>
          <p>Backend - <span> Express.js, Node.js </span> </p>
          <p>DataBase - <span> MongoDB </span> </p>
          <p>AI Engine - <span> Gemini API </span> </p>
          <p>Stack Type - <span> MERN (Mongo, Express, React, Node) </span>  </p>
        </div>


        <div className="gallery-itemss wide dark-3">
          <p className="gal-title">
            Contacts : 
          </p>
          <div className="gallery-logo">
            <div onClick={() => window.open("https://github.com/Tanishk-0x ") }><RxGithubLogo /></div>
            <div onClick={() => window.open("https://www.linkedin.com/in/tanishk-namdev") }><RxLinkedinLogo /></div>
          </div>
        </div>

        <div className="gallery-itemss medium gray-1">
          <p className="gal-title">
            Author & Maintainer : 
          </p>
          <p>Project Owner : Tanishk (Computer Science B.Tech)</p>
          <p>For feedback, suggestions, contact: [codeecho19@gmail.com]</p>
          <p>Personal : tanishknamdev981@gmail.com</p>
        </div>

        <div className="gallery-itemss tall gray-2">
          <p className="gal-title">
            Features : 
          </p>
          <p>1. Code Explainer - <span>Simplifies code into plain language</span> </p>
          <p>2. Complexity Analyzer - <span>Calculates time and space complexity</span> </p>
          <p>3. Code Convertor - <span>Converts code between language</span> </p>
          <p>4. Comment Generator - <span>Adds meaningful inline comments</span> </p>
          <p>5. Code Reviewer - <span>Suggests improvements and fixes</span> </p>
          <p>6. Code Quizzer - <span>Creates quizzes from source code</span> </p>
          <p>7. Code Summarizer - <span>Shortens long code logically</span> </p>
          <p>8. Code Optimizer - <span>Opimizes your code in terms of time & space</span> </p>
          <p>9. Topic Explainer - <span>Explains CS topics with analogie</span> </p>
        </div>

        <div className="gallery-itemss wide gray-3">
          <p className="gal-title">
            Why use : 
          </p>
          <p>All-in-One Toolkit - From code summarization to complexity analysis - access every feature you need under one roof</p>
          <p>AI-Powered Precision - Experience smart code analysis backend by Gemini Api. Get accurate explanation and instant analysis</p>
          <p>Understand Instantly - No more guessing what a block does. Get instant human readable analysis for even the complex code logic</p>

        </div>

        <div className="gallery-itemss medium light-1">
          <p className="gal-title">
            Use Flow : 
          </p>
          <p>1. paste your code</p>
          <p>2. Select any AI feature: Explainer, Reviewer, Optmizer, Summarize, etc.</p>
          <p>3. View response instantly on screen</p>
          <p>4. Track you usage profile</p>
          <p>5. Copy result</p>
        </div>

        <div className="gallery-itemss wide light-2">
          <p className="gallery-text">
            <span className='gal-title'>AI Integration : </span>
            CodeEcho is powered by Google’s Gemini API, enabling high-quality AI analysis across multiple programming languages. Each feature leverages natural language prompts to return precise, contextual results within seconds
          </p>
        </div>

        <div className="gallery-itemss tall light-3">
          <p className="gal-title">
            Use Cases : 
          </p>
          <p>1. Understanding College Assignment Code → Use the Code Explainer to grasp complex logic in peer or online code.</p>
          <p>2. Debugging Errors Quickly → Use the Code Debugger to identify and fix runtime or logical issues</p>
          <p>3. Improving Poorly Written Code → Use the Code Optimizer to refactor and enhance existing code’s performance</p>
          <p>4. Preparing for Exams or Interviews→ Use the Topic Explainer and Code Quizzer to revise and test knowledge</p>
          <p>5. Adding Comments for Better Readability → Use the Comment Generator to make your code self-explanatory before submission or collaboration</p>
        </div>
      </div>
    </div>
  );
};

export default Documentation;
