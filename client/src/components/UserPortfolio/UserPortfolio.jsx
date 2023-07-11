import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import SellForm from "../../components/SellForm/SellForm";
import '../UserPortfolio/UserPortfolio.css';

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


const Portfolio = () => {
    const [sortField, setSortField] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [portfolio, setPortfolio] = useState([]);
    const [showSellForm, setShowSellForm] = useState(false);
    const [open, setOpen] = useState(true);
    const [selectedCrypto, setSelectedCrypto] = useState(null);
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');

    const handleOpenSellForm = (crypto) => {
        setSelectedCrypto(crypto);
        setShowSellForm(true);
    };

    const handleCloseSellForm = () => {
        setShowSellForm(false);
    };

    const handleSort = (field) => {
        if (sortField === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortOrder('asc');
        }
    };

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/user/${userId}`)
            .then((res) => {
                console.log(res.data.coins);
                const cryptoDataMap = new Map();
                res.data.coins.forEach((crypto) => {
                    const { _id, name, amount, totalPrice } = crypto;
                    //   if (cryptoDataMap.has(name)) {
                    //     const existingCrypto = cryptoDataMap.get(name);
                    //     existingCrypto.amount += amount;
                    //     existingCrypto.totalPrice += totalPrice;
                    //   } else {
                    cryptoDataMap.set(name, { _id, name, amount, totalPrice });
                    //   }
                });
                const cryptoData = Array.from(cryptoDataMap.values());
                setPortfolio(cryptoData);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className="component-container">
            <Heading>Hello Mr.Skëndaj</Heading>
            <Heading>Your Portfolio</Heading>
            <TableContainer component={Paper} sx={{background: '#1d1d20', marginTop: "20px"}}>
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
                        aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell onClick={() => handleSort('name')}>
                                    <BoldText style={{ color: 'white' }}>Name</BoldText>
                                    {sortField === 'name' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                </TableCell>
                                <TableCell align="left" onClick={() => handleSort('amount')}>
                                    <BoldText style={{ color: 'white' }}>Amount</BoldText>
                                    {sortField === 'amount' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                </TableCell>
                                <TableCell align="left" onClick={() => handleSort('totalPrice')}>
                                    <BoldText style={{ color: 'white' }}>Total Price</BoldText>
                                    {sortField === 'prictotalPriceeUsd' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                </TableCell>
                                <TableCell>
                                    <BoldText style={{ color: 'white' }}>Action</BoldText>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {portfolio.map((crypto, index) => (
                                <TableRow key={index}>
                                    <TableCell style={{ color: 'white' }} align="left">{crypto.name}</TableCell>
                                    <TableCell style={{ color: 'white' }} align="left">{formatPrice(crypto.amount)}</TableCell>
                                    <TableCell style={{ color: 'white' }} align="left">$ {formatPrice(crypto.totalPrice)}</TableCell>
                                    <TableCell>
                                        {/* <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => handleOpenSellForm(crypto)}
                                        >
                                            Sell
                                        </Button> */}
                                        <button className="buy" variant="contained" onClick={() => handleOpenSellForm(crypto)}>Sell</button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </TransparentTable>
                </CenteredTableContainer>
            </TableContainer>
            {selectedCrypto && (<SellForm crypto={selectedCrypto} name={selectedCrypto.name} amount={selectedCrypto.amount} totalPrice={selectedCrypto.totalPrice} setOpen={setOpen} open={open} setSelectedCrypto= {setSelectedCrypto} />
            )}
        </div>
    );
};

export default Portfolio;
