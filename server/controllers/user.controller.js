const User = require("../models/user.model");
const Coin = require("../models/coin.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


module.exports.sellCoin = (req, res) => {
  const userId = req.params.id;
  console.log(userId);
  console.log(req.body);
  const { amount, totalPrice } = req.body.coins[0];

  if ( !amount || !totalPrice) {
    return res.status(400).json({ message: 'Invalid sell coin data' });
  }
  const userData = {
    amount: amount,
    totalPrice: totalPrice,
  };
  console.log(userData)
      Coin.findOneAndUpdate(
        { _id: userId },
        userData,
        { new: true, runValidators: true }
      )
        .then((user) => {
          return res.json(user);
        })
        .catch((err) => {
          console.log('Error updating user:', err);
          res.status(500).json({ message: 'Something went wrong', error: err });
        });
}; 

module.exports.buyCoin = (req, res) => {
  console.log(req.body);
  const usrId = req.params.id;
  console.log("usrID" + req.params.id);

  // Check if req.body.coins exists and is an array
  if (!req.body.coins || !Array.isArray(req.body.coins) || req.body.coins.length === 0) {
    return res.status(400).json({ message: "Invalid coins data" });
  }

  const coinData = req.body.coins[0];

  Coin.findOne({ name: coinData.name })
  .then((coin) => {
    if (coin) {
      coin.amount += parseFloat(coinData.amount);
      return coin.save();
      
      console.log('Coin exists:', coin);
    } else {
      Coin.create(coinData)
    .then((coin) => {
      const coinData2 = coin._id;

      const userData = {
        id: coin._id,
        name: req.body.name,
        amount: req.body.amount,
        totalPrice: req.body.totalPrice,
      };

      User.findOneAndUpdate(
        { _id: usrId },
        { $push: { coins: coinData2 } },
        { new: true, runValidators: true }
      )
        .then((user) => {
          return res.json(user);
        })
        .catch((err) => {
          console.log("usrerr" + err);
          res.json({ message: "Something user went wrong", error: err });
        });
    })
    .catch((err) => {
      console.log(err);
      res.json({ message: "Something coin went wrong", error: err });
    });
      console.log('Coin does not exist');
    }
  })
  .then((knp)=> {
    return res.json("test");
  })
  .catch((error) => {
    console.log('Error occurred while checking coin:', error);
  });
};


(module.exports.register = (req, res) => {
  User.create(req.body)
    .then((user) => {
      // console.log("register");
      const userToken = jwt.sign(
        {
          id: user._id,
        },
        process.env.SECRET_KEY
      );

      return res
        .cookie("usertoken", userToken, {
          httpOnly: true,
        })
        .json({ msg: "success!", user: user });
    })
    .catch((err) => {
      // console.log("error register" + err);
      return res.status(400).json(err);
    });
}),
  (module.exports.login = async (req, res) => {
    // console.log(req.body.password);
    const user = await User.findOne({ email: req.body.email });

    if (user === null) {
      return res.status(400).json({
        errors: { email: { message: "There is no user with this email" } },
      });
    }
    // console.log(user.password);

    const correctPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    // console.log(correctPassword);
    if (!correctPassword) {
      return res
        .status(400)
        .json({
          errors: { password: { message: "The password is incorrect" } },
        });
    }

    // console.log("Err");
    const userToken = jwt.sign(
      {
        id: user._id,
      },
      process.env.SECRET_KEY
    );

    res
      .cookie("usertoken", userToken, {
        httpOnly: true,
      })
      .json(user);
  });

module.exports.logout = (req, res) => {
  res.clearCookie("usertoken");
  res.sendStatus(200);
};


module.exports.findAllUsers = (req, res) => {
  User.find()
    .then((allUsers) => {
      res.json({ user: allUsers });
    })
    .catch((err) => {
      res.json({ message: "Something went wrong", error: err });
    });
};

// module.exports.getUser = (request, response) => {
//   User.findOne({ _id: request.params.id })
//   console.log(request.params.id)
//   .populate('coins')
//     .then((user) => {
//       if (!user) {
//         return response.status(400).json({ error: "User not found" });
//       } else {
//         response.json(user);
//       }
//     })
//     .catch((err) => response.json(err));
// };
module.exports.getUser = (request, response) => {
  // populate ben errror
  User.findOne({ _id: request.params.id })
    .populate('coins')
    .then((user) => {
      if (!user) {
        return response.status(400).json({ error: "User not found" });
      } else {
        response.json(user);
      }
    })
    .catch((err) => response.json(err));
};

module.exports.updateUser = (request, response) => {
  User.findOneAndUpdate(request.params.id,
    { $set: request.body},
    { new: true}
    )
    .then((updatedUser) => response.json(updatedUser))
    .catch((err) => response.status(500).json(err));
};

module.exports.deleteUser = (request, response) => {
  User.deleteOne({ _id: request.params.id })
    .then((deleteConfirmation) => response.json(deleteConfirmation))
    .catch((err) => response.json(err));
};
