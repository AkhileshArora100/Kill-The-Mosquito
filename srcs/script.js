//jshint esversion:8
var score = 0;
var time;
var anim;
var marker = 5;
var count = 0;
var high = 0;
var deadCall;
var deadDirection;
var nullVar = 1;
const css = window.document.styleSheets[0];
var scrW = document.querySelector(".bg").offsetWidth;
var scrH = document.querySelector(".bg").offsetHeight;
window.addEventListener('orientationchange', function(){
  var orient = window.orientation;
  if(orient == 90 || orient == -90){
    landscape();
  }
  else {
    portrait();
  }
});
if(scrH < scrW || scrH == scrW){
  landscape();
}
else{
  portrait();
}
function landscape(){
  document.querySelector(".alive").style.width = "100px";
  document.querySelector(".alive").style.left = "calc(50% - 50px)";
  document.querySelector("h1").style.fontSize = "50px";
  document.querySelector("h1").style.lineHeight = "70px";
  document.querySelector(".footer").style.fontSize = "15px";
  document.querySelector(".footer").style.left = "calc(50% - 110px)";
  for (var i = 0; i < document.querySelectorAll("h2").length; i++) {
    document.querySelectorAll("h2")[i].style.fontSize = "18px";
  }
  document.querySelector("span").style.fontSize = "18px";
  document.querySelector(".sound").style.height = "60px";
}
function portrait(){
  document.querySelector(".alive").style.width = "200px";
  document.querySelector(".alive").style.left = "calc(50% - 100px)";
  document.querySelector("h1").style.fontSize = "80px";
  document.querySelector("h1").style.lineHeight = "100px";
  document.querySelector(".footer").style.fontSize = "20px";
  document.querySelector(".footer").style.left = "calc(50% - 150px)";
  for (var i = 0; i < document.querySelectorAll("h2").length; i++) {
    document.querySelectorAll("h2")[i].style.fontSize = "24px";
  }
  document.querySelector("span").style.fontSize = "24px";
  document.querySelector(".sound").style.height = "100px";
}
document.querySelector(".sound").addEventListener("click", function(){
  if(document.querySelector(".sound").getAttribute("src") == "srcs/monkey_happy.png"){
    nullVar = 0;
    score = score+10;
    document.querySelector(".sound").setAttribute("src", "srcs/monkey_quiet.png");
  }
  else if(document.querySelector(".sound").getAttribute("src") == "srcs/monkey_quiet.png"){
    nullVar = 1;
    score = score+10;
    document.querySelector(".sound").setAttribute("src", "srcs/monkey_happy.png");
  }
});
document.addEventListener("click", start);
function start() {
  if (marker == 5){
    marker = 1;
    time = 0;
  }
  else {
    marker = 0;
    time = 1300;
    anim = "0.65s";
  }
  if(high>500){
    time = 1200;
    anim = "0.6s";
  }
  if(high>1000){
    time = 1100;
    anim = "0.55s";
  }
  if(high>1500){
    time = 900;
    anim = "0.45s";
  }
  setTimeout(function() {
    var height = Math.random()*40+5;
    var width = Math.random()*60 + "vw";
    var call = Math.floor(Math.random()*2)+1 + "";
    var mirror = Math.floor(Math.random()*2)+1 + "";
    var pscore = score;
    if(mirror == 1){
      document.querySelector(".alive").setAttribute("src", "srcs/mosquito_alive_1.png");
    }
    else if (mirror == 2){
      document.querySelector(".alive").setAttribute("src", "srcs/mosquito_alive_2.png");
    }
    if(count != 1){
      document.querySelector("h1").style.paddingTop = "1vh";
      document.querySelector("h1").style.opacity = "1";
      document.querySelector("h1").textContent = "KILL THE MOSQUITO!";
    }
    if(call == 1) {
      deadCall = "top";
      deadDirection = 1;
      document.querySelector(".alive").style.bottom = "auto";
      document.querySelector(".alive").style.right = "auto";
      document.querySelector(".alive").style.left = width;
      css.insertRule(`
       @keyframes myAnimation {
         0%   { top: `+(height-3)+`vh; }
         50%  { top: `+(height+3)+`vh; }
         100% { top: `+(height-3)+`vh; }
       }`, css.cssRules.length);
      document.querySelector(".alive").style.animation = "myAnimation "+anim+" linear 0s infinite";
    }
    else if(call == 2) {
      deadCall = "bottom";
      deadDirection = -1;
      document.querySelector(".alive").style.top = "auto";
      document.querySelector(".alive").style.left = "auto";
      document.querySelector(".alive").style.right = width;
      css.insertRule(`
       @keyframes myAnimation {
         0%   { bottom: `+(height-3)+`vh; }
         50%  { bottom: `+(height+3)+`vh; }
         100% { bottom: `+(height-3)+`vh; }
       }`, css.cssRules.length);
      document.querySelector(".alive").style.animation = "myAnimation "+anim+" linear 0s infinite";
    }
    if(marker == 1){
      document.querySelector(".box").style.display = "flex";
      document.querySelector(".alive").addEventListener("click",function(){
        score = score+30;
        if(nullVar){
          let audio = new Audio('sounds/squash.mp3');
          audio.play();
        }
        document.querySelector(".score").textContent = "Score: "+score;
        document.querySelector(".alive").setAttribute("src", "srcs/mosquito_dead.png");
        css.insertRule(`
         @keyframes myAnimation {
           0%   { `+(deadCall)+`: `+(height)+`vh; }
           100% { `+(deadCall)+`: `+(height+5*deadDirection)+`vh; }
         }`, css.cssRules.length);
        document.querySelector(".alive").style.animation = "myAnimation "+anim+" linear 0s infinite";
      });
      document.addEventListener("click",function(){
        score = score-10;
        if(score<0){
          time = 0;
          count = 1;
          document.querySelector(".score").style.visibility = "hidden";
          let totalHeight = document.querySelector("h1").offsetHeight + document.querySelector(".highScore").offsetHeight+"px";
          document.querySelector("h1").style.paddingTop = "calc(50vh - "+totalHeight+")";
          document.querySelector("h1").textContent = "GAME OVER!";
          document.querySelector(".highScore").style.textAlign = "center";
          document.querySelector(".highScore").textContent = "CLICK ANYWHERE TO PLAY AGAIN";
          document.querySelector("h1").style.fontSize = "8vw";
          document.querySelector(".alive").style.display = "none";
          document.querySelector(".box").style.display = "none";
          document.addEventListener("click", function(){
            location.reload();
            return false;
          });
        }
        else{
          document.querySelector(".score").textContent = "Score: "+score;
          if(high<score){
            high = score;
            document.querySelector(".highScore").textContent = "High Score: "+high;
          }
        }
      });
      document.querySelector(".score").style.display = "block";
      document.querySelector(".highScore").style.display = "block";
    }
    if(count != 1){
      start();
    }
  }, time);
  document.removeEventListener("click", start);
}
