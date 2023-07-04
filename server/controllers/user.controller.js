const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports.getAllCrypto = (request, response) => {
  User.find({})
    .sort({ name: 'asc' })
    .then((cryptos) => {
      console.log(cryptos);
      response.json(cryptos);
    })
    .catch((err) => {
      console.log(err);
      response.json(err);
    });
};

// register: (req, res) => {
//   User.create(req.body)
//       .then(user => {
//           console.log("jemi tek then register")
//           const userToken = jwt.sign({
//               id: user._id
//           }, process.env.SECRET_KEY);

//           return res.cookie("usertoken", userToken, {
//                   httpOnly: true
//               }).json({ msg: "success!", user: user });
//       })
//       .catch(err => {
//           console.log("jemi tek err register"+err)
//           return res.status(400).json(err)
//       });
// },



// module.exports.register = (req, res) => {


//   const { email, personalID } = req.body;
//   User.exists({ personalID })
//     .then((personalIdExists) => {
//       if (personalIdExists) {
//         return Promise.reject({
//           errors: { personalID: { message: 'This user with this ID is already registered' } },
//         });
//       } else {
//         return User.exists({ email });
//       }
//     })
//     .then((emailExists) => {
//       if (emailExists) {
//         return Promise.reject({
//           errors: { email: { message: 'This user with this email is already registered' } },
//         });
//       } else {
//         return User.create(req.body).catch((err) => {
//           // Handle the error during user creation
//           return Promise.reject(err);
//         });
//       }
//     })
//     .then((user2) => {
//       console.log(user2)
//       const userToken = jwt.sign(
//         {
//           id: user2._id,
//         },
//         process.env.SECRET_KEY
//       );

//       return res.cookie("usertoken", userToken, {
//         httpOnly: true
//     }).json({ msg: "success!", user: user2 });
//     })
//     .catch((err) => res.json({err:err}));

//   } FLOGERTI 
module.exports.register = (req, res) => {
  const { email, personalID } = req.body;

  User.exists({ personalID })
    .then((personalIdExists) => {
      if (personalIdExists) {
        return Promise.reject({
          errors: { personalID: { message: 'This user with this ID is already registered' } },
        });
      } else {
        return User.exists({ email });
      }
    })
    .then((emailExists) => {
      if (emailExists) {
        return Promise.reject({
          errors: { email: { message: 'This user with this email is already registered' } },
        });
      } else {
        return User.create(req.body);
      }
    })
    .then((user) => {
      const userToken = jwt.sign(
        {
          id: user._id,
        },
        process.env.SECRET_KEY
      );

      return res.cookie("usertoken", userToken, {
        httpOnly: true
      }).json({ msg: "success!", user: user });
    })
    .catch((err) => res.json({ err: err }));
};


//   User.create(req.body)
//     .then((user) => {
//       const userToken = jwt.sign(
//         {
//           id: user._id,
//         },
//         process.env.SECRET_KEY
//       );

//       res
//         .cookie('usertoken', userToken, {
//           httpOnly: true,
//         })
//         .json({ msg: 'success!', user: user });
//     })
//     .catch((err) => res.json(err));
// };

// module.exports.login = async (req, res) => {
//   const user = await User.findOne({ email: req.body.email });

//   if (user === null) {
//     // email not found in users collection
//     return res.sendStatus(400);
//   }

//   // if we made it this far, we found a user with this email address
//   // let's compare the supplied password to the hashed password in the database
//   const correctPassword = await bcrypt.compare(req.body.password, user.password);

//   if (!correctPassword) {
//     // password wasn't a match!
//     return res.sendStatus(400);
//   }

//   // if we made it this far, the password was correct
//   const userToken = jwt.sign(
//     {
//       id: user._id,
//     },
//     '30112001'
//   );

//   // note that the response object allows chained calls to cookie and json
//   res
//     .cookie('usertoken', userToken, {
//       httpOnly: true,
//     })
//     .json({ msg: 'success!' });
// }; FLOGERT


module.exports.logout = (req, res) => {
  res.clearCookie('usertoken');
  res.sendStatus(200);
};

module.exports.findAllUsers = (req, res) => {
  User.find()
    .then((allUsers) => {
      res.json({ users: allUsers });
    })
    .catch((err) => {
      res.json({ message: 'Something went wrong', error: err });
    });
};

module.exports.getUser = (request, response) => {
  User.findOne({ _id: request.params.id })
    .then((user) => response.json(user))
    .catch((err) => response.json(err));
};

module.exports.createUser = (request, response) => {
  const { email, personalID } = request.body;
  User.exists({ personalID })
    .then((personalIdExists) => {
      if (personalIdExists) {
        return Promise.reject({
          errors: { personalID: { message: 'This user with this ID is already registered' } },
        });
      } else {
        return User.exists({ email });
      }
    })
    .then((emailExists) => {
      if (emailExists) {
        return Promise.reject({
          errors: { email: { message: 'This user with this email is already registered' } },
        });
      } else {
        return User.register(req,res);
      }
    })
    .then((user) => response.json({user:user}))
    .catch((err) => response.json(err));
};

module.exports.updateUser = (request, response) => {
  const { id } = request.params;
  const {
    personalID,
    firstName,
    lastName,
    email,
    password,
  } = request.body;

  User.findById(id)
    .then((user) => {
      User.exists({ personalID, _id: { $ne: id } })
        .then((personalIdExists) => {
          if (personalIdExists) {
            return Promise.reject({
              errors: { personalID: { message: 'This user with this ID is already registered' } },
            });
          } else {
            return User.exists({ email, _id: { $ne: id } });
          }
        })
        .then((emailExists) => {
          if (emailExists) {
            return Promise.reject({
              errors: { email: { message: 'This user with this email is already registered' } },
            });
          } else {
            updateUser(user);
          }
        })
        .catch((err) => response.status(500).json(err));
    })
    .catch((err) => response.status(500).json(err));

  function updateUser(user) {
    user.personalID = personalID;
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.password = password;
    user.personalID = personalID;
    user
      .save()
      .then((updatedUser) => response.json(updatedUser))
      .catch((err) => response.status(500).json(err));
  }
};

module.exports.deleteUser = (request, response) => {
  User.deleteOne({ _id: request.params.id })
    .then((deleteConfirmation) => response.json(deleteConfirmation))
    .catch((err) => response.json(err));
};
