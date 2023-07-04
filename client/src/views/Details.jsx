import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Comments from '../components/Comments/Comments';
import CryptoDetails from '../components/CryptoDetails/CryptoDetails';

const Details = () => {

  return (
    <div>
      <h2>{crypto.name}</h2>
      <CryptoDetails />
      <Comments />
    </div>
  );
};

export default Details;
