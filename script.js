document.addEventListener('DOMContentLoaded',domloaded,false);
function domloaded(){
  var c = document.getElementById("animationCanvas");
  var ctx = c.getContext("2d");
  class Ball{
    constructor(height, width){
      this.height = height;
      this.width = width;
      this.posX = c.width/2;
      this.posY = c.height/2;
    }
  }
  var paddleAPosX, paddleAPosY, paddleAWidth, paddleAHeight;
  var paddleBPosX, paddleBPosY, paddleBWidth, paddleBHeight;
  ctx.fillStyle = "#FF0000";
  ctx.font = "30px Arial";

  paddleAPosX = 0;
  paddleAPosY = c.height/2;
  paddleAWidth = paddleBWidth = 30;
  paddleAHeight = paddleBHeight = 100;

  paddleBPosX = c.width - paddleBWidth;
  paddleBPosY = c.height/2;

  var map = [];
  //window.ballAnimation();
  document.onkeydown = document.onkeyup = interpretKeyPress;
  function interpretKeyPress(e) {
    e = e || event; // to deal with IE
    e.preventDefault();
    map[e.keyCode] = e.type == 'keydown';
    if (map[87]) {
      if (paddleBPosY >= 0) {
        paddleBPosY-=2;
      }
    }if (map[38]) {
      if (paddleAPosY >= 0) {
        paddleAPosY-=2;
      }
    }if (map[83]) {
      if (paddleBPosY+paddleBHeight <= c.height) {
        paddleBPosY+=2;
      }
    }if (map[40]) {
      if (paddleAPosY+paddleAHeight <= c.height){
        paddleAPosY+=2;
      }
    }
    redraw();
  }


  var ballAnimation = function(angle, direction){
    if (ballPosX+ballWidth >= c.width) {
      ctx.fillText("Left Wins!",250 ,250);
      return;
    }else if (ballPosX <= 0) {
      ctx.fillText("Right Wins",250 ,250);
      return;
    }else if (ballPosX+ballWidth >= paddleBPosX && ballPosY <= paddleBPosY+paddleBHeight && ballPosY+ballHeight >= paddleBPosY) {
      angle = ((ballPosY+ballHeight)/2)/((paddleBPosY+paddleBHeight)/2);

      if ((ballPosY+ballHeight)/2 < (paddleBPosY+paddleBHeight)/2) {
        angle *= -1;
      }
      direction = "Left";
    }else if (ballPosX <= paddleAPosX+paddleAWidth && ballPosY <= paddleAPosY+paddleAHeight && ballPosY+ballHeight >= paddleAPosY) {
      angle = ((ballPosY+ballHeight)/2)/((paddleAPosY+paddleAHeight)/2);

      if ((ballPosY+ballHeight)/2 < (paddleAPosY+paddleAHeight)/2) {
        angle *= -1;
      }
      direction = "Right";
    }else if (ballPosY+ballHeight >= c.height) {
      angle-=0.9;
    }else if (ballPosY <= 0) {
      angle+=0.9;
    }

    if(direction == "Right"){
      ballPosX+=1;
    }else {
      ballPosX-=1;
    }

    ballPosY+=angle;
    redraw();
    setTimeout(ballAnimation, 25, angle, direction);
  };


  var redraw = function(){
    //clear canvas
    ctx.clearRect(0, 0, c.width, c.height);
    //draw ball
    ctx.fillRect(ballPosX, ballPosY, ballWidth, ballHeight);
    //draw paddleA
    ctx.fillRect(paddleAPosX, paddleAPosY, paddleAWidth, paddleAHeight);
    //draw paddleB
    ctx.fillRect(paddleBPosX, paddleBPosY, paddleBWidth, paddleBHeight);
  };

  ballAnimation(0, "Right");
}
