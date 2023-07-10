import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { styled } from '@mui/system';
import { Box } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import Star from '@mui/icons-material/Star';
import Typography from '@mui/material/Typography';
import '../CryptoList/CryptoList.css';
import News from "../../components/News/News";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import BuyForm from "../../components/BuyForm/BuyForm";
import CryptoDetails from "../../components/CryptoDetails/CryptoDetails";
import CryptoDialog from "../CryptoDetails/CryptoDialog"


const TransparentTable = styled(Table)({
  backgroundColor: 'transparent',
  border: 'none',
  '& th, & td': {
    borderBottom: 'none',
  },
});
const LogoImage = styled('img')({
  marginRight: '10px',
  width: '50px',
  height: '50px',
});
const Heading = styled('h2')({
  textAlign: 'start',
  marginLeft: "2.5%",
  color: '#ffffff',
});
const Paragraph = styled('p')({
  textAlign: 'start',
  marginLeft: "2.5%",
  color: '#ffffff',
});
const BoldText = styled('span')({
  fontWeight: 'bold',
});
const CenteredTableContainer = styled(TableContainer)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  [theme.breakpoints.down('sm')]: {
    display: 'block',
  },
}));
const CoinName = styled('span')({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});
const GreySymbol = styled('span')({
  color: '#808a9d',
  fontSize: '12px',
});
const ChangePercentCell = styled(TableCell)(({ theme, isPositive }) => ({
  color: isPositive ? '#16c784' : '#ea3943',
}));
const ArrowIcon = styled('span')(({ theme, isPositive }) => ({
  marginLeft: '4px',
  display: 'inline-flex',
  alignItems: 'center',
  color: isPositive ? '#16c784' : '#ea3943',
}));
const formatPrice = (price) => {
  return parseFloat(price).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
const IndexCell = styled(TableCell)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  width: '50px',
  paddingRight: '0px',
}));
const StarButton = styled(Star)(({ theme, isFavorite }) => ({
  color: isFavorite ? '#ffc107' : '#c0c0c0',
  marginTop: '2px',
}));


