const mongoose = require('mongoose');
const docschema = new mongoose.Schema({
    Title: {
        type: String,
        required: [true, 'Doc must have Title']

    },
    CreatedAt:{
        type: Date,
        default: Date.now()
    },
    Data:{
        type: String,
        default: "[{type: 'paragraph',children: [{ text: '' }],},]"
    },
    CreatedBy:{ 
        type:String,
        ref: 'User',
        unique: true
    },

    InvitedTo:[{
        type:mongoose.Schema.ObjectId,
        ref: 'User'
    }]
    
})

const Doc = mongoose.model('Doc', docschema);
module.exports = Doc; 