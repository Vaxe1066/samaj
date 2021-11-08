var Events = require('../models/events');



//get all events
exports.events_get = function(req, res,next){
    Events.find()
    .lean()
    .exec(function (err, results){
        if(err) {return next(err)}
        //success 
        res.json(results)
    })
}

//get a specific event detail 
exports.events_detail_get = function(req,res,next){
    Events.findById(req.params.id)
    .lean()
    .exec(function (err, results){
        if(err) {return next(err)}
        //success
        res.json(results)
    })
}

//create new event
exports.events_post = function(req, res,next){
    let event = new Events({
        title: req.body.title,
        desc: req.body.desc,
        venue:req.body.venue,
        address: req.body.address,
        postcode: req.body.postcode,
        //image: {type: Buffer},
        date: req.body.date,
        links: req.body.links
    })
    event.save(function (err) {
        if(err) {return next(err); }
        //success
        res.send({ message: "Event was added successfully!" });
    })
}