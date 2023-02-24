const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    location: {type: String, require : true},
    description: {type: String, require : true},
    image: {type: String},
    name: {type: String, require: true},
    likes: {type: Number, default: Math.ceil(Math.random() * 50),}
    
})

const user = mongoose.model("user", userSchema);

module.exports = user;