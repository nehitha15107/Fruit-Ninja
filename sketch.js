var PLAY=1;
var END=0;
var gameState=1;

var sword,swordImage
var fruit , fruit1 , fruit2 , fruit3 , fruit4 , randomFruit
var monster , monsterImage
var gameOver , gameOverImage
var fruitGroup , enemyGroup;
var score


function preload(){
  
  swordImage = loadImage("sword.png");
  
  monsterImage = loadAnimation("alien1.png","alien2.png")
  
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  
  gameOverImage = loadImage("gameover.png")
  
}



function setup() {
  createCanvas(550, 500);
  
   sword=createSprite(40,200,20,20);
   sword.addImage(swordImage);
   sword.scale=0.9
  
  score=0;
  
  fruitGroup=createGroup();
  enemyGroup=createGroup();
  
  gameOver=createSprite(275,250,20,20);
  gameOver.addImage(gameOverImage);
  gameOver.scale=1.5;
  
}

function draw() {
  background("lavender");
  
  if(gameState===PLAY){
    
    fruits();
    Enemy();
    
    sword.y=World.mouseY;
    sword.x=World.mouseX;
  
    gameOver.visible = false;
    
    if(fruitGroup.isTouching(sword)){
      fruitGroup.destroyEach();
      score=score+1;
    }
    
    else
    {
      if(enemyGroup.isTouching(sword)){
        gameState=END;
        
        fruitGroup.destroyEach();
        enemyGroup.destroyEach();
        fruitGroup.setVelocityXEach(0);
        enemyGroup.setVelocityXEach(0);
        
        gameOver.visible=true;
      sword.destroy();
      }
    }
  }
  
  drawSprites();

  textSize(20);
  fill("black");
  text("Score : "+ score,437,30);
}


function Enemy(){
  if(World.frameCount%200===0){
    monster=createSprite(600,200,20,20);
    monster.addAnimation("moving", monsterImage);
    monster.y=Math.round(random(100,300));
    monster.velocityX=-8;
    monster.setLifetime=50;
    monster.scale = 0.990;
    
    enemyGroup.add(monster);
  }
}

function fruits(){
  if(World.frameCount%80===0){
    fruit=createSprite(600,200,20,20);
    fruit.scale=0.3;
     //fruit.debug=true;
     r=Math.round(random(1,4));
    if (r == 1) {
      fruit.addImage(fruit1);
    } else if (r == 2) {
      fruit.addImage(fruit2);
    } else if (r == 3) {
      fruit.addImage(fruit3);
    } else {
      fruit.addImage(fruit4);
    }
    
    fruit.y=Math.round(random(50,340));
   
    fruit.velocityX=-7;
    fruit.setLifetime=500;
    
    fruitGroup.add(fruit);
  }
}