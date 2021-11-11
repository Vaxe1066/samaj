var User = require('../models/user');



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