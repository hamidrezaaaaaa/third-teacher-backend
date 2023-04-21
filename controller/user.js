const models = require("../models");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const uniqId = require("uniqid");
const Validator = require("fastest-validator");

const JWT_KEY = "Sec_ret#@";

function signUp(req, res) {
  const schema = {
    email: { type: "string", optional: false },
    password: { type: "string", optional: false },
    firstname: { type: "string", optional: false },
    lastname: { type: "string", optional: false },
    birtday: { type: "string", optional: false },
    education: { type: "string", optional: false },
    university: { type: "string", optional: false },
    job: { type: "string", optional: false },
    mobilenumber: { type: "string", optional: false },
    province: { type: "string", optional: false },
    address: { type: "string", optional: false },
    postcode: { type: "string", optional: false },
  };

  const v = new Validator();

  models.User.findOne({ where: { email: req.body.email } })
    .then((result) => {
      if (result) {
        res.status(409).json({
          message: "Email already exists",
        });
      } else {
        bcryptjs.genSalt(10, function (err, salt) {
          bcryptjs.hash(req.body.password, salt, function (err, hash) {
            const user = {
              email: req.body.email,
              password: hash,
              userId: uniqId(),
              firstname: req.body.firstname,
              lastname: req.body.lastname,
              birtday: req.body.birtday,
              education: req.body.education,
              university: req.body.university,
              job: req.body.job,
              mobilenumber: req.body.mobilenumber,
              province: req.body.province,
              address: req.body.address,
              postcode: req.body.postcode,
            };
            const validationResponse = v.validate(user, schema);

            if (validationResponse !== true) {
              res.status(400).json({
                message: "validation failed",
                errors: validationResponse,
              });
            } else {
              models.User.create(user)
                .then((result) => {
                  res.status(201).json({
                    message: "User created successful",
                  });
                })
                .catch((err) => {
                  res.status(500).json({
                    message: "Something went wrong",
                    error: err,
                  });
                });
            }
          });
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Something went wrong",
        error: err,
      });
    });
}

function logIn(req, res) {
  models.User.findOne({ where: { email: req.body.email } })
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
                  userId: user.userId,
                },
                JWT_KEY,
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

function update(req, res) {
  const id = req.params.id;

  const updatedUser = {
    email: req.body.email,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    birtday: req.body.birtday,
    education: req.body.education,
    university: req.body.university,
    job: req.body.job,
    mobilenumber: req.body.mobilenumber,
    province: req.body.province,
    address: req.body.address,
    postcode: req.body.postcode,
  };

  models.User.update(updatedUser, { where: { userId: id } })
    .then((result) => {
      res.status(200).json({
        message: "User updated.",
        user: updatedUser,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Something went wrong",
        error: err,
      });
    });
}

function getInfo(req, res) {
  const id = req.params.id;
  models.User.findOne({ where: { userId: id } })
    .then((user) => {
      if (user) {
        res.status(200).json({
          user: user,
        });
      } else {
        res.status(404).json({
          message: "User not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Something went wrong",
        error: err,
      });
    });
}

function getallUser(req, res) {
  models.User.findAll()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Something went wrong",
        error: err,
      });
    });
}

function removeUser(req, res) {
  const id = req.params.id;

  models.User.destroy({ where: { userId: id } })
    .then((result) => {
      if (result) {
        res.status(200).json({
          message: "User deleted successfully.",
        });
      } else {
        res.status(409).json({
          message: "User not found.",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Something went wrong",
        error: err,
      });
    });
}

module.exports = {
  signUp: signUp,
  logIn: logIn,
  update: update,
  getInfo: getInfo,
  getallUser: getallUser,
  removeUser: removeUser,
};
