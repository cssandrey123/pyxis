// bunaaaa
function loadLoginPage(){
    $(function(){
        $("#login").load("./html/login.html");
    });
}

window.onresize = function(){
    let nav = document.getElementById("navbar");
    if(window.innerWidth<992){
        nav.classList.remove("navbar-transparent");
        nav.classList.add("navbar-light","bg-light");
    }
    else if(window.pageYOffset==0){
        nav.classList.remove("navbar-light","bg-light");
        nav.classList.add("navbar-transparent");
    }
}
window.onscroll = function(){
    let nav = document.getElementById("navbar");
    if (window.pageYOffset>0 && window.innerWidth>=992) {
        nav.classList.remove("navbar-transparent");
        nav.classList.add("navbar-light","bg-light");
    } else if(window.innerWidth>=992){
        nav.classList.remove("navbar-light","bg-light");
        nav.classList.add("navbar-transparent");
    }
}





