let gametimer=0;
let gamer=0;
let score=0;
let time=30;
let tds = document.getElementsByTagName("td");
let scoreText=document.getElementById("score");
let timeleft=document.getElementById("timeleft");
let topp=document.getElementById("topp");
let box1=document.getElementById("box1");
let topic= document.getElementById("topic");
let pic= document.getElementById("pic");


// 開始遊戲
start.onclick= function(){
    cook.classList.remove("cook");
    cook2.classList.remove("cook2");
    gamer=setInterval(game,1000);
    start.setAttribute("disabled","true");
    bonuserM(3);
    terrorerM(10);
    game();
    gametimer=setInterval(timer,1000);
    box1.removeChild(topp);
}


// 計時器，結束後行為
function timer(){
    time=time-1;
    (time <10)?timeleft.innerText=`0${time}`:timeleft.innerText=`${time}`;
    if(time==0){
        stop();
    }
}

// 清場 普通地鼠控制
function game(){
    for(let i=0;i<tds.length;i++){
        tds[i].classList.remove("red");
        tds[i].classList.remove("green");
        tds[i].classList.remove("yellow");
        tds[i].classList.remove("white");
        tds[i].classList.remove("blue");
        tds[i].classList.remove("ky");
        tds[i].classList.remove("kg");
        tds[i].classList.remove("kw");
    }
    for(let i=0;i<9;i++){
        rand=Math.floor(Math.random()*9);
        tds[rand].classList.add("red");
    }    
    for(let i=0;i<3;i++){
        rand=Math.floor(Math.random()*9);
        tds[rand].classList.remove("red");
        tds[rand].classList.add("green");
    }    
    // 打地鼠變化
        for(let i=0;i<tds.length;i++){
            tds[i].onclick = function(){
                if (this.classList.contains("red")) {
                    this.classList.remove("red");
                    this.classList.add("blue");
                    score++;
                    scorer();
    
                }else if(this.classList.contains("green")){
                    this.classList.remove("green");
                    this.classList.add("kg");
                    score=score+2;
                    scorer();
                }else if(this.classList.contains("yellow")){
                    this.classList.remove("yellow");
                    this.classList.add("ky");
                    score=score+10;
                    scorer();
                }else if(this.classList.contains("white")){
                    this.classList.remove("white");
                    this.classList.add("kw");
                    stop();
                }
            }
        }
}


// 加分地鼠
function bonus(){
    rand=Math.floor(Math.random()*9);
    tds[rand].classList.remove("red");
    tds[rand].classList.remove("green");
    tds[rand].classList.add("yellow");
}
// 加分地鼠出現時機
function bonuser(){
    let sec=(Math.floor(Math.random()*29)+1)*1000;
    return setTimeout(bonus,sec);
}
// 恐怖地鼠
function terror(){
    rand=Math.floor(Math.random()*9);
    tds[rand].classList.remove("red");
    tds[rand].classList.remove("green");
    tds[rand].classList.remove("yellow");
    tds[rand].classList.add("white");
}
// 恐怖地鼠出現時機
function terrorer(){
    let sec=(Math.floor(Math.random()*29)+1)*1000;
    return setTimeout(terror,sec);
}
// 設定隻數
function bonuserM(num){
    for(let i=0;i<num;i++){
        bonuser();
    };
}
function terrorerM(num){
    for(let i=0;i<num;i++){
        terrorer();
    }
}


// 分數格式
function scorer(){
    (score <10)?scoreText.innerText=`00${score}`:(score<100)?scoreText.innerText=`0${score}`:scoreText.innerText=score;
}


// 遊戲停止
function stop(){
    clearInterval(gamer);
        clearInterval(gametimer);

        cook.classList.add("cook");
        cook2.classList.add("cook2");

        clearTimeout(bonuserM);
        clearTimeout(terrorerM);

        setTimeout(function(){
            box1.appendChild(topp);
            
            start.innerText="再試一次?";

            if(score>=140){
                pic.setAttribute("src","./images/cb2.png");
            }else if(score>=130){
                pic.setAttribute("src","./images/splat.jpg");  
            }else if(score>120){
                pic.setAttribute("src","./images/gungz.jpg");  
            }else if(score>=110){
                pic.setAttribute("src","./images/1484639050169.png");                
            }else if(score>=100){
                pic.setAttribute("src","./images/splatfest-10.jpg");  
            }else if(score>=90){
                pic.setAttribute("src","./images/sparetime.jpg");  
            }else if(score>=80){
                pic.setAttribute("src","./images/gung.jpg");  
            }else if(score>=70){
                pic.setAttribute("src","./images/hasn.jpg");               
            }else if(score>=60){
                pic.setAttribute("src","./images/bank.jpg");              
            }else{
                pic.setAttribute("src","./images/fisheat.jpg");
            };

            alert(`${30-(time)}秒結束，您的分數為${score}分`);

            for(let i=0;i<tds.length;i++){
                tds[i].classList.remove("red");
                tds[i].classList.remove("green");
                tds[i].classList.remove("yellow");
                tds[i].classList.remove("white");
                tds[i].classList.remove("blue");
                tds[i].classList.remove("ky");
                tds[i].classList.remove("kg");
                tds[i].classList.remove("kw");
            }

            score=0;
            time=30;
            scoreText.innerText=`00${score}`;
            timeleft.innerText=30;

                setTimeout(function(){
                    start.removeAttribute("disabled");
                },1000);

        },500);
}

