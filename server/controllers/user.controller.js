const User = require("../models/user.model");
const Coin = require("../models/coin.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports.buyCoin = (req, res) => {
  console.log(req.body);
  const usrId = req.params.id;
  console.log("usrID" + req.params.id);

  // Check if req.body.coins exists and is an array
  if (!req.body.coins || !Array.isArray(req.body.coins) || req.body.coins.length === 0) {
    return res.status(400).json({ message: "Invalid coins data" });
  }

  const coinData = req.body.coins[0];

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

module.exports.getUser = (request, response) => {
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
  User.exists({ email: request.body.email })
    .then((emailExists) => {
      if (emailExists) {
        return Promise.reject({
          errors: { email: { message: "This email already has an account" } },
        });
      }
      return User.findOneAndUpdate({ _id: request.params.id }, request.body, {
        new: true,
      });
    })
    .then((updatedUser) => response.json(updatedUser))
    .catch((err) => response.status(500).json(err));
};

module.exports.deleteUser = (request, response) => {
  User.deleteOne({ _id: request.params.id })
    .then((deleteConfirmation) => response.json(deleteConfirmation))
    .catch((err) => response.json(err));
};
