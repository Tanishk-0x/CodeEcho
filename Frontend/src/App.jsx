import Landing from './Pages/Landing'
import { Routes , Route } from "react-router"
import Documentation from './Components/Documentation'
import SignUp from './Pages/SignUp'
import Login from './Pages/Login'
import Profile from './Pages/Profile'
import { Toaster } from 'react-hot-toast';
import Admin from './Pages/Admin'
import NotFound from './Components/NotFound'

// ------------- Imports Snippets -----------------
import CodeExplainer from './Snippets/CodeExplainer'
import CodeComment from './Snippets/CodeComment'
import CodeComplexity from './Snippets/CodeComplexity'
import CodeConverter from './Snippets/CodeConverter'
import CodeOptimizer from './Snippets/CodeOptimizer' 
import CodeQuizzer from './Snippets/CodeQuizzer'
import CodeReviewer from './Snippets/CodeReviewer'
import CodeSummarizer from './Snippets/CodeSummarizer'
import TopicExplainer from './Snippets/TopicExplainer'

import ProtectedRoute from './Components/ProtectedRoute'; 
import ProtectedRouting from './Components/ProtectedRouting'; 

import Chat from './Pages/Chat'; 
import ChatBots from './Pages/ChatBots'
import { SiChatbot } from "react-icons/si";


function App() {
 
  return (

    <>
    
      <Routes>

        <Route path='/signup' element={<SignUp/> } />
        <Route path='/login' element={<Login/> } />

        <Route path='/' element={<Landing/> } />
        <Route path='/docs' element={<Documentation/>}/>
        
        <Route path='/admin' element={ <ProtectedRoute> <Admin/> </ProtectedRoute> } />

        
        <Route path='/profile' element={<Profile/>} />

        <Route path='/chat' element={<ProtectedRouting> <Chat/> </ProtectedRouting>} />
        <Route path='/chatbots' element={<ChatBots/>}/>

        {/* // ----- routes for snippets -------- */}
        <Route path='/codecomment' element={ <ProtectedRouting> <CodeComment/> </ProtectedRouting> } />
        <Route path='/codecomplexity' element={ <ProtectedRouting> <CodeComplexity/> </ProtectedRouting> } />
        <Route path='/codeconverter' element={ <ProtectedRouting> <CodeConverter/> </ProtectedRouting> } />
        <Route path='/codeexplainer' element={ <ProtectedRouting> <CodeExplainer/> </ProtectedRouting> } />
        <Route path='/codeoptimizer' element={ <ProtectedRouting> <CodeOptimizer/> </ProtectedRouting> } />
        <Route path='/codequizzer' element={ <ProtectedRouting> <CodeQuizzer/> </ProtectedRouting>} />
        <Route path='/codereviewer' element={ <ProtectedRouting> <CodeReviewer/> </ProtectedRouting>} />
        <Route path='/codesummarizer' element={ <ProtectedRouting> <CodeSummarizer/> </ProtectedRouting> } />
        <Route path='/topicexplainer' element={ <ProtectedRouting> <TopicExplainer/> </ProtectedRouting> } />

        <Route path='*' element={<NotFound/>}  />


      </Routes>

      <Toaster
        position="bottom-right"
        reverseOrder={false} 
          toastOptions={{
            icon : <SiChatbot /> ,
          style: {
            background: '#000000',
            color: '#ffffff',
            border: '1px solid #444',
            padding: '12px 16px',
          },
        }}
      /> 

    </>

      

  )
}

export default App
