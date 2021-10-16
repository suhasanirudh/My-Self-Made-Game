var astroid, astroidImg; 
var life,lifeImg; 
var restart, restartImg;
var rocket, rocketImg;
var space, spaceImg;  
var gameOver, gameOverImg; 
var astroidsGroup;
var GAMESTATE = "play" 
var score;
totalLives = 3; 


function preload () {

  astroidImg = loadImage ('./IMAGES/asteroid.png');
  lifeImg  =  loadImage ('./IMAGES/life.png');
  //restartImg = loadImage ('./IMAGES/restart.png');
  rocketImg = loadImage ('./IMAGES/rocket2.png');
  spaceImg = loadImage ('./IMAGES/space.jpg');

}

function setup () {

  createCanvas (1000,1000);

  

  space = createSprite (500,500);
  space.addImage ("space", spaceImg);
  space.scale = 1.2
  space.velocityY = 3;

  astroid = createSprite (200,200,50,50);
  astroid.addImage("astroid",astroidImg);
  astroid.scale = 0.2

  rocket = createSprite  (200,200,65,65);
  rocket.addImage  ("rocket", rocketImg); 
  rocket.scale = 0.4

  life = createSprite (100,200,65,65);
  life.addImage ("life",lifeImg); 
  life.scale = 0.1
  

  astroidsGroup = new Group ();
  lifeGroup = new Group (); 




}

function draw () {

  background (0);

  if (GAMESTATE === "play") {

    score = score + Math.round(getFrameRate()/100); 

    if (keyDown("w")) {
      rocket.velocityY = -10 
    }

    if (keyDown("d")) {
      rocket.velocityX = +3
    }

    if (keyDown("a")) {
      rocket.velocityX = -3
    }

    //rocket.velocityY = rocket.velocityY + 0.3;
  }

  if (space.y > 600) {
    space.y = 500;
  }


  if (astroidsGroup.isTouching(rocket) || rocket.y > 400) {
    totalLives -= 1;
  }

  if (totalLives === 0) {
    GAMESTATE = "end"
    rocket.destroy ();
    astroidsGroup.destroyEach ();
    lifeGroup.destroyEach ();
  }




  rocket.setCollider ("rectangle",0,0,190,250);
  rocket.debug = false;





  drawSprites ();

  if (GAMESTATE === "end") {
    background(0)
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text ("Game Over",200,300)
    astroidsGroup.destroyEach ();
  }
}

function spawnAstroids () {
  if (frameCount % 90 === 0) {
    astroid = createSpriteprite (200,-50) 
    astroid.velocityY = 4;
    astroid.x = Math.round(random(120,400));
    astroidsGroup.add(astroid); 
  }
}

function spawnLives () {
  if (frameCount % 150 === 0) {
    life = createSprite (200,-50); 
    life.velocityY = 7;
    life.x = Math.round(random(120,400));
    lifeGroup.add(life);
  }
}