$( document ).ready(function() {
    let user = localStorage.getItem('logedUser');
    if(!user) {
        document.getElementById('formWrapper').style.display="none";
        document.getElementById('logged-user').style.display="none";
    }
    else {
        document.getElementById('not-logged-user').style.display="none";
        document.getElementById('user-span').innerHTML = JSON.parse(user).fullname;
    }
});


function sendOlxRequest(){
    const httpRequest = new Promise((resolve,reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST','/html/post.html');
        xhr.responseType = 'json';
        xhr.onload = () => {
            resolve(xhr.response);
        };
        
        xhr.send(JSON.stringify({"websites":"olx"}));
        // xhr.send({website:"test"});
    });
    httpRequest.then(response => {
        console.log(response);
    })
}

function salveazaAnunt() {
    let titlu = document.getElementById('titlu').value;
    let pret = document.getElementById('pret').value;
    let moneda = document.getElementById('moneda').value;
    let stare_olx = document.getElementById('stare-olx').value;
    let juridic = document.getElementById('juridic').value;
    let descriere = document.getElementById('descriere').value;
    let oras = document.getElementById('oras').value;
    let email = document.getElementById('email').value;
    let telefon = document.getElementById('telefon').value;
    let olx = document.getElementById('olx').checked;
    let publi24 = document.getElementById('Publi24').checked;

    let olxUsername = document.getElementById('username-olx').value;
    let olxPassword = document.getElementById('password-olx').value;

    let publi24Username = document.getElementById('username-publi24').value;
    let publi24Password = document.getElementById('password-publi24').value;

    const httpRequest = new Promise((resolve,reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST','/html/post.html/posteaza');
        xhr.responseType = 'text';
        xhr.onload = () => {
            resolve(xhr.response);
        };   
        xhr.send(JSON.stringify({
            titlu,
            pret,
            moneda,
            stare_olx,
            juridic,
            descriere,
            oras,
            email,
            telefon,
            olx,
            publi24,
            olxUsername,
            olxPassword,
            publi24Username,
            publi24Password
        }));
    });
    runBeforeRequest();
    httpRequest.then(response => {
        console.log(response);
        runAfterRequest();
    });  
}

function runBeforeRequest(){
    document.getElementById('before-post').style.display = "flex";
    document.getElementById('after-post').style.display = "none";
    document.getElementById('formWrapper').style.display = "none";;
}

function runAfterRequest(){
    document.getElementById('before-post').style.display = "none";
    document.getElementById('after-post').style.display = "block";
    document.getElementById('formWrapper').style.display = "none";
}

function testFunction() {
    setTimeout(()=> {
        runAfterRequest();
    },3000);
    runBeforeRequest();
}