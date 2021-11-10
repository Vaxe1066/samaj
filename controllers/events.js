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


 exports.events_update = function(req,res,next){
    let event = new Events({
        title: req.body.title,
        desc: req.body.desc,
        venue: req.body.venue,
        address: req.body.address,
        postcode: req.body.postcode,
        //image: {type: Buffer},
        date: req.body.date,
        links: req.body.links,
        _id: req.params.id
    })
      Events.findByIdAndUpdate(req.params.id, event, {}, function (err) {
        if (err) { return next(err); }
           // Successful - redirect to book detail page.
           res.send({message: "Event was updated successfully!"});
        });
 }


 //delete event 
 exports.event_delete = function(req,res,next) {
     Events.findByIdAndRemove(req.params.id, {}, function(err){
         if(err) {return next(err);}
         //success
         res.send({message: "Event was deleted successfully!"})
     })
 }