import React, { useState, useEffect } from 'react';
import ExchangeCards from '../components/ExchangeCards/ExchangeCards';
import NavBar from '../components/NavBar/NavBar';
import Footer from '../components/Footer/Footer';
import Loading from '../components/Loading/Loading';

const Exchange = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false); 
    }, 1000);
  }, []);

  return (
    <div>
      {loading ? <Loading /> : <><NavBar /><ExchangeCards /><Footer /></>}
    </div>
  );
};

export default Exchange;
