{
    let createComment = async function()
    {
        let newCommentform = $('#new-comment-form');
        await newCommentform.submit(function(e)
        {
            e.preventDefault();
            $.ajax(
                {
                  type: 'post',
                  url:  '/comment/create',
                  data: newCommentform.serialize(),
                  success: function(data)
                  {
                    console.log(data.data.comments);
                    let newComment = newCommentdom(data.data.comments);           
                    $(`#post-comment-list>ul`).prepend(newComment);
                  },error : function(error)
                  {
                    console.log(error);
                  }
                }
            );
        }
        )
    }
    
    let newCommentdom = function(post)
    {
     return $
     (
        `<li id="comment-${post.post._id}" style="list-style: none;">
          <p> 
            <a class="delete-post-button" href="/comment/destroy/${post.post._id}"><i class="fa-solid fa-rectangle-xmark"></i></a>
            <div class="comment-box">   
              <small class="comment-content">${post.content} </small>
              <small class="comment-name">${post.user.name}  </small>
            </div>
            <small>
                <a style="text-decoration: none;" class="toggle-like-button" data-likes="${post.likes.length}" href="/likes/toggle/?id=${post._id}&type=comment">${post.likes.length}  <i id="toggle-comment-${post.post._id} class="fa-regular fa-heart " style="color: red;" style="margin-left: 4px;"></i>  </a>
                ${post.likes.length} <i class="fa-regular fa-heart" style="color: red;" style="margin-left: 4px;"></i>
                  <small class="timestamp">${post.post.createdAt}  </small>
                </small>
              </p>
            </li>
  </div>
</div>
</li>
`
     )
    }

    createComment();
}