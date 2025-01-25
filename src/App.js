import './App.css';
import MainPage from './Page/MainPage';
import PageEx from './Page/PageEx';
import { Route , Routes } from 'react-router-dom';


function App() {

  return (

    <Routes>

      <Route path='/' element={<MainPage/>} ></Route>
      <Route path='/pageex' element={<PageEx/>} ></Route>

    </Routes>

  );

}

export default App;
