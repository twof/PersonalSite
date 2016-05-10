document.addEventListener('DOMContentLoaded',domloaded,false);
function domloaded(){
  var c = document.getElementById("animationCanvas");
  var ctx = c.getContext("2d");
  ctx.fillStyle = "#FF0000";
  ctx.font = "30px Arial";

  class Ball{
    constructor(height, width){
      this.height = height;
      this.width = width;
      this.posX = c.width/2;
      this.posY = c.height/2;
    }

    setPos(posX, posY){
      this.posX = posX;
      this.posY = posY;
    }

    getPosX(){
      return this.posX;
    }

    getPosY(){
      return this.posY;
    }

    getHeight(){
      return this.height;
    }

    getWidth(){
      return this.width;
    }
  }

  class Paddle{
    constructor(height, width, posX, posY){
      this.height = height;
      this.width = width;
      this.posX = posX;
      this.posY = posY;
    }

    setPos(posX, posY){
      this.posX = posX;
      this.posY = posY;
    }

    getPosX(){
      return this.posX;
    }

    getPosY(){
      return this.posY;
    }

    getHeight(){
      return this.height;
    }

    getWidth(){
      return this.width;
    }
  }

  var ball = new Ball(50, 50);
  var paddleA = new Paddle(100, 30, 0, c.height/2);
  var paddleB = new Paddle(100, 30, c.width - 30, c.height/2);

  var map = [];
  //window.ballAnimation();
  document.onkeydown = document.onkeyup = interpretKeyPress;

  function interpretKeyPress(e) {
    if (map[87]) {
      if (paddleB.getPosY() >= 0) {
        paddleB.setPos(paddleB.getPosX(), paddleB.getPosY()-2);
      }
    }if (map[38]) {
      if (paddleA.getPosY() >= 0) {
        paddleA.setPos(paddleA.getPosX(), paddleA.getPosY()-2);
      }
    }if (map[83]) {
      if (paddleB.getPosY()+paddleB.getHeight() <= c.height) {
        paddleB.setPos(paddleB.getPosX(), paddleB.getPosY()+2);
      }
    }if (map[40]) {
      if (paddleA.getPosY()+paddleA.getHeight() <= c.height){
        paddleA.setPos(paddleA.getPosX(), paddleA.getPosY()+2);
      }
    }
    redraw();
  }

  
  var ballAnimation = function(angle, direction){
    var id = setInterval(movement, 20);
    console.log('beginning of the ball animation function');
    function movement(){
      if (ball.getPosX()+ball.getWidth() >= c.width) {
        ctx.fillText("Left Wins!",250 ,250);
        clearInterval(id);
        return;
      }else if (ball.getPosX() <= 0) {
        ctx.fillText("Right Wins",250 ,250);
        clearInterval(id);
        return;
      }else if (ball.getPosX()+ball.getWidth() >= paddleB.getPosX() && ball.getPosY() <= paddleB.getPosY()+paddleB.getHeight() && ball.getPosY()+ball.getHeight() >= paddleB.getPosY()) {
        angle = ((ball.getPosY()+ball.getHeight())/2)/((paddleB.getPosY()+paddleB.getHeight())/2);

        if ((ball.getPosY()+ball.getHeight())/2 < (paddleB.getPosY()+paddleB.getHeight())/2) {
          angle *= -1;
        }
        console.log('direction set left');
        direction = "Left";
      }else if (ball.getPosX() <= paddleA.getPosX()+paddleA.getWidth() && ball.getPosY() <= paddleA.getPosY()+paddleA.getHeight() && ball.getPosY()+ball.getHeight() >= paddleA.getPosY()) {
        angle = ((ball.getPosY()+ball.getHeight())/2)/((paddleA.getPosY()+paddleA.getHeight())/2);

        if ((ball.getPosY+ball.getHeight())/2 < (paddleA.getPosY()+paddleA.getHeight())/2) {
          angle *= -1;
        }
        console.log('direction set right');
        direction = "Right";
      }else if (ball.getPosY()+ball.getHeight() >= c.height) {
        angle-=0.9;
      }else if (ball.getPosY() <= 0) {
        angle+=0.9;
      }

      if(direction == "Right"){
        ball.setPos(ball.getPosX()+1, ball.getPosY());
      }else {
        ball.setPos(ball.getPosX()-1, ball.getPosY());
      }

      ball.setPos(ball.getPosX(), ball.getPosY()+angle);
      redraw();
    }
    console.log('end of the ball animation function');
  };


  var redraw = function(){
    console.log('redraw');
    //clear canvas
    ctx.clearRect(0, 0, c.width, c.height);
    //draw ball
    ctx.fillRect(ball.getPosX(), ball.getPosY(), ball.getWidth(), ball.getHeight());
    //draw paddleA
    ctx.fillRect(paddleA.getPosX(), paddleA.getPosY(), paddleA.getWidth(), paddleA.getHeight());
    //draw paddleB
    ctx.fillRect(paddleB.getPosX(), paddleB.getPosY(), paddleB.getWidth(), paddleB.getHeight());
  };

  ballAnimation(0, "Right");

  document.body.addEventListener("keydown", function (e) {
    map[e.keyCode] = true;
  });
  document.body.addEventListener("keyup", function (e) {
    map[e.keyCode] = false;
  });
}
