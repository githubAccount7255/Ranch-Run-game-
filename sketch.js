var PLAY = 1;
var END = 0;
var gameState = PLAY;



var log;
var rock;
var fence;
var forest, forsetImage;
var bush;
var bg;
var horse;
var score=0;

var gameOver, restart, invisibleGround;
var gameOverImg, restartImg;



function preload(){
   //obstacles npc or non playing charecters 
rock = loadImage("rock.png");
log = loadImage("log.png");
bush = loadImage("bush.png");
forestImage = loadImage("forest.png");
  // pc playing charecters 
  horseImage = loadImage("brownHorse.png");

  gameOverImg = loadImage("gameOver.jpg");
  restartImg = loadImage("restart.png");

}


function setup() {
  createCanvas(875,400);

  forest = createSprite(600,200,400,20);
  forest.addImage("forest",forestImage);
  forest.x=width/2;
  forest.scale = 0.7;

  horse = createSprite(130,200,20,50);
  horse.addImage("horse",horseImage);
  horse.scale = 0.3;

  obstaclesGroup = new Group();

  score = 0;

  invisibleGround = createSprite(130,350,2000,10);
  invisibleGround.visible = false;

  gameOver = createSprite(411,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(400,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.3;
  restart.scale = 0.3;

  gameOver.visible = false;
  restart.visible = false;
}

function draw() {
  background(forestImage);
  text("Score: "+ score, 500,50);  

  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    //forest.velocityX = -(6 + 3*score/100);
    
    if(keyDown("space") && horse.y >= 159) {
      horse.velocityY = -12;
    }
  
    horse.velocityY = horse.velocityY + 0.8
  
    if (forest.x < 0){
      forest.x = forest.width/2;
    }
    forest.velocityX = -5;
    horse.collide(invisibleGround);
    spawnObstacles();
  
    if(obstaclesGroup.isTouching(horse)){
        gameState = END;
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    forest.velocityX = 0;
    horse.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }



  drawSprites();
  }

//spawning the obstacles 
  function spawnObstacles() {
    if(frameCount % 200 === 0) {
      var obstacle = createSprite(1000,328,10,40);
      //obstacle.debug = true;
      obstacle.velocityX = -(6 + 3*score/100);
      
      //generate random obstacles
      var rand = Math.round(random(1,6));
      switch(rand) {
        case 1: obstacle.addImage(rock);
                break;
        case 2: obstacle.addImage(log);
                break;
        case 3: obstacle.addImage(log);
                break;
        case 4: obstacle.addImage(bush);
                break;
        case 5: obstacle.addImage(rock);
                break;
        case 6: obstacle.addImage(bush);
                break;
        default: break;
      }
      
      //assign scale and lifetime to the obstacle           
      obstacle.scale = 0.3;
      obstacle.lifetime = 300;
      //add each obstacle to the group
      obstaclesGroup.add(obstacle);
    }
  }
  function reset(){
    gameState = PLAY;
    gameOver.visible = false;
    restart.visible = false;
    
    obstaclesGroup.destroyEach();
    score = 0;
    
  }




