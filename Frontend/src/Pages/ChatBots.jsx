import React, { useState } from 'react'
import '../Style/ChatBots.css';
import {imgdata} from '../Others/Instructions/LangData' ; 
import toast from 'react-hot-toast'; 
import { useNavigate } from 'react-router-dom';


const ChatBots = () => {

    const [subject , setSubject] = useState('') ; 
    const navigate = useNavigate() ; 


  return (


    <div className="card-main">

        <div className="card-header">
            <div className="card-title">
                <p className='card-p'>ChatEase</p>
                <p className='card-by'>By CodeEcho</p>
            </div>
            <div className="card-round">
                <p>Get expert answers instantly—one chatbot for every subject, all in one place.</p>
            </div>

        </div>


        <div className="card-contents">
            
            {imgdata.map((item, index) => (

                <div className="card" key={index}>

                    <div className="card-image">
                        <img src={item.img} alt={item.title}/>
                    </div>

                    <div className="card-title">
                        <p>{item.title}</p>
                    </div>

                    <button className="card-btn"
                      onClick={() => {localStorage.setItem('Subject' , item.subject) ;
                        navigate('/chat')
                    }}
                    >Explore</button>

                </div>
            ))}

            

            

        </div>

    </div>


  )

}

export default ChatBots
