const database = firebase.database();

$( document ).ready(function() {
    let user = localStorage.getItem('logedUser');
    if(user) {
        showUserDetails(JSON.parse(user).fullname,true);
    }
});

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
    let allertInvalid = document.getElementById('register-incorect-allert');


    if(status == true) {
        allertSucces.style.display="block";
        allertInvalid.style.display="none";
    }
    else {
        allertSucces.style.display="none";
        allertInvalid.style.display="block";

    }
}
async function loginRequest() {
    let username = document.getElementById('logUsername').value;
    let password = document.getElementById('logPassword').value;

    let user = {
        username,
        password
    };

    let userData = await checkUserInDB(user);
    if(userData.userId != "") {
        setLoginAllert(true);
        setTimeout(()=>{
            localStorage.setItem('logedUser', JSON.stringify(userData));
            $('#loginModal').modal('hide');
    
            showUserDetails(userData.fullname,true);
            clearInputs();
        },1000);
    }
    else {
        setLoginAllert(false);
    }

}

async function registerRequest(){
    let username = document.getElementById('regUsername').value;
    let password = document.getElementById('regPassword').value;
    let email = document.getElementById('regEmail').value;
    let fullname = document.getElementById('regName').value;

    let user = {
        username,
        password,
        email,
        fullname
    }

    let isUnique = await validateUniqueUser(user);

    if(isUnique == false) {
        setRegisterAllert(false);
        console.log("fasle");
    }
    else {
        createUser(user);
        setRegisterAllert(true);

        setTimeout(()=>{
            clearInputs();
            $('#registerModal').modal('hide');
        },1000);
    }

}



function createUser(user) {
    var userId = database.ref().child('users').push().key;
    database.ref('users/' + userId).set(user);
}

async function validateUniqueUser(new_user) {
    return new Promise( async(resolve, reject) => {
        var users_db = firebase.database().ref('users');
        await users_db.once('value', async (snapshot) => {
            
            let users = snapshot.val();
            for(user in users){
                if(users[user].username == new_user.username){
                    resolve(false);
                }
            }
            resolve(true);
        })
    })
}

async function checkUserInDB(new_user) {
    return new Promise( async(resolve, reject) => {
        var users_db = firebase.database().ref('users');
        await users_db.once('value', async (snapshot) => {
            let users = snapshot.val();
            for(user in users){
                if(users[user].username == new_user.username && users[user].password == new_user.password){
                    resolve({
                        userId:user,
                        fullname: users[user].fullname
                    });
                }
            }
            resolve({
                userId:"",
                fullname:""
            });
        })
    })
}

function showUserDetails(name,state) {
    let login = document.getElementById("logLink");
    let reg = document.getElementById("regLink");
    let userDetails = document.getElementById("user-details");

    if(state == true) {
        login.style.display="none";
        reg.style.display="none";
        userDetails.style.display="block";

        userDetails.childNodes[1].innerHTML=name;
        console.log(userDetails.childNodes[1]);
    }
    else {
        userDetails.style.display="none";
        login.style.display="block";
        reg.style.display="block";
    }
}

function logOut(){
    showUserDetails("",false);
    localStorage.clear();
}

function clearInputs(){
    document.getElementById('regUsername').value="";
    document.getElementById('regPassword').value="";
    document.getElementById('regEmail').value="";
    document.getElementById('regName').value="";

    document.getElementById('logUsername').value="";
    document.getElementById('logPassword').value="";

    document.getElementById('register-succes-allert').style.display="none";
    document.getElementById('login-succes-allert').style.display="none";
}




