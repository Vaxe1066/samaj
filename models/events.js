const mongoose = require('mongoose');
require('mongoose-type-url');
const Schema=mongoose.Schema;

const EventsSchema = new Schema(
    {
        title: {type: String, required: true, maxLength: 50},
        desc: {type: String, required: true},
        venue: {type: String},
        address: {type:String},
        postcode: {type: String},
        image: {type: Buffer},
        date: {type: Date, default: Date.now},
        links: {type:Object}

    }
);



//virtual for full name 



module.exports = mongoose.model('Event', EventsSchema);