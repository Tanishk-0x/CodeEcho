import React, { useEffect, useState} from 'react'
import '../Style/Profile.css'
import axios from 'axios' ; 
import { MdOutlineEmail } from "react-icons/md";
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
import { FaCopy } from "react-icons/fa6";
import { AiFillDelete } from "react-icons/ai";


const Profile = () => {

    const navigate = useNavigate() ; 

    // ------------------- UseStates -----------------------------
        const [username , setUserName] = useState('') ; 
        const [useremail , setUserEmail] = useState('') ; 
        const [tier , setTier] = useState('free') ; 
        const [remainingCalls , setRemainingCalls] = useState(0) ; 
        const [apiCallMade , setApiCallMade] = useState(0) ; 
        const [favourites , setFavourites] = useState([]) ; 
        const [history , setHistory] = useState([]) ; 
    // ------------------------------------------------------------

    // -- useEffect to call the function in first render --

    useEffect(() => {

        const getUserDetails = async () => {

            try {
                const res = await axios.get("http://localhost:5000/profile/getuserdetails" , {withCredentials : true}) ; 

                if(res.data.success){
                    setUserName(res.data.user.name) ; 
                    setUserEmail(res.data.user.email) ;
                    setTier(res.data.user.tier) ; 
                    setApiCallMade(res.data.user.apiCallsMade) ; 
                    setFavourites(res.data.user.favourites)
                    
                    if(res.data.user.tier == 'free')setRemainingCalls( 40 - res.data.user.apiCallsMade) ; 
                    if(res.data.user.tier == 'pro')setRemainingCalls( 100 - res.data.user.apiCallsMade) ; 
                    if(res.data.user.tier == 'premium')setRemainingCalls( Infinity ) ; 
                }
                else{
                    setUserName('undefined') ; 
                    setUserEmail('undefined@gmail.com') ; 
                }
            }
            
            catch (error) {
                setUserName('undefined') ; 
                setUserEmail('undefined@gmail.com') ; 
            }
        }

        getUserDetails() ; // calling ... 

        const FetchHistory = async () => {

            try {
                const res = await axios.get("http://localhost:5000/user/usagehistory" , {withCredentials : true} ); 
                if(res.data.success){
                    setHistory(res.data.history) ; 
                }
            }
            
            catch (error) {
                console.log("Error fetching history : " , error) ; 
            }
        }

        FetchHistory() ; // calling ... 

    }, []) ; 


    // ------------------------------------------------------------

    // ----------------- Delete favourite Handler ----------------
    const deleteFavHandler = async (id) => {

        try {
            const res = await axios.put("http://localhost:5000/user/deletefavourite" , {id : id} , {withCredentials : true} ); 
            console.log(res.data) ; 

            // seting the favourites
            setFavourites( prev => prev.filter(item => item._id !== id)) ; 
            toast("Deleted!")
        }
        catch (error) {
            
        }
    }

    // --------------------- LogOut Handler -----------------------

    const LogoutHandler = async () => {

        try {
            const res = await axios.get("http://localhost:5000/auth/logout" , {withCredentials: true}) ;
            toast.success(res.data.message) ; 
            localStorage.setItem('#K&v@M!d$Q*L' , 'false' ); 
            setTimeout(() => {
                navigate('/login') ; 
            }, 1000);
        } 

        catch (error) {
            console.log(error) ; 
            toast.error("Logout failed") ; 
        }

    }

    // --------------------------------------------------------


  return (

    <div className="profile-outer">

        <header className="profile-header">
            <div className="profile-name-email">
                <div className="name">
                    <h1>Hii, <span>{username}</span></h1>
                </div>
                <div className="email">
                    <span> <MdOutlineEmail />  {useremail} </span>
                </div>
            </div>

            <div className='logout-btn'>
                <button onClick={LogoutHandler}>Logout</button>
            </div>
        </header>

        <header className="profile-content">

            <div className="profile-stats tier">
                <p className='stats-title'>Tier</p>
                <p className="stats-num">{tier}</p>
            </div>
            <div className="profile-stats calls">
                <p className='stats-title'>CallMade</p>
                <p className="stats-num">{apiCallMade}</p>
            </div>
            <div className="profile-stats remain">
                <p className='stats-title'>Remaining</p>
                <p className="stats-num">{remainingCalls}</p>
            </div>
        </header>

        <header className="user-cred">

            <div className="history-container">
                <table>
                    <thead>
                        <tr>
                        <th>Date</th>
                        <th>Feature Used</th>
                        </tr>
                    </thead>
                    <tbody>
                        {history.map((item) => (
                        <tr key={item._id}>
                            <td>{new Date(item.createdAt).toLocaleString()}</td>
                            <td>{item.featuredUsed}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="profile-favourites">
                { favourites.length === 0 ? 
                    <p>No Favourites Found</p>
                    :
                    (
                        <div className="favourites-container">
                            <div className="favourites-column">
                                <h3>Favourites</h3>
                                {favourites.map((item, index) => {
                                const combinedText = `Code:\n${item.code}\n\nResponse:\n${item.response}`;
                                return (
                                    <pre className="favourites-box" key={item._id || index}>
                                    <div className="favourites-actions">
                                        <button
                                        onClick={() => {
                                            navigator.clipboard.writeText(combinedText);
                                            toast.success("Copied");
                                        }}
                                        >
                                        <FaCopy />
                                        </button>
                                        <button onClick={() => deleteFavHandler(item._id)}>
                                        <AiFillDelete />
                                        </button>
                                    </div>

                                    {combinedText}
                                    </pre>
                                );
                                })}
                            </div>
                    

                        </div>
                    )
                }
            </div>

        </header>

    </div>

  )

}

export default Profile
