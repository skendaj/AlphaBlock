import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import axios from 'axios';
import { useEffect, useState } from 'react';

import Login from './components/Login/Login';
import Register from './components/Register/Register';

import Main from './views/Main';
import Exchange from './views/Exchange';
import Details from './views/Details';
import EditProfile from './components/EditProfile/EditProfile';
import Portfolio from './views/Portfolio';

function App() {
  
  const userId = localStorage.getItem('userId')
  const [admin, setAdmin] = useState(false)
  const [refresh, setRefresh] = useState()

  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main  />} />
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/exchanges/" element={<Exchange  />} />
        <Route path="/detail/:symbol" element={<Details  />} />
        <Route path="/account/edit/" element={<EditProfile  />} />
        <Route path="/portfolio" element={<Portfolio  />} />
        {/* <Route path="/portfolio" element={<Portfolio  />} /> */}
        <Route path="/login" element={<Login />} />
       </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
