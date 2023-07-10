import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';

const BuyForm = ({ crypto, name }) => {
    const [open, setOpen] = useState(true);
    const [cryptoAmount, setCryptoAmount] = useState('');
    const [usdValue, setUsdValue] = useState('');
    const [priceUsd, setPriceUsd] = useState(0);

    console.log(name, "ddddddddd");


    useEffect(() => {

        axios
            .get(`https://api.coincap.io/v2/assets/${crypto.id}`)
            .then(response => {
                const { priceUsd } = response.data.data;
                setPriceUsd(parseFloat(priceUsd));
            })
            .catch(error => {
                console.log('Error fetching price:', error);
                setPriceUsd(0);
            });
    }, [crypto.id]);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCryptoAmountChange = (e) => {
        setCryptoAmount(e.target.value);
        const amount = parseFloat(e.target.value);
        if (!isNaN(amount)) {
            const usdValue = amount * priceUsd;
            setUsdValue(usdValue.toFixed(2));
        } else {
            setUsdValue('');
        }
    };

    const handleUsdValueChange = (e) => {
        setUsdValue(e.target.value);
        const value = parseFloat(e.target.value);
        if (!isNaN(value) && priceUsd !== 0) {
            const cryptoAmount = value / priceUsd;
            setCryptoAmount(cryptoAmount.toFixed(8));
        } else {
            setCryptoAmount('');
        }
    };

    const buyCoin = (event) => {
        event.preventDefault();
        const id = localStorage.getItem('userId');
        axios.post(`http://localhost:8000/api/buycoin/${id}`, {
            coins: [
                {
                    name: name,
                    amount: cryptoAmount,
                    totalPrice: usdValue
                }
            ]
        })
            .then(res => {
                console.log(res);
                setOpen(false);
            })
            .catch(err => console.log(err));

        console.log('Crypto Amount:', cryptoAmount);
        console.log('USD:', usdValue);
    };


    return (
        <div>
            <Button variant="outlined" onClick={handleOpen}>
                Open dialog
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle sx={{ bgcolor: "#1d1d20", color: "white" }}>Buy {crypto.name}</DialogTitle>
                <DialogContent sx={{ bgcolor: "#1d1d20", color: "white" }}>
                    <form onSubmit={buyCoin}>
                        <TextField
                            label="Crypto Amount"
                            value={cryptoAmount}
                            onChange={handleCryptoAmountChange}
                            fullWidth
                            margin="normal"
                            InputLabelProps={{ style: { color: 'white' } }}
                            InputProps={{
                                style: { color: 'white' },
                                sx: { '&::placeholder': { color: 'white' } }
                            }}
                        />
                        <TextField
                            label="USD Value"
                            value={usdValue}
                            onChange={handleUsdValueChange}
                            fullWidth
                            margin="normal"
                            InputLabelProps={{ style: { color: 'white' } }}
                            InputProps={{
                                style: { color: 'white' },
                                sx: { '&::placeholder': { color: 'white' } }
                            }}
                        />
                    </form>
                </DialogContent>
                <DialogActions sx={{ bgcolor: "#1d1d20", color: "white" }}>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={buyCoin} color="primary">
                        Buy
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default BuyForm;
