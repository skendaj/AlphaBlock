import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { styled } from '@mui/system';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Link } from 'react-router-dom';


const StyledTableContainer = styled(TableContainer)({
    marginTop: '20px',
});

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

const BoldText = styled('span')({
    fontWeight: 'bold',
});

const ExchangeTable = () => {
    const [exchanges, setExchanges] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://api.coincap.io/v2/exchanges');
                setExchanges(response.data.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    return (
        <StyledTableContainer component={Paper}>
            <Table sx={{
                minWidth: 650,
                '& tbody tr': {
                    '&:hover': {
                        boxShadow: '0px 0px 10px 4px rgba(0, 0, 255, 0.3)',
                    },
                },
            }}
                aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <IndexCell>
                            <BoldText>#</BoldText>
                        </IndexCell>
                        <TableCell><BoldText>Name</BoldText></TableCell>
                        <TableCell><BoldText>Website</BoldText></TableCell>
                        <TableCell><BoldText>Volume</BoldText></TableCell>
                        <TableCell><BoldText>% of Total Volume</BoldText></TableCell>
                        <TableCell><BoldText>Trading Pairs</BoldText></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {exchanges.slice(0, 50).map((exchange) => (
                        <TableRow key={exchange.id}>
                            <TableCell align="left"><BoldText>{exchange.rank}</BoldText></TableCell>
                            <TableCell align="left">{exchange.name}</TableCell>
                            <TableCell align="left"><TableCell align="left">
                                <a href={exchange.exchangeUrl} target="_blank" rel="noopener noreferrer">
                                    {exchange.exchangeUrl}
                                </a>
                            </TableCell></TableCell>
                            <TableCell align="left">$ {formatPrice(exchange.volumeUsd)}</TableCell>
                            <TableCell align="left">{parseFloat(exchange.percentTotalVolume).toFixed(2)}%</TableCell>
                            <TableCell align="left">{exchange.tradingPairs}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </StyledTableContainer>
    );
};

export default ExchangeTable;
