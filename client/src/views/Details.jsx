import React, { useEffect, useState } from 'react';
import CryptoDetails from '../components/CryptoDetails/CryptoDetails';
import NavBar from '../components/NavBar/NavBar';
import Footer from '../components/Footer/Footer';
import Loading from '../components/Loading/Loading';

const Details = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false); 
    }, 1000);
  }, []);
  
  return (
    <div>
      <div>
        <h2>{crypto.symbol}</h2>
        {loading ? <Loading /> : <><NavBar /><CryptoDetails /><Footer /></>}
      </div>
    </div>
  );
};

export default Details;
