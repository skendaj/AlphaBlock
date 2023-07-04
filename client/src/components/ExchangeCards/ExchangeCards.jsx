import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';
import { Link } from 'react-router-dom';


const formatPrice = (price) => {
  return parseFloat(price).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const Heading = styled('h2')({
  textAlign: 'start',
  marginLeft: '2.5%',
  color: '#ffffff',
  '&:hover': {
    color: '#ffffff',
  },
});

const Paragraph = styled('p')({
  textAlign: 'start',
  marginLeft: '2.5%',
  color: '#ffffff',
  '&:hover': {
    color: '#ffffff',
  },
});

const imageUrls = [
  'https://upload.wikimedia.org/wikipedia/commons/5/57/Binance_Logo.png',
  'https://altcoinsbox.com/wp-content/uploads/2022/12/coinbase-logo.png',
  '',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Uniswap_Logo.svg/1026px-Uniswap_Logo.svg.png',
  'https://altcoinsbox.com/wp-content/uploads/2023/01/kraken-logo.png',
  '',
  'https://altcoinsbox.com/wp-content/uploads/2023/01/gate.io-logo.png',
  'https://altcoinsbox.com/wp-content/uploads/2023/01/kucoin-logo.png',
  '',
  '',
  '',
  'https://altcoinsbox.com/wp-content/uploads/2023/01/huobi-logo.png',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  'https://altcoinsbox.com/wp-content/uploads/2023/01/crypto.com-logo.webp'
];

const FlippableBox = ({ front, back, imageUrl, exchange }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleHover = () => {
    setIsFlipped(!isFlipped);
  };

  console.log(exchange);

  return (
    <>
    <Box
      margin={1}
      bgcolor="#1d1d20"
      color="#ffffff"
      boxShadow={2}
      width={{ xs: '100%', sm: 'calc(50% - 8px)', md: 'calc(25% - 16px)' }}
      height={250}
      transition="box-shadow 0.3s"
      sx={{
        borderRadius: '50px',
        background: '#1d1d20',
        boxShadow: '20px 20px 60px #19191b, -20px -20px 60px #212125',
        '&:hover': {
          boxShadow: '0px 0px 5px 2px rgba(255, 255, 255, 0.3)',
          '& .flip-container .flipper': {
            transform: 'rotateY(180deg)',
          },
        },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px',
        backgroundColor: 'transparent',
        border: 'none',
        '& .flip-container': {
          width: '100%',
          height: '100%',
          perspective: '1000px',
        },
        '& .flip-container .flipper': {
          position: 'relative',
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.3s',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        },
        '& .flip-container .front, & .flip-container .back': {
          position: 'absolute',
          width: '100%',
          height: '100%',
          backfaceVisibility: 'hidden',
          color: '#ffffff',
        },
        '& .flip-container .front': {
          transform: 'rotateY(0deg)',
          fontSize: '1.5rem',
        },
        '& .flip-container .back': {
          transform: 'rotateY(-180deg)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          fontSize: '1.5rem',
        },
      }}
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
    >
      <div className="flip-container">
        <div className="flipper">
          <div className="front">
            <div style={{ textAlign: 'center' }}>
              <img
                src={imageUrl}
                alt={front}
                style={{
                  width: '150px',
                  height: '150px',
                  display: 'block',
                  margin: '0 auto',
                }}
              />
              <div style={{ marginTop: '10px' }}>{front}</div>
            </div>
          </div>
          <div className="back">
            <div style={{ textAlign: 'center' }}>
              <div>Volume: $ {formatPrice(exchange.volumeUsd)}</div>
              <div>Percentage: {parseFloat(exchange.percentTotalVolume).toFixed(2)}%</div>
              <div>Trading Pairs: {exchange.tradingPairs}</div>
              <div><a href="{exchange.exchangeUrl}" target='_blank' >{exchange.exchangeUrl}</a></div>
            </div>
          </div>
        </div>
      </div>
    </Box>
    </>
    
  );
};

const CardGrid2 = () => {
  const [exchanges, setExchanges] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.coincap.io/v2/exchanges');
        setExchanges(response.data.data);
        console.log()
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const desiredIndices = [0, 1, 3, 4, 6, 7, 11, 25];

  const filteredExchanges = exchanges.filter((exchange, index) => desiredIndices.includes(index));

  return (
    <div className="component-container">
      <div className='title' sx={{ marginTop: '50%', marginBottom: '15%',}}>
      <Heading>Hello Mr. Skëndaj</Heading>
      <Heading>Today's Cryptocurrency Prices by Market Cap</Heading>
      <Paragraph>The global crypto market cap is $1.07T, a 0.61% increase over the last day.</Paragraph>
      </div>
      <Box
        margin="2% 0"
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        gap={2}
      >
        {filteredExchanges.map((exchange, index) => {
          const imageUrl = imageUrls[desiredIndices[index]];
          return (
            <FlippableBox
              key={index}
              front={exchange.name}
              back={`$ ${formatPrice(exchange.volumeUsd)}`}
              imageUrl={imageUrl}
              exchange={exchange}
            />
          );
        })}
      </Box>
    </div>
  );
};

export default CardGrid2;
