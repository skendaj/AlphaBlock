const mongoose = require('mongoose');

const coinSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  totalPrice : {
    type: Number,
    required: true,
  }
});

const Coin = mongoose.model('Coin', coinSchema);

module.exports = Coin;
