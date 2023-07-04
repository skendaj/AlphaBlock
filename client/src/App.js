import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import axios from 'axios';
import { useEffect, useState } from 'react';

import Login from './components/Login/Login';
import Register from './components/Register/Register';

import Main from './views/Main';
import Exchange from './views/Exchange';
import Details from './views/Details';

import Portfolio from './components/Portfolio/Portfolio';

import Authenticate from './views/Authenticate';

function App() {
  
  const userId = localStorage.getItem('userId')
  const [role, setRole] = useState("")
  const [refresh, setRefresh] = useState()

  useEffect(() => {
    userId?
    axios.get('http://localhost:8000/api/user/' + userId)
      .then(res => { setRole(res.data.role) })
      .catch(err => console.log(err)) : console.log("errors")
  }, [refresh])

  return (
    <BrowserRouter>
    <div className="App">
        <Routes>
          {/* <Route path="/" element={<Navigate to="/auth" />} />
          <Route path='/auth' element={<Authenticate {...{setRefresh}}/>} /> */}
          <Route path="/" element={<Main  />} />
          <Route path="/exchanges/" element={<Exchange  />} />
          <Route path="/details/:symbol" element={<Details  />} />
          <Route path="/portfolio" element={<Portfolio  />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
