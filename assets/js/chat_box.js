const chatBox = document.getElementById('user-chat-box');

// Toggle chat box size and position
chatBox.addEventListener('click',(event) => {
    if (event.target === chatBox) {
        chatBox.classList.toggle('expanded');
    }
});