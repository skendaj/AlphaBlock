const PORT = 8080;
const express = require("express");
const cors = require("cors");
const axios = require("axios");

require("dotenv").config();

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  const options = {
    method: "GET",
    url: "https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest",
    headers: {
      "X-CMC_PRO_API_KEY": process.env.REACT_APP_MARKET_CAP_KEY,
    },
    params: {
      slug: "bitcoin,ethereum,band-protocol,tezos",
    },
  };

  axios
    .request(options)
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      res.json(error);
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});