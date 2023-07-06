import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import axios from 'axios';
import { useEffect, useState } from 'react';

import Login from './components/Login/Login';
import Register from './components/Register/Register';

import Main from './views/Main';
import Exchange from './views/Exchange';
import Details from './views/Details';

import Authenticate from './views/Authenticate';

function App() {
  
  const userId = localStorage.getItem('userId')
  const [admin, setAdmin] = useState(false)
  const [refresh, setRefresh] = useState()

  useEffect(() => {
    userId?
    axios.get('http://localhost:8000/api/user/' + userId)
    
      .then(res => { 
        console.log(res.data.admin);
        setAdmin(res.data.admin) })
      .catch(err => console.log(err)) : console.log("errors")
  }, [refresh])

  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main  />} />
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/exchanges/" element={<Exchange  />} />
        <Route path="/detail/:symbol" element={<Details  />} />
        {/* <Route path="/portfolio" element={<Portfolio  />} /> */}
        <Route path="/login" element={<Login />} />
       </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
