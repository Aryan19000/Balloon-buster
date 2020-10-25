var bow, bow_aim, back1, back2, back_back, arrow, arrow_aim;
var balloonsGroup;
var gball, bball, pball, rball;
var powerup1, powerup2, powerGroup1, powerGroup2;
var score, arrows_left, hp_left;
var invisibleWall

function preload(){
 bow_aim=loadImage("bow0.png")
 arrow_aim=loadImage("arrow0.png") 
 back_back=loadImage("background0.png"); 
 
  gball=loadImage("green_balloon0.png");      
  bball=loadImage("blue_balloon0.png");
  pball=loadImage("pink_balloon0.png");
  rball=loadImage("red_balloon0.png"); 
  
  powerup1=loadImage("delete(1).png");
  powerup2=loadImage("delete(2).png");
}

function setup() {
  createCanvas(400, 400);
  back1=createSprite(200, 200);
  back1.addImage(back_back);
  back2=createSprite(600, 200);
  back2.addImage(back_back);
  bow=createSprite(380, 200);
  bow.addImage(bow_aim);
  
  arrow=createSprite(360, 200);
  arrow.addImage(arrow_aim);
  arrow.scale=0.2;
  arrow.setCollider("rectangle", 0, 0, 250, 100);
  arrow.debug=true;
  
  invisibleWall=createSprite(337.5, 200, 10, 400);
  invisibleWall.visible=false;
  
  balloonsGroup=createGroup();
  powerGroup1=createGroup();
  powerGroup2=createGroup();
  
  score=0;
  arrows_left=25;
  hp_left=10;
}

function draw() {
  background("white");

//moving background
  if(back1.x<-200 && back2.x<200){
    back1.x=200;
    back2.x=600;
  }
  
  if(hp_left>0){
  back1.velocityX=-4;
  back2.velocityX=-4;
 
//moving bow and aiming arrows  
  bow.y=World.mouseY;
  
  if(arrow.x>350){
   arrow.y=bow.y;
  }
  if(keyDown("space")&&arrow.velocityX==0){
    arrow.velocityX=-15;
    arrows_left=arrows_left-1;
  }
  if(arrow.x<=-20){
    arrow.x=360;
    arrow.velocityX=0;
  }
//spawning balloons at random y positions
spawnBalloons(); 
  
//spawning power ups at random y positions
moreUp();
  
//spawning other power ups at random y positions
moreDown();
  
  if(arrow.isTouching(balloonsGroup)){
    balloonsGroup.destroyEach();
    arrow.x=360;
    arrow.velocityX=0;
    score=score+1;
  }
  
  if(arrow.isTouching(powerGroup1)){
    powerGroup1.destroyEach();
    arrow.x=360;
    arrow.velocityX=0;
    arrows_left=arrows_left+5;
  }
  
  if(arrow.isTouching(powerGroup2)){
    powerGroup2.destroyEach();
    arrow.x=360;
    arrow.velocityX=0;
    hp_left=hp_left+2;
  }
  
  if(balloonsGroup.isTouching(invisibleWall)){
    balloonsGroup.destroyEach();
    hp_left=hp_left-1;
  }else if(powerGroup1.isTouching(invisibleWall)){
    powerGroup1.destroyEach();
  }else if(powerGroup2.isTouching(invisibleWall)){
    powerGroup2.destroyEach();
  }
    if(arrows_left==0&&hp_left>0){
      hp_left=hp_left-1;
      arrows_left=arrows_left+5;
    }
  }
  
drawSprites();

if(hp_left==0){
  back1.velocityX=0;
  back2.velocityX=0;
  back1.depth=back2.depth;
  back2.depth=bow.depth;
  bow.depth=arrow.depth;
  arrow.depth=arrow.depth+1;
  arrow.y=bow.y;
  arrow.x=360;
  
  stroke("white");
  strokeWeight(4);
  textSize(40); 
  text("Game Over", 100, 200);
  text("(press 'r' to restart)", 30, 350);
  
  if(keyWentDown("r")){
    hp_left=10;
    arrow.y=360;
    arrows_left=25;
    score=0;
  }
}
  
for(var i=5; i<400; i=i+20){ 
  strokeWeight(4);
  stroke("white");
  line(332.5, i, 332.5, i+10);
}
  
//setting score
textSize(20);
text("Arrows left: "+arrows_left, 10, 20);
text("Score: "+score, 10, 50);
text("HP: "+hp_left, 200, 20); 
}

function spawnBalloons(){
  if(frameCount%50===0){
    var balloons=createSprite(-20, 50);
    balloons.y=Math.round(random(40, 360));
    balloons.velocityX=3.75;
    balloons.debug=true;
    var rNum=Math.round(random(1, 4));
    switch(rNum){
      case 1: balloons.addImage(gball);
              balloons.scale=0.075;
              balloons.setCollider("circle", 0, -112.5, 300);
              break;
      case 2: balloons.addImage(bball);
              balloons.scale=0.075;
              balloons.setCollider("circle", 0, -62.5, 250);
              break;
      case 3: balloons.addImage(pball);
              balloons.setCollider("circle", 0, -8.75, 22.5);
              break;
      case 4: balloons.addImage(rball);
              balloons.scale=0.075;
              balloons.setCollider("circle", 0, -112.5, 275);
              break;
      default: break;
    }
    balloonsGroup.add(balloons);
  }
}

function moreUp(){
  if(frameCount%Math.round(random(300, 600))===0){
    var powered=createSprite(-20, 50);
    powered.y=Math.round(random(40, 360));
    powered.velocityX=7.5;
    powered.addImage(powerup1);
    powered.scale=0.2;
    powered.debug=true;
    powered.setCollider("circle", 0, 0, 125);
    
    powerGroup1.add(powered);
  }
}

function moreDown(){
  if(frameCount%Math.round(random(500, 750))===0){
    var heal=createSprite(-20, 50);
    heal.y=Math.round(random(40, 360));
    heal.velocityX=6;
    heal.addImage(powerup2);
    heal.scale=0.4;
    heal.debug=true;
    heal.setCollider("circle", -2.5, 0, 50);
    
    powerGroup2.add(heal);
  }
}