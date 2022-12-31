const models = require("../models");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const uniqId =require('uniqid');

function signUp(req, res) {
  models.users
    .findOne({ where: { email: req.body.email } })
    .then((result) => {
      if (result) {
        res.status(409).json({
          message: "Email already exists",
        });
      } else {
        bcryptjs.genSalt(10, function (err, salt) {
          bcryptjs.hash(req.body.password, salt, function (err, hash) {
            const user = {
              // username: req.body.username,
              email: req.body.email,
              password: hash,
              userId: uniqId(),
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              birthDay: req.body.birthDay,
              education: req.body.education,
              university: req.body.university,
              job: req.body.job,
              mobileNumber: req.body.mobileNumber,
              province: req.body.province,
              address: req.body.address,
              postCode: req.body.postCode,
            };

            models.users
              .create(user)
              .then((result) => {
                res.status(201).json({
                  message: "User created successful",
                });
              })
              .catch((err) => {
                
                res.status(500).json({
                  message: "Something went wrong",
                  error:err
                });
              });
          });
        });
      }
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({
        message: "Something went wrong",
        error:err
      });
    });
}

function logIn(req, res) {
  models.users
    .findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (user === null) {
        res.status(401).json({ message: "invalid credentials!" });
      } else {
        bcryptjs.compare(
          req.body.password,
          user.password,
          function (err, result) {
            if (result) {
              const token = jwt.sign(
                {
                  email: user.email,
                  userId: user.id,
                },
                process.env.JWT_KEY,
                function (err, token) {
                  res.status(200).json({
                    message: "Authentication successful ",
                    token: token,
                  });
                }
              );
            } else {
              res.status(401).json({ message: "invalid credentials!" });
            }
          }
        );
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something went wrong",
        error: error,
      });
    });
}

module.exports = {
  signUp: signUp,
  logIn: logIn,
};
