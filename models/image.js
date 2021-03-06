const mongoose =require('mongoose');
const Schema = mongoose.Schema;

var ImageSchema = new Schema({
    imageName: {type: String, default: "none", required:true},
    imageData:{type:String, required:true}
})

module.exports = mongoose.model('Image', ImageSchema);