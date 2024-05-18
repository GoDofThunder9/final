const mongoose = require('mongoose');
const { type } = require('os');

const chatengine = new mongoose.Schema({
    content : 
     {
        type: String,
        required: true,
     },
     email: 
     {
        type: String,
        required: true,
     }
},
{
    timestamps: true
}
);

const Chat = mongoose.model('Chat', chatengine); 
module.exports = Chat;