const CryptoList = () => {
  const [cryptoList, setCryptoList] = useState([]);
  const [logoList, setLogoList] = useState({});
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [favorites, setFavorites] = useState([]);
  const [news, setNews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showBuyForm, setShowBuyForm] = useState(false);
  const [selectedCrypto, setSelectedCrypto] = useState(null);

  const id = localStorage.getItem('userId')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.coincap.io/v2/assets');
        const cryptoData = response.data.data.map(crypto => ({
          id: crypto.id,
          name: crypto.name,
          symbol: crypto.symbol,
        }));
        setCryptoList(response.data.data);

        if (response.data.data.length > 0) {
          const symbols = response.data.data.map((crypto) => crypto.symbol);
          const response2 = await axios.get('https://min-api.cryptocompare.com/data/all/coinlist');
          const coinList = response2.data.Data;

          const logos = symbols.reduce((acc, symbol) => {
            if (coinList[symbol] && coinList[symbol].ImageUrl) {
              acc[symbol] = `https://www.cryptocompare.com${coinList[symbol].ImageUrl}`;
            }
            return acc;
          }, {});

          setLogoList(logos);
        }
      } catch (error) {
        console.log(error);
      }
      
    };

    fetchData();
  }, []);

  
  // const buyCoin = (crypto) => {
  //   axios.post(`http://localhost:8000/api/buycoin/${id}`, {
  //     name: crypto.name,
  //     symbol: crypto.symbol,
  //     amount: 3,
  //     currentPrice: crypto.priceUsd
  //   })
  //     .then(res => console.log(res))
  //     .catch(err => console.log(err))
  // }

  const handleOpenBuyForm = (crypto) => {
    setSelectedCrypto(crypto);
    console.log(!crypto,"ddddd");
    setShowBuyForm(true);
  };

  const handleCloseBuyForm = () => {
    setShowBuyForm(false);
  };


  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const sortedCryptoList = [...cryptoList].sort((a, b) => {
    if (sortField === 'name') {
      const aValue = a[sortField].toLowerCase();
      const bValue = b[sortField].toLowerCase();

      if (sortOrder === 'asc') {
        if (aValue < bValue) return -1;
        if (aValue > bValue) return 1;
        return 0;
      } else {
        if (aValue > bValue) return -1;
        if (aValue < bValue) return 1;
        return 0;
      }
    } else {
      const aValue = sortField ? parseFloat(a[sortField]) : null;
      const bValue = sortField ? parseFloat(b[sortField]) : null;

      if (sortOrder === 'asc') {
        return aValue - bValue;
      } else {
        return bValue - aValue;
      }
    }
  });

  const handleFavoriteToggle = (symbol) => {
    if (favorites.includes(symbol)) {
      setFavorites(favorites.filter((item) => item !== symbol));
    } else {
      setFavorites([...favorites, symbol]);
    }
  };

  const top3CryptosGreen = cryptoList
    .slice()
    .sort((a, b) => parseFloat(b.changePercent24Hr) - parseFloat(a.changePercent24Hr))
    .slice(0, 3)
    .map((crypto, index) => ({
      ...crypto,
      rank: index + 1,
    }));

  const top3CryptosRed = cryptoList
    .slice()
    .sort((a, b) => parseFloat(a.changePercent24Hr) - parseFloat(b.changePercent24Hr))
    .slice(0, 3)
    .map((crypto, index) => ({
      ...crypto,
      rank: index + 1,
    }));


  return (
    <div className="component-container">
      <Heading>Hello Mr.Skëndaj</Heading>
      <Heading>Today's Cryptocurrency Prices by Market Cap</Heading>
      <Paragraph>The global crypto market cap is $1.07T, a 0.61% increase over the last day.</Paragraph>
      <Box display="flex" justifyContent="space-between" margin={3}>
        <Box margin={1}
          bgcolor="#1d1d20"
          color='#ffffff'
          boxShadow={2}
          width="calc(33% - 8px)"
          height={250}
          transition="box-shadow 0.3s"
          sx={{
            borderRadius: '50px',
            background: '#1d1d20',
            boxShadow: '20px 20px 60px #19191b, -20px -20px 60px #212125',
            '&:hover': {
              boxShadow: '0px 0px 5px 2px rgba(255, 255, 255, 0.3)',
            },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '16px',
            backgroundColor: 'transparent',
            border: 'none',
            '& th, & td': {
              borderBottom: 'none',
            },
          }}
        >
          <h3>🚀 Top Gainers by 24h Change</h3>
          <table style={{ width: '100%', textAlign: 'center' }}>
            <tbody>
              {top3CryptosGreen.map((crypto) => (
                <tr key={crypto.id}>
                  <td><BoldText>{crypto.rank}</BoldText></td>
                  <CoinName>
                    {logoList[crypto.symbol] && <LogoImage src={logoList[crypto.symbol]} alt={crypto.name} />}
                    <Link to={`/detail/${crypto.symbol}`} className="link-unstyled">{crypto.name}</Link>
                    <GreySymbol>({crypto.symbol})</GreySymbol>
                  </CoinName>
                  <td>
                    <ChangePercentCell
                      align="left"
                      isPositive={crypto.changePercent24Hr >= 0}
                    >
                      {crypto.changePercent24Hr >= 0 ? (
                        <ArrowUpwardIcon fontSize="small" />
                      ) : (
                        <ArrowDownwardIcon fontSize="small" />
                      )}
                      <span>{parseFloat(crypto.changePercent24Hr).toFixed(2)}%</span>
                    </ChangePercentCell>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
        <Box margin={1}
          bgcolor="#1d1d20"
          color='#ffffff'
          boxShadow={2}
          width="calc(33% - 8px)"
          height={250}
          transition="box-shadow 0.3s"
          sx={{
            borderRadius: '50px',
            background: '#1d1d20',
            boxShadow: '20px 20px 60px #19191b, -20px -20px 60px #212125',
            '&:hover': {
              boxShadow: '0px 0px 5px 2px rgba(255, 255, 255, 0.3)',
            },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '16px',
            backgroundColor: 'transparent',
            border: 'none',
            '& th, & td': {
              borderBottom: 'none',
            },
          }}
        >
          <h3>🚨 Top Losers by 24h Change</h3>
          <table style={{ width: '100%', textAlign: 'center' }}>
            <tbody>
              {top3CryptosRed.map((crypto) => (
                <tr key={crypto.id}>
                  <td><BoldText>{crypto.rank}</BoldText></td>
                  <CoinName>
                    {logoList[crypto.symbol] && <LogoImage src={logoList[crypto.symbol]} alt={crypto.name} />}
                    <CryptoDialog cryptoName={crypto.name}  cryptoSymbol={crypto.symbol}/>
                    <GreySymbol>({crypto.symbol})</GreySymbol>
                  </CoinName>
                  <td>
                    <ChangePercentCell
                      align="left"
                      isPositive={crypto.changePercent24Hr >= 0}
                    >
                      {crypto.changePercent24Hr >= 0 ? (
                        <ArrowUpwardIcon fontSize="small" />
                      ) : (
                        <ArrowDownwardIcon fontSize="small" />
                      )}
                      <span>{parseFloat(crypto.changePercent24Hr).toFixed(2)}%</span>
                    </ChangePercentCell>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
        <Box margin={1}
          bgcolor="#1d1d20"
          color='#ffffff'
          boxShadow={2}
          width="calc(33% - 8px)"
          height={250}
          transition="box-shadow 0.3s"
          sx={{
            borderRadius: '50px',
            background: '#1d1d20',
            boxShadow: '20px 20px 60px #19191b, -20px -20px 60px #212125',
            '&:hover': {
              boxShadow: '0px 0px 5px 2px rgba(255, 255, 255, 0.3)',
            },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '16px',
            backgroundColor: 'transparent',
            border: 'none',
            '& th, & td': {
              borderBottom: 'none',
            },
          }}
        >
          <News
          />
        </Box>
      </Box>
      <CenteredTableContainer style={{ borderRadius: '20px' }}>
        <TransparentTable
          sx={{
            borderRadius: '50px',
            background: '#1d1d20',
            boxShadow: '20px 20px 60px #19191b, -20px -20px 60px #212125',
            bgcolor: "#2a3038",
            minWidth: 650,
            '& tbody tr': {
              '&:hover': {
                boxShadow: '0px 0px 5px 2px rgba(255, 255, 255, 0.3)',
              },
            },
          }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <IndexCell>
                <BoldText style={{ color: 'white' }}></BoldText>
              </IndexCell>
              <TableCell onClick={() => handleSort('name')}>
                <BoldText style={{ color: 'white' }}>Coin</BoldText>
                {sortField === 'name' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
              </TableCell>
              <TableCell align="left" onClick={() => handleSort('changePercent24Hr')}>
                <BoldText style={{ color: 'white' }}>24h Change</BoldText>
                {sortField === 'changePercent24Hr' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
              </TableCell>
              <TableCell align="left" onClick={() => handleSort('priceUsd')}>
                <BoldText style={{ color: 'white' }}>Price</BoldText>
                {sortField === 'priceUsd' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
              </TableCell>
              <TableCell align="left" onClick={() => handleSort('volumeUsd24Hr')}>
                <BoldText style={{ color: 'white' }}>24h Volume</BoldText>
                {sortField === 'volumeUsd24Hr' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
              </TableCell>
              <TableCell align="left" onClick={() => handleSort('marketCapUsd')}>
                <BoldText style={{ color: 'white' }}>Market Cap</BoldText>
                {sortField === 'marketCapUsd' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedCryptoList.map((crypto, index) => {
              const isPositiveChange = parseFloat(crypto.changePercent24Hr) >= 0;
              const isChecked = favorites.includes(crypto.symbol);

              return (
                <TableRow key={crypto.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <IndexCell>
                    <StarButton
                      onClick={() => handleFavoriteToggle(crypto.symbol)}
                      isFavorite={favorites.includes(crypto.symbol)}
                    />
                    <BoldText style={{ color: 'white' }}>{index + 1}</BoldText>
                  </IndexCell>
                  <TableCell>
                    <CoinName style={{ color: 'white' }}>
                      {logoList[crypto.symbol] && <LogoImage src={logoList[crypto.symbol]} alt={crypto.name} />}
                      {/* <Link to={`/detail/${crypto.symbol}`} className="link-unstyled">{crypto.name}</Link> */}
                      <CryptoDialog cryptoName={crypto.name}  cryptoSymbol={crypto.symbol}/>
                      <GreySymbol>({crypto.symbol})</GreySymbol>
                    </CoinName>
                  </TableCell>
                  <ChangePercentCell align="left" isPositive={isPositiveChange}>
                    {isPositiveChange ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />}
                    <span>{parseFloat(crypto.changePercent24Hr).toFixed(2)}%</span>
                  </ChangePercentCell>
                  <TableCell style={{ color: 'white' }} align="left">$ {formatPrice(crypto.priceUsd)}</TableCell>
                  <TableCell style={{ color: 'white' }} align="left">$ {formatPrice(crypto.volumeUsd24Hr)}</TableCell>
                  <TableCell style={{ color: 'white' }} align="left">$ {formatPrice(crypto.marketCapUsd)}</TableCell>
                  {/* <button className="buy" onClick={() =>buyCoin(crypto)}>Buy</button> *FLOGERT/}
                  {/* <button className="buy" variant="contained" onClick={handleOpenBuyForm}>Buy</button> */}
                  <button className="buy" variant="contained" onClick={() => handleOpenBuyForm(crypto)}>Buy</button>


                </TableRow>
              );
            })}
          </TableBody>
        </TransparentTable>
      </CenteredTableContainer>
      {selectedCrypto && <BuyForm crypto={selectedCrypto}  name={selectedCrypto.name}/>}
      {/* {cryptoList.length > 0 && <CryptoDetails data={cryptoList.symbol} />} */}

      {/* <Dialog open={showBuyForm} onClose={handleCloseBuyForm}>
        <DialogContent>
          {selectedCrypto && <BuyForm crypto={selectedCrypto} />}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseBuyForm}>Cancel</Button>
        </DialogActions>
      </Dialog> */}
    </div>
  );
};

export default CryptoList;
