import React, { useEffect, useState } from 'react'
import axios from 'axios' ; 
import '../Style/Admin.css';

import { useNavigate } from 'react-router-dom';

const Admin = () => {

    const navigate = useNavigate() ; 

    const [totalUsers , setTotalUsers] = useState(0) ; 
    const [totalCalls , setTotalCalls] = useState(0) ; 
    const [averageCalls , setAverageCalls] = useState(0) ; 
    const [response , setResponse] = useState([]) ; 
    const [loading , setLoading] = useState(false) ; 

    const[codeExplainer , setCodeExplainer] = useState(0) ; 
    const[complexityAnalyzer , setComplexityAnalyzer] = useState(0) ; 
    const[codeConverter , setCodeConverter] = useState(0) ; 
    const[commentGenerator , setCommentGenerator] = useState(0) ; 
    const[codeReviewer , setCodeReviewer] = useState(0) ; 
    const[codeQuizzer , setCodeQuizzer] = useState(0) ; 
    const[codeSummarizer , setCodeSummarizer] = useState(0) ; 
    const[codeOptimizer , setCodeOptimizer] = useState(0) ; 
    const[topicExplainer , setTopicExplainer] = useState(0) ; 
    const[codeEase , setCodeEase] = useState(0) ; 



    useEffect( () => {

        const AdminHandler = async () => {
        
            try {
                setLoading(true) ; 
                const res = await axios.get("https://codeechobackend.onrender.com/user/admin" , {withCredentials : true}) ; 
                setResponse(res.data.users) ; 
                // -------------------
                setTotalUsers(res.data.totalusers) ; 
                setTotalCalls(res.data.totalCalls) ; 
                setAverageCalls(res.data.averageCallPerUser) ; 

                setCodeExplainer(res.data.stats.Code_Explainer) ; 
                setComplexityAnalyzer(res.data.stats.Complexity_Analyzer) ; 
                setCodeConverter(res.data.stats.Language_Converter) ; 
                setCommentGenerator(res.data.stats.Comment_Generator) ; 
                setCodeReviewer(res.data.stats.Code_Reviewer) ; 
                setCodeQuizzer(res.data.stats.Code_Quizzer) ; 
                setCodeSummarizer(res.data.stats.Code_Summarizer) ; 
                setCodeOptimizer(res.data.stats.Code_Optimizer) ; 
                setTopicExplainer(res.data.stats.Topic_Explainer) ; 
                setCodeEase(res.data.stats.ChatEase) ; 

                setLoading(false) ; 

            }
            
            catch (error) {
                console.log("Error Occured : " , error) ; 
            }

        }

        AdminHandler() ; // calling .. 

    },[])

    const logoutHandler = () => {
        localStorage.setItem('@G#r$T!w*L&A' , 'false' ); 
        navigate('/login') ; 
    }





  return (


    <div className='admin-main'>

        <header className="admin-header">
            <div className='admin-heading'>Admin DashBoard</div>
            <div><button className='admin-btn' onClick={logoutHandler}> {loading ? 'Loading..' : 'Logout'} </button></div>
        </header>

        <header className="admin-stats">
            <div className="admin-box">
                <p className='title'>Total Users </p>
                <p className='num'>{totalUsers}</p>
            </div>
            <div className="admin-box">
                <p className='title'>Total Calls </p>
                <p className='num'>{totalCalls}</p>
            </div>
            <div className="admin-box">
                <p className='title'>Average Calls </p>
                <p className='num'>{averageCalls}</p>
            </div>

            <div className="admin-box admin-statss">
                <p>Code Explainer : <span> {codeExplainer} </span> </p>
                <p>Complexity Analyzer : <span>{complexityAnalyzer}</span> </p>
                <p>Code Converter : <span>{codeConverter}</span> </p>
                <p>Comment Generator : <span>{commentGenerator}</span> </p>
                <p>Code Reviewer : <span>{codeReviewer}</span> </p>
            </div>
            <div className="admin-box admin-statss">
                <p>Code Quizzer : <span>{codeQuizzer}</span> </p>
                <p>Code Summarizer : <span>{codeSummarizer}</span> </p>
                <p>Code Optimizer : <span>{codeOptimizer}</span> </p>
                <p>Topic Explainer : <span>{topicExplainer}</span> </p>
                <p>Code Ease : <span>{codeEase}</span> </p>
            </div>
        </header>

        <header className="admin-monitor">
            <div className="admin-info">

                <div className='admin-user-info'>

                    <table className='admin-table'>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>name</th>
                                <th>email</th>
                                <th>apiCallsMade</th>
                                <th>tier</th>
                            </tr>
                        </thead>

                        <tbody>{response && response.map( (user ,index) => (
                                    <tr key={user._id}>
                                        <td>{index+1}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.apiCallsMade}</td>
                                        <td>{user.tier}</td>
                                    </tr>
                        ))}</tbody>
                    </table>
                </div>

            </div>
        </header>
    </div>


  )

}

export default Admin
