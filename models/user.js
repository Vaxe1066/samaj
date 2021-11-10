const mongoose = require('mongoose');

const Schema=mongoose.Schema;

const UserSchema = new Schema(
    {
        firstName: {type: String, maxLength: 200},
        lastName: {type: String, maxLength: 200},
        email: {type: String, required: true},
        password: {type: String, required: true},
        profileImg: {type: String},
        role: {type: String, enum: ["ADMIN","MEMBER", "NONE"], default: "NONE"}

    }
);



//virtual for full name 
UserSchema
.virtual('user')
.get(function () {
    return this.last_name + ', ' +this.first_name;
});


module.exports = mongoose.model('User', UserSchema);