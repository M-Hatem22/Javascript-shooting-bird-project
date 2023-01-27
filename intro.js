let submitbtn = document.getElementById("submitt");
let username ;

submitbtn.onclick=function(){
    username = document.querySelector("input[type=text]").value;
    // console.log(username);
    window.localStorage.setItem('name', `${username}`);
    // console.log(username);


    window.location.assign("./game.html" );
};
