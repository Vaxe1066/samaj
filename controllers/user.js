var User = require('../models/user');


//get all users 
exports.get_all_users = function(req,res,next) {
    User.find().select({"firstName":1, "lastName":1, "profileImg":1, "role":1 })
    .lean()
    .exec(function (err, results){
        if(err) {return next(err)}
        //success 
        res.json(results)
    })


}


exports.update_user_image = (req,res,next) => {
    User.updateOne({_id: req.body.id},{
        profileImg: req.body.imageData
    })
    .then((result)=>{
        res.status(200).json({
            success:true,
            document: result
        });
    })
    .catch((err) => next(err));
}

exports.get_user_image = (req, res, next) => {
    User.findById(req.params.id)
    .then((result)=>{
        res.status(200).json({
            profileImg: result.profileImg
        });
    })
    .catch((err) => next(err));
}