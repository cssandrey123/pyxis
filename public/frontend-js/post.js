function makePostRequest(){
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
    return httpRequest;
}
function loginRequest() {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    const httpRequest = new Promise((resolve,reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST','/login');
        xhr.responseType = 'json';
        xhr.onload = () => {
            resolve(xhr.response);
        };   
        xhr.send(JSON.stringify({
            username,
            password
        }));
        // xhr.send({website:"test"});
    });

    httpRequest.then(response => {
        console.log("Received message from backend: " + JSON.stringify(response));
    })

}
// function createNodeElem(names){
//     let contDiv = document.createElement('div');
//     contDiv.className = "container";
//     let list = document.createElement('ul');
//     contDiv.appendChild(list);
//     for(name of names){
//         let liElem = document.createElement('li');
//         liElem.innerText = name;
//         list.appendChild(liElem);
//     }
//     document.body.appendChild(contDiv);

// }
function scrapeNames(){
    makePostRequest().then(data => {
        // let names = data.names.split(",");
        // createNodeElem(names);
        console.log(data);
    });
}