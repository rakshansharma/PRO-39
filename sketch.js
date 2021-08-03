var PLAY = 1;
var END = 0;
var gameState = PLAY;

var chor     , chorImg;
var police   , policeImg;
var bg       , bgImg
var chorJump , chorJumpImg;
var chorScrolling , chorScrollingImg;
var coinG    , coinImg;
var dangerG  , dangerImg;
var diamondG , diamondImg;
var gameOver , gameOverImg;
var restart  , restartImg;
var index;   
var score = 0;
function preload(){
  
  bgImg = loadImage("ground2.png");
  
  gameOverImg = loadImage("gameOver-1.png");
  
  restartImg = loadImage("restart.png");

  chorImg = loadAnimation("chors1-removebg-preview.png","chors2-removebg-preview.png","chors3-removebg-preview.png","chors4-removebg-preview.png","chors5-removebg-preview.png","chors6-removebg-preview.png");
  
  chorJumpImg = loadAnimation("chorsjump1-removebg-preview.png");
  
  chorScrollingImg = loadAnimation("chorscrollingbg-removebg-preview.png");
  
  coinImg = loadAnimation("coins(1)_prev_ui.png", "coins(2)_prev_ui.png","coins(3)_prev_ui.png", "coins(4)_prev_ui.png","coins(5)_prev_ui.png", "coins(6)_prev_ui.png");
  
  dangerImg = loadAnimation("danger1_prev_ui.png","danger_prev_ui.png");
  
  diamondImg = loadAnimation("[removal.ai]_tmp-60ae3fdb35fa0.png","[removal.ai]_tmp-60ae400d67c71.png","[removal.ai]_tmp-60ae4015f3385.png","[removal.ai]_tmp-60ae401b371f9.png","[removal.ai]_tmp-60ae4021b9395.png","[removal.ai]_tmp-60ae402a1ac5f.png");
}

function setup() {
  createCanvas(displayWidth - 20, displayHeight+400);
  
  bg = createSprite(200,400,400,20);
  bg.addImage(bgImg);
  bg.velocityX = -(50 +(score/2));
  
  chor = createSprite(130,320,20,20);
  chor.addAnimation("chorImg",chorImg);
  chor.scale = 0.7;

  ground = createSprite(250,450,850);
  ground.visible = false;
  
  gameOver = createSprite(750,180);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.7;
  
  restart = createSprite(750,290);
  restart.addImage(restartImg);
  restart.scale = 1;
  
  coinG    = createGroup();
  dangerG  = createGroup();
  diamondG = createGroup();
  
  chor.setCollider("rectangle",0,0,120,chor.height);
  chor.debug = false;
  
  score = 0;
}

function draw() {  
  if(gameState === PLAY){
    
    background(225); 
    
    gameOver.visible = false;
    restart.visible = false;
    chor.visible = true;
    
    if(bg.x < 0){
     bg.x = bg.width/2;
      
  }
    
    if(keyDown("UP_ARROW")&& chor.y >= 100){
    chor.velocityY = -12;
    chor.addAnimation("chorJumpImg",chorJumpImg);             chor.changeAnimation("chorJumpImg",chorJumpImg);
  }
    
    chor.velocityY = chor.velocityY + 0.8;
  
    coin();
    danger();
    diamond();
  
    if(chor.isTouching(ground)){  
     chor.changeAnimation("chorImg",chorImg);    
    }
    if(chor.isTouching(coinG)){
       coinG.destroyEach();
       score = score + 2;
    }
    if(chor.isTouching(diamondG)){
       diamondG.destroyEach();
       score = score + 5;
    }
   if(dangerG.isTouching(chor)){
     dangerG.destroyEach();
     coinG.destroyEach();
     diamondG.destroyEach();
     chor.velocityY = -12;
      chor.visible = false;
      gameState = END;
    }
  }
    
  else if(gameState === END){
    
     chor.visible = false;
     gameOver.visible = true;
     restart.visible = true;
    
     bg.velocityX = 0;
     chor.velocityY =0;
    
    diamondG.destroyEach();
    dangerG.destroyEach();
    coinG.destroyEach();    
    
  }
    chor.collide(ground);

    chor = chor;

    if (chor === chor.chor){
      camera.position.x = displayWidth/-5;
    }
  
  if(mousePressedOver(restart)){
    reset();  
  }
  
  drawSprites();
    textSize(20);
    fill(255);
    text("score: " + score,10,50);

}

function reset (){
  
  score=0;
  gameState = PLAY;
  gameOver.visible=false;
  restart.visible=false;
  bg.velocityX = -(50+(score/2));
  chor.changeAnimation("chorImg",chorImg);
  
}

function coin() {
  if (frameCount % 80 === 0) {
    var coin = createSprite(600,120,40,10);
    coin.y = Math.round(random(80,120));
    coin.addAnimation("coinImg",coinImg);
    coin.scale = 0.5;
    coin.velocityX = -(20+(score/2));
    coin.lifetime = 200;
    coin.depth = chor.depth;
    chor.depth = chor.depth + 1;
    coinG.add(coin);
  }
}

function danger() {
  if (frameCount % 120 === 0) {
    var danger = createSprite(700,120,40,10);
    danger.y = Math.round(random(210,290));
    danger.addAnimation("dangerImg",dangerImg);
    danger.scale = 0.2;
    danger.velocityX = -(30+(score/2));
    danger.lifetime = 200;
    danger.depth = chor.depth;
    chor.depth = chor.depth + 1;
    dangerG.add(danger);
  }
}

function diamond() {
  if (frameCount % 500 === 0) {
    var diamond = createSprite(685,120,40,10);
    diamond.y = Math.round(random(80,120));
    diamond.addAnimation("diamondImg",diamondImg);
    diamond.scale = 0.5;
    diamond.velocityX = -(40+(score/2));
    diamond.lifetime = 200;
    diamond.depth = chor.depth;
    chor.depth = chor.depth + 1;
    diamondG.add(diamond);
  }
}