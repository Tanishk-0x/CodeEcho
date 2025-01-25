"use client"
import { useState } from "react";
import { LuSpeech } from "react-icons/lu";
import { PiFileTxtBold } from "react-icons/pi";
import Spinner from "./Spinner";



// ^---------- Used Prompt --------------- 
//?------------------------------------------------
// "text": "Now I want you to act as a code explainer, if I give you a piece of code then you have to explain me tha code in a single response in brief around 500 words in easy language, just give me the explaination don't give anything else"
//?------------------------------------------------
//?------------------------------------------------


const API_KEY = " PASTE_YOUR_API_KEY_HERE.. " ; 



export default function Home() {
  const [code, setCode] = useState('');
  const [isSending, setIsSending] = useState(false)
  const [explanation, setExplanation] = useState('')



//?------------------ PROMPT ------------------------------------- 

  const trainingPrompt = [
    {
      "parts": [{
       "text": "Now I want you to act as a code explainer, if I give you a piece of code then you have to explain me tha code in a single response in brief around 500 words in easy language, just give me the explaination don't give anything else"
      }],
      "role": 'user'
    },
    {
      "parts": [
        {
          "text": "okay"
        }
      ],
      "role": "model"
    }
  ]

//?------------------ PROMPT ------------------------------------- 


    const ErrorHandlePrompt = [
      {
        "parts": [{
         "text": "Now I want you to act as a code error finder, if I give you a piece of code then you have find error in that code and give representation of error in single response in english note that you have to only display the error dont display the corrected display the error in aroung 150 words in easy language, just give me the explaination don't give anything else if the given code has no logical as well as syntax error just display no error found "
        }],
        "role": 'user'
      },
      {
        "parts": [
          {
            "text": "okay"
          }
        ],
        "role": "model"
      }
    ]
  
//?------------------ PROMPT ------------------------------------- 

      
      const ComplexityPrompt = [
        {
          "parts": [{
           "text": "Now I want you to act as a code time and space complexity finder, if I give you a piece of code then you have to display the time as well and space complexity of that code only display the complexity note that do not display another things in a single response don't give anything else"
          }],
          "role": 'user'
        },
        {
          "parts": [
            {
              "text": "okay"
            }
          ],
          "role": "model"
        }
      ]
    
//?------------------ PROMPT ------------------------------------- 
    

//*--------------------------------------------------------------------------
//* function 1 .. 

  const explainthiscode = async () => {
    let url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + API_KEY

    let messageToSend = [
      ...trainingPrompt,
      {
        "parts": [{
          "text": code
        }
        ],
        "role": "user"
      }
    ]

    setIsSending(true)

    let res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "contents": messageToSend
      })
    })

    let resjson = await res.json()
    setIsSending(false)

    let responseMessage = resjson.candidates[0].content.parts[0].text
    // console.log(responseMessage)
    setExplanation(responseMessage);
  }

//*-------------------------------------------------------------------------
//* function2 

      const errorInThisCode = async () => {
        let url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + API_KEY

        let messageToSend = [
          ...ErrorHandlePrompt,
          {
            "parts": [{
              "text": code
            }
            ],
            "role": "user"
          }
        ]

        setIsSending(true)

        let res = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "contents": messageToSend
          })
        })

        let resjson = await res.json()
        setIsSending(false)

        let responseMessage = resjson.candidates[0].content.parts[0].text
        // console.log(responseMessage)
        setExplanation(responseMessage);
      }

//*---------------------------------------------------------------------------------
//* function 3 .. 


      const ComplexityOfThisCode = async () => {
        let url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + API_KEY

        let messageToSend = [
          ...ComplexityPrompt,
          {
            "parts": [{
              "text": code
            }
            ],
            "role": "user"
          }
        ]

        setIsSending(true)

        let res = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "contents": messageToSend
          })
        })

        let resjson = await res.json()
        setIsSending(false)

        let responseMessage = resjson.candidates[0].content.parts[0].text
        // console.log(responseMessage)
        setExplanation(responseMessage);



      }

      // console.log(explanation) ; 

      

//~------------------------------------------------------------
//* Speech Handle function -- 

      const handleSpeech = () => {

        const value = new SpeechSynthesisUtterance(explanation) ; 

        window.speechSynthesis.speak(value) ; 

      }




//*------------------------------------------------------------------------------      



  return (

    

    <div className="top-level">

        <header className="head">

            <div className="title">
              <p> Code<span>Echo</span> </p>
            </div>

            <div className="button-div">
              <div>
                {
                  isSending ? <Spinner/> : "" 
                }
              </div>
                <div className="speech-div">
                  <button onClick={handleSpeech}>
                    <LuSpeech />
                  </button>
                </div>

                <div>
                  <div className="img-div">

                    <button className="btn" 
                    onClick={explainthiscode}
                    > Explain </button>


                    <button className="btn" 
                    onClick={errorInThisCode}
                    > Find Error </button>


                    <button className="btn" 
                    onClick={ComplexityOfThisCode} 
                    > Complexity </button>

                    </div>
                </div>

            </div>

        </header>

        <div className="wrapper">

            <div className="left-box">

                <div className="fancy">
                    <div className="circle">
                      <div className="yellow"></div>
                      <div className="green"></div>
                      <div className="red"></div>
                    </div>

                    <div className="file text-emerald-50">
                    <PiFileTxtBold />
                      code.txt
                    </div>
                </div>

                <div className="code-section">
                  <textarea className="textarea codee" placeholder="Write your code here..."
                    value={code}
                    onChange={(e) => setCode(e.target.value)} />
                </div>
                
            </div>

          <div className="right-box">
            
            <div className="output">
                        {
                          explanation.length > 0 ?
                            <p >
                            <span style={{ whiteSpace: 'pre-wrap' }}>{explanation}</span>
                            </p>
                            :
                            <p>
                            Promt is empty...
                            </p>
                        }
            </div>

          </div>

        </div>


    </div>


  );
}