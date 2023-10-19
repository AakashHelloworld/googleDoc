const mongoose = require('mongoose');
const userschema = new mongoose.Schema({
    Username: {
        type: String,
        required: [true, 'User must have name']

    },
    Email:{
        type: String,
        required: [true, 'User must have name'],
        unique: true,
    }
})

const User = mongoose.model('User', userschema);
module.exports = User; 