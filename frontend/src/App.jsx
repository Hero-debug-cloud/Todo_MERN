

import './App.css';
import Home from './components/home/Home';
import Login from './components/login/Login';
import Register from './components/register/Register';
import { BrowserRouter as Router, Routes,Route} from "react-router-dom";
function App() {
  
  return (
    <Router>
      <Routes>
      <Route path='/' element={<Register/>}/>
      <Route path='/home' element={ <Home/>} />
      <Route path='/login' element={<Login/>}/>
       </Routes>
    </Router>
  );
}

export default App;
