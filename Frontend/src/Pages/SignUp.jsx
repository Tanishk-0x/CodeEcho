import React, { useState } from 'react'
import axios from 'axios' ; 
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import '../Style/LoginSignup.css'


const SignUp = () => {

    const navigate = useNavigate() ; 

    // -------------------- Usestates -------------------------
    const [formData , setFormData] = useState({
        name : '' , 
        email : '' , 
        password : '' 
    }) ; 
    const [message , setMessage] = useState('') ; 
    const [loading , setloading] = useState(false) ; 
    // ---------------------------------------------------------
    

    // ---------------------- Handlers --------------------------

    // chnage handler ... 
    const ChangeHandler = (event) => {
        setFormData({
            ...formData , 
            [event.target.name] : event.target.value
        }); 
    }; 

    // submit handler ... 
    const SubmitHandler = async (event) => {

        event.preventDefault() ; 

        try {
            setloading(true) ; 
            // ---- Api Calling ----
            const res = await axios.post("https://codeechobackend.onrender.com/auth/signup" , formData) ; 
            setMessage(res.data.message) ; 
            console.log(message) ; 
            console.log(res) ; 
            setloading(false) ; 
            
            // setTimeout(() => {
            //     navigate('/login'); 
            // }, 2000);

            // ---- Api calling ----
                const lgres = await axios.post("https://codeechobackend.onrender.com/auth/login" , formData , {
                    withCredentials : true , //accessing cookies 
                });
                setMessage(lgres.data.message) ; 
                // ----------------------------------
                    localStorage.setItem('#K&v@M!d$Q*L' , 'true' ); 
                // ---------------------------------
                setloading(false) ; 
                toast.success("Signup Successfully") ;   
                setTimeout(() => {
                    navigate('/') ; 
                }, 1000);

        }

        catch (error) {
            setMessage(error.response?. data?. message || "SignUp Failed") ;  
            // toast(message) ;   
            console.log(message) ; 
            toast.error("An Error Occured") ;
        }

    }

  // ----------------------------------------------------------------

  return (

    <div className="auth-outer">

        <div className='auth-img'>
            <img src="https://images.unsplash.com/photo-1607743386830-f198fbd7f9c4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGNvZGluZyUyMGltYWdlJTIwYmxhY2t8ZW58MHx8MHx8fDA%3D"/>
        </div>

        <div className='auth'>
            <div className='auth-title'>
                SignUp
            </div>
            <form onSubmit={SubmitHandler}>
                <div className="inputs">
                    <label htmlFor="">name</label>
                    <input type="text" onChange={ChangeHandler} value={formData.name} placeholder='enter name' name='name'/>
                </div>
                <div className="inputs">
                    <label htmlFor="">email</label>
                    <input type="email" onChange={ChangeHandler} value={formData.email} placeholder='enter email' name='email'/>
                </div>
                <div className="inputs">
                    <label htmlFor="">password</label>
                    <input type="text" onChange={ChangeHandler} value={formData.password} placeholder='enter password' name='password'/>
                </div>
                <div className="input-btn">
                    <button type='submit' > {loading ? 'Loading' : 'SignUp' } </button>
                </div>
                <div className="redirect">
                    Already have an account ? <span onClick={() => navigate('/login')}> Login </span>
                </div>
            </form>
        </div>

    </div>

  )

}


export default SignUp
