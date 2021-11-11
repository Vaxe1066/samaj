const config = require("../config/auth.config");
var User = require('../models/user');

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const fs = require('fs-extra')


exports.signup = (req, res) => {

    const user = new User({
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        profileImg: req.body.imageData

    });
  
    user.save((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.send({ message: "User was registered successfully!"});
  
    });
  };

  
  exports.signin = (req, res) => {
    User.findOne({
      email: req.body.email
    })
      .exec((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
  
        if (!user) {
          return res.status(404).send({ message: "Email Not found." });
        }
  
        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );
  
        if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!"
          });
        }
  
        var token = jwt.sign({ id: user.id }, config.secret, {
          expiresIn: 86400 // 24 hours
        });
  
        res.status(200).send({
          id: user._id,
          firstname: user.firstName,
          lastname: user.lastName,
          email: user.email,
          profileImg: user.profileImg,
          role: user.role,
          accessToken: token
        });
      });
  };