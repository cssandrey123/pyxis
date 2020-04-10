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

function makePostRequest(){
    const httpRequest = new Promise((resolve,reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST','/');
        xhr.responseType = 'json';
        xhr.onload = () => {
            resolve(xhr.response);
        };
        
        xhr.send(JSON.stringify({websites:"a"}));
    });
    return httpRequest;
}
function createNodeElem(names){
    let contDiv = document.createElement('div');
    contDiv.className = "container";
    let list = document.createElement('ul');
    contDiv.appendChild(list);
    for(name of names){
        let liElem = document.createElement('li');
        liElem.innerText = name;
        list.appendChild(liElem);
    }
    document.body.appendChild(contDiv);

}
function scrapeNames(){
    makePostRequest().then(data => {
        let names = data.names.split(",");
        createNodeElem(names);
    });
}



