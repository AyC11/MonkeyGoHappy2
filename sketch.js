var monkey , monkey_running,mokeyStop;
var banana ,bananaImage, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var ground,groundImage;
var invisibleGround;
var score = 0;
var gameState = "play";
var obstaclesGroup;
var gameOver,gameOverImage;
var retry,retryImage;
var points=0;
var bananaImage;
var bananaGroup;
var noOfTime=false;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  monkeyStop = ("sprite_0.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  groundImage = loadImage("jungle.jpg");
  gameOverImage = loadImage("gameover.jpg");
  
  retryImage = loadImage("retry.png");
  
  bananaImage = loadImage("banana.png");
}


function setup() {
  createCanvas(400,400);
  ground = createSprite(200,200,400,10);
  ground.addImage("ground",groundImage);
  ground.x = ground.width/2;

  monkey = createSprite(44,200,20,200);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale = 0.1;
  monkey.addAnimation("monkeyStop",monkeyStop);
  
  invisibleGround = createSprite(200,370,400,10);
  invisibleGround.visible = false;
  
  obstaclesGroup = createGroup();
  gameOver = createSprite(200,200,10,10);
  gameOver.addImage(gameOverImage);
  gameOver.visible = false;
  gameOver.scale=0.8;
  monkey.setCollider("circle",0,0,150);

  bananaGroup = createGroup();
  retry = createSprite(200,330,10,10);
  retry.addImage(retryImage);
  retry.scale = 0.02;
  retry.visible = false;
}
function draw() {
  background(220);
  if(gameState==="play"){
       score = Math.ceil(frameCount / frameRate());
     ground.velocityX = -4;
  if(ground.x<100){
   ground.x = ground.width/2;
  }
    
      monkey.velocityY = monkey.velocityY+0.5;
  if(keyDown("space")&&monkey.y>=315){
    monkey.velocityY = -12;
  }
      monkey.collide(invisibleGround);
  obstacles();
    bananas();
    
    if(monkey.isTouching(bananaGroup)){
    points = points+2;
    
      bananaGroup.destroyEach();
    }
    
    
 if(monkey.isTouching(obstaclesGroup)){
   obstaclesGroup.destroyEach();
    if(noOfTime===true){
      gameState="end";
    }else{
      monkey.scale=0.05;
     noOfTime=true;
        
    }
    
   
 
 }
   
   switch(points){
      case 10: monkey.scale=0.12;
        break;
        case 20: monkey.scale=0.14;
        break;
        case 30: monkey.scale=0.16;
        break;
        case 40: monkey.scale=0.18;
        break;
        default:break;
    }
  }

 
  
  drawSprites();
  
  fill("yellow");
  textSize(20);
  text("Survival Time: "+score,200,20);
  text("POINTS: "+points,10,20);
  
   if(gameState === "end"){
   
  gameOver.visible = true;
     retry.visible = true;
   //noOfTime=1;
   
   monkey.velocityY=0;
   ground.velocityX = 0;
        
   
   fill("white");
   text("Survival Time: "+score,190,275);
   text("Press Reload Button to \nrestart!!",100,120);
     text("POINTS: "+points,75,275);
   
   obstaclesGroup.setLifetimeEach(-1);
     bananaGroup.setLifetimeEach(-1);   monkey.changeAnimation("monkeyStop",monkeyStop);
   
   obstaclesGroup.setVelocityXEach(0);
     bananaGroup.setVelocityXEach(0);
     bananaGroup.destroyEach();
 }
  if(mousePressedOver(retry)){
    restart();
  }
  
}

function restart(){
        gameState = "play";
        retry.visible = false;
        gameOver.visible = false;
        obstaclesGroup.destroyEach();
        monkey.changeAnimation("monkey",monkey_running);
        monkey.scale=0.1;
        score = 0;
        points = 0;
noOfTime=false;
}
function obstacles(){

   if(frameCount % 80 === 0){

             var obstacle = createSprite(400,370,10,10);
             obstacle.addImage("obstacle",obstacleImage);
             obstacle.scale = 0.1;
             obstacle.velocityX = -(4+score/100);
             obstacle.lifetime = 100;
     
     
     obstaclesGroup.add(obstacle);
     
   }
   
  
}


function bananas(){
  if(frameCount % 80 === 0){
        var banana = createSprite(400,230,10,10);
        banana.y = Math.round(random(140, 200));
        banana.addImage(bananaImage);
        banana.velocityX= -5;
        banana.scale=0.1;
        bananaGroup.add(banana);
  }


}
