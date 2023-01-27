





let images = ["./blue.gif", "./black.gif", "./white.gif"]
    let bombobj = document.getElementsByClassName("bomb")[0];
    let time = 0;
    let windowHeight  = window.innerHeight;
    let windowWidth = window.innerWidth;
    let birdsArray = [];
    let score = 0;
    let currentscore=0;
    let id;
    //get the user name from local storage
    let username2 = window.localStorage.getItem("name");


    // bird class 
    class Bird {
        constructor(top, source) {

            let  birdimg = document.createElement("img");
            this.bird = birdimg;
            this.bird.src= source;
            this.bird.style.width="75px";
            this.bird.style.height="75px";
            this.bird.classList.add("bird");
            this.bird.style.position="absolute";
            this.bird.style.top = top + "px";
            this.bird.style.left = 0;
            this.myInterval;

        }
        addtoParent = function () {
            let body = document.querySelector("body");
            body.appendChild(this.bird);
        }
        
        
        moveright = function () {
            const bird = this.bird;
            $(bird).animate({
                left: `${windowWidth-100}`,
            }, 5000,  (a)=>{
                bird.remove();

                
        })}
        
    }
             //start of game

    window.addEventListener("load",()=>{
        setplayername();
        myInterval = window.setInterval(function () {
            time++;
            let birdsNumber =4 ;
            for (let i = 0; i < birdsNumber; i++) {
                let topp = Math.floor(Math.random() * (windowHeight - 200)) + (100);
                let birdObj = new Bird(topp + Math.floor(Math.random() * 10), images[Math.floor(Math.random() * 3) + 0])
    
                birdObj.addtoParent();
                birdObj.moveright();
            }
        },1000)
    
      
        let randomposition = Math.floor(Math.random() * (innerWidth - bombobj.width));
        // get the birds on screen in an array
        birdsInterval = setInterval(()=>{
            birdsArray=document.getElementsByClassName("bird")
        },130)
    
        //start dropping the bomb
        const movebomb = function (bombobj, left) {
            let top = 0;
            bombobj.classList.remove("hidden");
            bombobj.style.left = (left) + "px";
            id = setInterval(() => {
                top += 10;
                if (top < innerHeight ) {
                    bombobj.style.top = top + "px";
                    bombobj.style.zIndex = "1";
                    bombobj.classList.remove("hidden");
    
                }
                
                   else {
                    randomposition = Math.floor(Math.random() * (innerWidth - bombobj.width));
                    bombobj.classList.add("hidden");
                    top = 0;
                    bombobj.style.left = (randomposition) + "px";
    
                }
                   //when bomb is clicked
                bombobj.onclick = function () {
                    top = 0;
                    //check overlap of bird and bomb range
                    
                    for (let i=0 ; i<birdsArray.length;i++){
                        
                        let bombleft = parseInt(bombobj.style.left);
                        let bombtop = parseInt(bombobj.style.top);
                        let birdleft = parseInt(birdsArray[i].style.left);
                        let birdtop = parseInt(birdsArray[i].style.top);
                        let overlap =  !((bombleft + 150)  <= birdleft        ||    // right of bomb obj
                                         bombleft        >= (birdleft + 150) ||   // right of bird
                                         (bombtop + 150)  <= birdtop         ||  // bottom of bombobj
                                         bombtop         >= (birdtop + 150) ) ;   //bottom of bird
                        if (overlap){ 
                            score++;
                            playerScore( `${birdsArray[i].src}`) ;
                            birdsArray[i].remove();}
                            else {}
                            bombobj.classList.add("hidden");
                            top=0;
                            randomposition = Math.floor(Math.random() * (innerWidth - bombobj.width));
                            bombobj.style.left = (randomposition) + "px";
                    };
                }
    
            }, 130);
        }
    
     
       //calling functions to run the game  
        movebomb(bombobj, randomposition);
        timer();
       // check which bird is shot and add to the score
        function playerScore(source){
            switch (source){
                case 'file:///D:/iti/Javascript/demoes%20n/egg%20game/blue.gif':
                    currentscore +=10;
                    $("span.playerscore").text(currentscore);
                break;
                case 'file:///D:/iti/Javascript/demoes%20n/egg%20game/white.gif':
                   currentscore +=20;
                    $("span.playerscore").text(currentscore);
                break;
                case 'file:///D:/iti/Javascript/demoes%20n/egg%20game/black.gif':
                    currentscore -=10;
                    $("span.playerscore").text(currentscore);
                break;
     
    
            }
        }
        //timer count in the game
        function timer(){
            let sec= 60;
            const date = new Date();
            let time = setInterval(()=>{
               sec--;
               //display the kill count and score and time
               document.getElementById("timer-display").innerHTML= sec ;
               document.querySelector(".kill-count").innerText = score;
               document.querySelector(".score").innerText = currentscore;

               //send the date to the SERVER.
               window.localStorage.setItem('date',JSON.stringify(date));

               if (sec== 0){
                clearInterval(id);
                clearInterval(myInterval);
                clearInterval(time);
                // alert(`Time is out!
                //        Your kill count is ${score} & your score is ${currentscore}`);
               }
            },1000)
            
        }

        //sweet alert end game
        setTimeout(() => {
            clearInterval(myInterval);
            if (score > 20) {
                Swal.fire({
                    title: 'Great Job!',
                    text: 'You have succefully finished the game, care to try again? ',
                    icon: 'success',
                    confirmButtonText: 'Play again',
                    showCancelButton: true,
                    allowOutsideClick: false
                }).then(function (result) {
                    if (result.value) {
                        score = 0 ;
                        currentscore=0;
                        dispatchEvent(new Event('load'));

                    } else if (result.dismiss == 'cancel') {
                        window.location.href = "index.html";
                    }
                });
            } else {
                Swal.fire({
                    title: 'You loose!',
                    text: 'Oops you lost, care to try again ? ',
                    icon: 'error',
                    showCancelButton: true,
                    confirmButtonText: 'ok !',
                    allowOutsideClick: false
                }).then(function (result) {
                    if (result.value) {
                        score = 0 ;
                        currentscore=0;
                        dispatchEvent(new Event('load'));

                    } else if (result.dismiss == 'cancel') {
                        window.location.href = "index.html";
                    }
                });
            }
        }, 60000);

    })
       //set the player name function
    function setplayername(){
        if(username2){
            document.getElementById("player").innerText= username2;
        }
    }

