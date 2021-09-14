var bananaImage,bananaGroup,obstacleImage,ObstacleGroup,jungle
var score
var player , player_running
var PLAY = 1
var END = 0
var gameState = PLAY;
var reset

function preload() {
backImage=loadImage("jungle.png");

player_running=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");

bananaImage=loadImage("banana.png");

obstacleImage=loadImage("stone.png");
}

function setup() {
  createCanvas(400, 400);
  
  jungle=createSprite(0,0,400,200);
  jungle.addImage("jungle.png",backImage);
  jungle.scale=1
  jungle.x=jungle.width/2;
  jungle.velocityX=-3;
  
  player=createSprite(50,380,10,10);
  player.addAnimation("player",player_running);
  player.scale=0.1;
  
  switch(score){
    case 10 :player.scale=0.12;
      break;
    case 20 :player.scale=0.14;
      break;
    case 30 :player.scale=0.16;
      break;
    case 40 :player.scale=0.18;
      break;  
      default:break;
  }
  
  invisibleGround=createSprite(0,390,400,20);
  invisibleGround.visible=false;
  
  BananaGroup=new Group();
  ObstacleGroup=new Group();
  
}

function draw() {
  background(220);
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score:"+score,500,50);
  
  if(gameState ===  PLAY) {
    score = score + Math.round(getFrameRate()/60);

      if (jungle.x < 0){
      jungle.x = jungle.width/2;
  }
    //scoring
  score = score+Math.round(frameRate/30);
  
  //jump when the space key is pressed 
  if(keyDown("space")&& player.y >=349){
    player.velocityY =-12;
  }
    
      //add gravity
    player.velocityY = player.velocityY + 0.8;

    player.collide(invisibleGround)

      if(ObstacleGroup.isTouching(player)){
       player.scale=0.2;  
    }
  }
  else if(gameState===END){
    
  }
  
    food();
    Obstacles();
 
  drawSprites();
}

function reset() {
 gameState=PLAY;
  
  BananaGroup.detroyEach();
  ObstacleGroup.destroyEach();
  
  score=0
}

function food() {
  if(frameCount % 80 ===0){
banana = createSprite(200,300,10,10);
banana.y = Math.round(random(250,250));
banana.addImage(bananaImage);
banana.scale=0.05;
banana.velocityX = -3;

//setting lifetime to banana
banana.lifetime=150;

//adding banana to a group
BananaGroup.add(banana);
}
}

function Obstacles() {
 if(frameCount % 300 ===0){
   obstacle = createSprite(400,365,10,40);
   obstacle.velocityX = - (6 + 3*score/100);
   
   //generate random obstacle
   var rand =Math.round(random(1,6));
   obstacle.addImage(obstacleImage);
   
   //assign scale and lifetime to the obstacle
   obstacle.scale=0.5;
   obstacle.lifetime=100;
   
   //add obstacle to the group 
   ObstacleGroup.add(obstacle);
 }  
}