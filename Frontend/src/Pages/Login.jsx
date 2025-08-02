import React, { useState } from 'react' ; 
import axios from 'axios' ; 
import { Link, useNavigate } from 'react-router-dom';
import '../Style/LoginSignup.css'
import toast from 'react-hot-toast'

const Login = () => {

    const navigate = useNavigate() ; 

    // ------------------- useStates ---------------------------
    const [formData , setFormData] = useState({
        email : '' , 
        password : '' , 
    }); 
    const [message , setMessage] = useState('') ; 
    const [loading , setLoading] = useState(false) ; 
    // ---------------------------------------------------------
    
    // ---------------------- Handlers --------------------------

    const ChangeHandler = (event) => {
        setFormData({
            ...formData , 
            [event.target.name] : event.target.value
        }); 
    }; 


    // Submit Handler ... 
    const SubmitHandler = async (event) => {

        event.preventDefault() ; 

        try {

            if( formData.email === 'codeecho05admin@gmail.com' && formData.password === '05admin' ){
                localStorage.setItem('@G#r$T!w*L&A' , 'true' ); 
                navigate('/admin') ; 
            }
            
            else{
                setLoading(true) ; 

                // ---- Api calling ----
                const res = await axios.post("https://codeechobackend.onrender.com/auth/login" , formData , {
                    withCredentials : true , //accessing cookies 
                });
                setMessage(res.data.message) ; 
                // ----------------------------------
                    localStorage.setItem('#K&v@M!d$Q*L' , 'true' ); 
                // ---------------------------------
                setLoading(false) ; 
                toast.success("Login Successfully") ;     
                setTimeout(() => {
                    navigate('/') ; 
                }, 1000);

            }
        }
        
        catch (error) {
            setMessage(error.response?.data?.message || 'Login Failed') ; 
            toast.error(error.response.data.message) ;
        }

    }; 


  // ---------------------------------------------------------- 


  return (

    <div className="auth-outer">

        <div className='auth-img'>
            <img src="https://images.unsplash.com/photo-1607743386830-f198fbd7f9c4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGNvZGluZyUyMGltYWdlJTIwYmxhY2t8ZW58MHx8MHx8fDA%3D"/>
        </div>

        <div className='auth'>
            <div className='auth-title'>
                Login
            </div>
            <form onSubmit={SubmitHandler}>
                <div className="inputs">
                    <label htmlFor="">email</label>
                    <input type="text" name='email' onChange={ChangeHandler} value={formData.email} placeholder='enter email'/>
                </div>
                <div className="inputs">
                    <label htmlFor="">password</label>
                    <input type="text" name='password' onChange={ChangeHandler} value={formData.password} placeholder='enter password' />
                </div>
                <div className="input-btn">
                    <button type='submit'> {loading ? 'Loading' : 'Login' } </button>
                </div>
                <div className="redirect">
                    Not have an account ? <span onClick={ () => navigate('/signup')}>Signup</span> 
                </div>
            </form>
        </div>
        
    </div>


  )

}

export default Login
