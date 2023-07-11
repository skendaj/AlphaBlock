import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';

const SellForm = ({ crypto, name, amount, totalPrice, setOpen, open, setSelectedCrypto }) => {
  // const [open, setOpen] = useState(true);
  const [cryptoAmount, setCryptoAmount] = useState('');
  const [usdValue, setUsdValue] = useState('');
  const [priceUsd, setPriceUsd] = useState(0);
  const coinID = crypto._id;

  useEffect(() => {
    setUsdValue(cryptoAmount * (totalPrice / amount));
  }, [cryptoAmount, totalPrice, amount]);

  const handleOpen = () => {
    setOpen(true);
};

const handleClose = () => {
    setOpen(false);
    setSelectedCrypto(null);
    setCryptoAmount("");
    setUsdValue("");
};

  const handleCryptoAmountChange = (e) => {
    setCryptoAmount(e.target.value);
  };

  const handleUsdValueChange = (e) => {
    setUsdValue(e.target.value);
  };

  const sellCoin = (event) => {
    event.preventDefault();
    const finalAmount = amount - parseFloat(cryptoAmount);
    const finalPrice = totalPrice - parseFloat(usdValue);

    axios
      .patch(`http://localhost:8000/api/sellcoin/${coinID}`, {
        coins: [
          {
            amount: finalAmount,
            totalPrice: finalPrice
          }
        ]
      })
      .then((res) => {
        console.log(res);
        handleClose();
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    console.log('Crypto Amount:', cryptoAmount);
    console.log('USD:', usdValue);
  }, [cryptoAmount, usdValue]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Button variant="outlined" onClick={handleOpen}>
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ bgcolor: '#1d1d20', color: 'white' }}>Sell {crypto.name}</DialogTitle>
        <DialogContent sx={{ bgcolor: '#1d1d20', color: 'white' }}>
          <form onSubmit={sellCoin}>
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
        <DialogActions sx={{ bgcolor: '#1d1d20', color: 'white' }}>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={sellCoin} color="primary">
            Sell
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SellForm;
