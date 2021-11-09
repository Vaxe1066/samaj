const config = require("../config/auth.config");
var Directory = require('../models/directory');
var User = require('../models/user');

var async = require('async');

//get directory from search
exports.directory_search_get = function(req,res,next){
  User.find({$or: [{firstName: {$regex: req.params.search, $options: 'i'}},
                  {lastName: {$regex: req.params.search, $options: 'i'}}] } )
  .lean()
  .exec(function (err, results){
      if(err) {return next(err)}
      //success 
      res.json(results)
  })
}
//get directory from id
exports.directory_get = function(req, res,next){
    Directory.find({user: {$eq: req.params.id}} )
    .lean()
    .exec(function (err, results){
        if(err) {return next(err)}
        //success 
        res.json(results)
    })
}

//create new directory for user 
exports.directory_post = function(req,res, next){
        let directory = new Directory({
            user: req.params.id,
            houseNo: req.body.houseNo,
            adLine1: req.body.adLine1,
            adLine2: req.body.adLine2,
            postcode: req.body.postcode,
            city: req.body.city,
            country: req.body.country,
            mobile: req.body.mobile,
            landline: req.body.landline
        })
        directory.save(function (err) {
            if(err) {return next(err); }
            //success
            res.send({ message: "Directory was added successfully!" });
        })

}


//update user profile/directory
exports.directory_update = function(req,res,next) {
  Directory.find({user: {$eq: req.params.id}} )
  .exec((err, directoryResult) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
  
    //success
    let directory = new Directory({
      user: req.params.id,
      houseNo: req.body.houseNo,
      adLine1: req.body.adLine1,
      adLine2: req.body.adLine2,
      postcode: req.body.postcode,
      city: req.body.city,
      country: req.body.country,
      mobile: req.body.mobile,
      landline: req.body.landline,
      _id: directoryResult[0]._id
  })
  Directory.findByIdAndUpdate(directoryResult[0]._id, directory, {}, function (err) {
      if (err) { return next(err); }
        // Successful - redirect to book detail page.
        res.send({message: "Directory was updated successfully!"});
      });
  });


  }
