// function makePostRequest(){
//     const httpRequest = new Promise((resolve,reject) => {
//         const xhr = new XMLHttpRequest();
//         xhr.open('POST','/html/post.html');
//         xhr.responseType = 'json';
//         xhr.onload = () => {
//             resolve(xhr.response);
//         };
        
//         xhr.send(JSON.stringify({"websites":"olx"}));
//         // xhr.send({website:"test"});
//     });
//     return httpRequest;
// }
function loginRequest() {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

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
    })
}



// function scrapeNames(){
//     makePostRequest().then(data => {
//         // let names = data.names.split(",");
//         // createNodeElem(names);
//         console.log(data);
//     });
// }