document.addEventListener('DOMContentLoaded', function() {
    // Function to toggle comments visibility
    function toggleComments(postId) {
        const commentList = document.getElementById(`post-comment-${postId}`);
        if (commentList) {
            console.log(commentList)
            commentList.classList.toggle('show'); // Toggle the 'show' class
        }
    }

    // Find all comment toggle icons and attach click event listeners
    const commentIcons = document.querySelectorAll('.toggle-comment');
    if (commentIcons) {
        commentIcons.forEach(icon => {
            icon.addEventListener('click', function() {
                const postId = this.getAttribute('data-post-id'); // Get post ID from data attribute
                toggleComments(postId); // Call toggleComments function with post ID
            });
        });
    }
});

