import React, { useState, useEffect } from 'react';
import UserPortfolio from '../components/UserPortfolio/UserPortfolio';
import NavBar from '../components/NavBar/NavBar';
import Footer from '../components/Footer/Footer';
import Loading from '../components/Loading/Loading';

const Portfolio = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false); 
    }, 1000);
  }, []);

  return (
    <div>
      {loading ? <Loading /> : <><NavBar /><UserPortfolio /><Footer /></>}
    </div>
  );
};

export default Portfolio;
