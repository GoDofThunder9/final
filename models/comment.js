const mongoose = require('mongoose');
const { stringify } = require('querystring');
const User = require('./user');
const Post = require('./post');
const Like = require('./like');

const commentSchema = mongoose.Schema ({
   content: {
       type: String,
       require: true
   },
   user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
   },
   post: 
   {
     type:mongoose.Schema.Types.ObjectId,
     ref: 'Post'
   }
   ,
   likes :[
   {
       type: mongoose.Schema.Types.ObjectId,
       ref : 'Like'
   }
  ]
},
{
    timestamps : true
}); 

const comment = mongoose.model('comment',commentSchema);
module.exports = comment;