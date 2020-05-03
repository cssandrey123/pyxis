// bunaaaa
document.getElementById("Login").addEventListener("click",loadLoginPage);
function removeElemFromDom(elem){
    let parentWrapper = document.getElementById("login")
    parentWrapper.innerHTML = "";
}
function loadLoginPage(){
    $(function(){
        $("#login").load("./html/login.html");
    });
    console.log("clicked");
}

window.onresize = function(){
    let nav = document.getElementById("navbar");
    let navLogo = document.getElementById("nav-logo");
    if(window.innerWidth<992){
        nav.classList.remove("navbar-transparent");
        nav.classList.add("navbar-light","bg-light");
        navLogo.classList.add("logo-black");
    }
    else if(window.pageYOffset==0){
        nav.classList.remove("navbar-light","bg-light");
        nav.classList.add("navbar-transparent");
        navLogo.classList.remove("logo-black");
    }
}
window.onscroll = function(){
    let nav = document.getElementById("navbar");
    let navLogo = document.getElementById("nav-logo");
    if (window.pageYOffset>0 && window.innerWidth>=992) {
        nav.classList.remove("navbar-transparent");
        nav.classList.add("navbar-light","bg-light");
        navLogo.classList.add("logo-black");
    } else if(window.innerWidth>=992){
        nav.classList.remove("navbar-light","bg-light");
        nav.classList.add("navbar-transparent");
        navLogo.classList.remove("logo-black");
    }
}





