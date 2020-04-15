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