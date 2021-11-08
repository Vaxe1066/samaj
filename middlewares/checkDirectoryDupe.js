var User = require('../models/user');
var Directory = require('..models/directory')


checkDirectoryDuplicate = (req, res, next) => {
    Directory.find({user: {$eq: req.params.id}} )
    .exec((err, directory) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
  
      if (directory) {
        res.status(400).send({ message: "Failed! Username is already in use!" });
        return;
      }
      next();
    });
  };

  const verifySignUp = {
    checkDuplicateUsername
  };
  
  module.exports = verifySignUp;