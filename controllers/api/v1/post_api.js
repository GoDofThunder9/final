const post = require('../../../models/post');
const comment = require('../../../models/comment');
module.exports.index = async function(req,res)
{
   let posts = await post.find({})
    .sort('createdAt')
    .populate('uuser')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    });

    return res.json(200,{
        message : 'List of posts',
        posts : posts
    })
}

module.exports.destroy = function(req, res) {
  
    try {
      post.findById(req.params.id,function(err, post) { 
        if (post && post.uuser == req.user.id) { // Check if 'post' exists and 'uuser' matches user ID
          post.remove();
          comment.deleteMany({ post: req.params.id }, function(err) {
    
            // if(req.xhr)
            // {
            //   return res.status(200).json(
            //     {
            //       data: 
            //       {
            //         post_id: req.params.id
            //       },
            //       message:'post deleted successfully'
            //     }
            //   )
            // }
            return res.status(500).json(
                {
                   message: "done for the day" 
                }
                 );
          })
        } else {
          return res.status(401).json(
            {
               message: "you cannot delete this post" 
            }
             );
          }
        });
    } catch (error) {
        console.log('*****',err);
      return res.status(500).json(
     {
        message: "internal server error" 
     }
      );
    }
  //
};