
var dino;

var ground, invisibleground;

var clouds;

var cacti;

var r;

var gameover, restart;

// var test;

// var cloud1;

var ground2;

var score2;

var highscore;

var gamestate = 'play';

var speed;

var touches;

function preload() {
  dino1 = loadAnimation('trex1.png', 'trex3.png', 'trex4.png');
  ground1 = loadAnimation('ground2.png');
  cloud2 = loadAnimation('cloud.png');
  cactus1 = loadAnimation('obstacle1.png');
  cactus2 = loadAnimation('obstacle2.png');
  cactus3 = loadAnimation('obstacle3.png');
  cactus4 = loadAnimation('obstacle4.png');
  cactus5 = loadAnimation('obstacle5.png');
  cactus6 = loadAnimation('obstacle6.png');
  ground3 = loadAnimation('ground2.png');
  dino2 = loadAnimation('trex_collided.png');
  gameover1 = loadAnimation('gameOver.png');
  restart1 = loadAnimation('restart.png');
  die = loadSound('die.mp3');
  jump = loadSound('jump.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  dino = createSprite(50, height/2 - 50, 20, 20);
  dino.addAnimation('dino', dino1);
  dino.scale = 0.5
  // dino.setCollider("rectangle", -5, -10, 25, 100, 45);
  dino.setCollider('circle', -10, -10, 40);
  
  ground = createSprite(width/2, height/2 + 10, 20, 20);
  ground.addAnimation('ground', ground1);
  
  invisibleground = createSprite(width/2, height/2 + 15, width, 10);
  invisibleground.visible = false;
  
  ground2 = createSprite(-width/2, height/2 + 10, 20, 20);
  ground2.addAnimation('ground2', ground3);
  
  // cloud1 = createSprite(200, 240, 20, 20);
  
  cacti = new Group();
  clouds = new Group();
  
  // test = createSprite(320, 30, 50, 30);
  // test.shapeColor = 'black';
  
  gameover = createSprite(width/2, height/4, 20, 20);
  gameover.addAnimation('game over', gameover1);  
  gameover.visible = false;
  gameover.scale = 0.5;
  
  restart = createSprite(width/2, height/4 + 40, 20, 20);
  restart.addAnimation('restart', restart1);
  restart.visible = false;
  restart.scale = 0.75;
  
  score2 = 1;
  
  speed = 0;
  
  highscore = 0;
  
  touches = [];
}

function draw() {
  background(250);
  
  r = 100;
  
  if (highscore < score2){
    highscore = score2;
  }
  
  // console.log(frameCount);
  
  r2 = Math.round(random(5, 10));
  
  if (gamestate == 'play'){
    if (frameCount % 300 == 0){
      speed = speed + 1;
    }
  }
  
  if (gamestate == 'play'){
    ground.velocityX = -5 - speed;
    ground2.velocityX = -5 - speed;
    
    if (ground.x < -width){
    ground.x = width;
  }
    if (ground2.x < -width){
      ground2.x = width;
    }
    
    cacti.setVelocityXEach(ground.velocityX);
  }

  if (gamestate == 'play'){
    cloudandcacti();
  }
  
  // dino.debug = true;
  if (gamestate == 'play'){
    dino.overlap(cacti, crash);
  }
  
//   cloud1.velocityX = -2;
  
//   if (cloud1.x <= 0) {
//     cloud1.x = 450;
//   }
  
  // console.log(frameCount);
    
  if (gamestate == 'play'){
    if ((keyDown('space') || touches.length > 0) && dino.y > height/2 - 20){
      dino.velocityY = -10;
      jump.play();
      touches = [];
      // test.shapeColor = 'gray';
    }
  }
  
  if (gamestate == 'play'){
    dino.velocityY = dino.velocityY + 0.5
  }
    
  dino.collide(invisibleground);
  
  if (gamestate == 'end' && (mousePressedOver(restart) || touches.length > 0)){
    touches = [];
    score2 = 0;
    dino.addAnimation('dino', dino1);
    cacti.setLifetimeEach(1);
    gamestate = 'play';
    gameover.visible = false;
    restart.visible = false;
  }
  
  drawSprites();
    
  if (gamestate == 'play'){
    score2 = score2 + 1;
  }
  
  // fill("blue");
  // textSize(10);
  // text(mouseX, 10, 15);
  // text(mouseY, 30, 15);
  
  // test.shapeColor = 'black';
  
  // text(score, 360, 15);
  textSize(15);
  text(score0() + score2, width/2, 15);
  text('highscore:' + score0() + highscore, width/2 - 200, 15);
}

function crash(){
  gamestate = 'end';
  dino.addAnimation('dino', dino2);
  // cloud.velocityX = 0;
  dino.velocityY = 0;
  ground.velocityX = 0;
  ground2.velocityX = 0;
  clouds.setVelocityXEach(0);
  cacti.setVelocityXEach(0);
  cacti.lifetimeEach = -1;
  gameover.visible = true;
  restart.visible = true;
  die.play();
  speed = 0;
}
  
function score0(){
  if (score2 < 10){
    return '0000';
  }
  else if (score2 >= 10 && score2 < 100){
    return '000';
  }
  else if(score2 >= 100 && score2 < 1000){
    return '00';
  }
  else if(score2 >= 1000 && score2 < 10000){
  return '0';
  }
  else{
    return null;
  }
}
  
function cloudandcacti(){
  if (frameCount % (Math.round(random(6, 10)) *10) == 0){
      cloud = createSprite(width + 50, random(50, height/4 + 50), 20, 20);
      cloud.addAnimation('cloud', cloud2);
      cloud.velocityX = -1 - speed;
      cloud.scale = 0.75;
      cloud.depth = 0.5;
      cloud.lifetime = width * 2;
      clouds.add(cloud);
    }
  
  if (frameCount % r == 0) {
      cactus = createSprite(width + 50, height/2 - 10, 20, 20);
      cactus.velocityX = ground.velocityX;
      cactus.lifetime = width/4;
    
      switch (r2){
        case 5: cactus.addAnimation('cactus1', cactus1); cactus.scale = 0.75; break
        case 6: cactus.addAnimation('cactus2', cactus2); cactus.scale = 0.75; break
        case 7: cactus.addAnimation('cactus3', cactus3); cactus.scale = 0.75; break
        case 8: cactus.addAnimation('cactus4', cactus4); cactus.scale = 0.5; break
        case 9: cactus.addAnimation('cactus5', cactus5); cactus.scale = 0.5; break
        case 10: cactus.addAnimation('cactus6', cactus6); cactus.scale = 0.5; break
        default: break
      }
      
        
      // cactus.debug = true;    
      cacti.add(cactus);
      // cactus.debug = true;    
    }
}
  
// Anay Nagar 2020