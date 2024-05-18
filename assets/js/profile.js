document.addEventListener('DOMContentLoaded',function()
{
    const clickableImage = document.querySelector('img');
    clickableImage.addEventListener('click',function()
{
    this.classList.toggle('profile_image')
}
);
}
);
var x = document.getElementById("FORM");
x.style.display = "none";
function myFunction() {
    var x = document.getElementById("FORM");
    
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    };
  }