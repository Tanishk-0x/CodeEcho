import React from 'react'
import 'animate.css';
import bgmage from './assets/bgimage.png'
import { NavLink } from 'react-router-dom';


const MainPage = () => {

  return (


    <div className='main-div'>

        <header className='header'>
            <h1 class="animate__animated animate__slideInLeft">
                Heyy! Programmers I am CodeEcho
            </h1>
        </header>

        <div className='lr'>


            <div className='left-div'>

                <div className='inner-main'>

                    <h1 className=' animate__animated animate__zoomInDown'> Code<span>Echo</span></h1>

                    <p className='animate__animated animate__pulse tag'> " Your Personal Coding Assistant " </p>

                    <p className='animate__animated animate__lightSpeedInLeft desc'> Unlock the full potential of your code with our powerful code explainer and error finder. Simplify complex logic, understand code line-by-line, and troubleshoot errors effortlessly. Whether you're debugging or learning, our tool transforms challenges into opportunities. Empower developers of all levels with clear explanations, instant error analysis, and actionable solutions—all in one place. Code smarter, debug faster!" </p>


                    <NavLink to={`/pageex`}>
                        <button className='animate__animated animate__slideInUp get-started'> Get Started </button>
                    </NavLink>

                </div>



            </div>



            <div className='right-div'>

                <div className="img-place">

                    <img className=' animate__animated animate__slideInRight side-image' src={bgmage} />

                </div>

            </div>
        </div>





      
    </div>


  )
}

export default MainPage
