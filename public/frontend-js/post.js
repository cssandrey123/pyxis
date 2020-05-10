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
function setLoginAllert(status){
    let allertSucces = document.getElementById("login-succes-allert");
    let allertIncorect = document.getElementById("login-incorect-allert");

    if(status == true) {
        allertSucces.style.display="block";
        allertIncorect.style.display="none";
    }
    else {
        allertSucces.style.display="none";
        allertIncorect.style.display="block";
    }
}

function setRegisterAllert(status) {
    let allertSucces = document.getElementById('register-succes-allert');

    if(status == true) {
        allertSucces.style.display="block";
    }
    else {
        allertSucces.style.display="none";
    }
}
function loginRequest() {
    let username = document.getElementById('logUsername').value;
    let password = document.getElementById('logPassword').value;

    const httpRequest = new Promise((resolve,reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST','/login');
        xhr.responseType = 'text';
        xhr.onload = () => {
            resolve(xhr.response);
        };   
        xhr.send(JSON.stringify({
            username,
            password
        }));
    });

    httpRequest.then(response => {  
        console.log("Received message from backend: " + response);//JSON.stringify(response));
        if(response === 'false') {
            setLoginAllert(false);
        }
        else {
            setLoginAllert(true);
        }
    }).catch(error => {
        console.log(error);
    })
}

function registerRequest(){
    let username = document.getElementById('regUsername').value;
    let password = document.getElementById('regPassword').value;
    let email = document.getElementById('regEmail').value;
    let fullname = document.getElementById('regName').value;

    const httpRequest = new Promise((resolve,reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST','/register');
        xhr.responseType = 'text';
        xhr.onload = () => {
            resolve(xhr.response);
        };   
        xhr.send(JSON.stringify({
            username,
            password,
            email,
            fullname
        }));
    });

    httpRequest.then(response => {  
        console.log("Received message from backend: " + response); //JSON.stringify(response));
        if(response) {
            setRegisterAllert(true);
        }
        else{
            setRegisterAllert(false);
        }

    }).catch(error => {
        console.log(error);
    })
}

