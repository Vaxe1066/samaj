const mongoose = require('mongoose');

const Schema=mongoose.Schema;

const DirectorySchema = new Schema(
    {
        user: {type: Schema.Types.ObjectID, ref: 'User'},
        houseNo: {type: String, required: true},
        adLine1: {type: String, required: true},
        adLine2: {type: String},
        postcode: {type: String, required: true},
        city: {type: String, required: true},
        country: {type: String, required: true},
        mobile: {type: String, length: 11},
        landline: {type: String, length: 11}

    }
);



//virtual for full name 



module.exports = mongoose.model('Directory', DirectorySchema);