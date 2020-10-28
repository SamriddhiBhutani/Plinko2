var Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies;
 
var particles = [];
var plinkos = [];
var divisions = [];

var divisionHeight=300;
var score = 0;
var count = 0;
var particle;
var gameState = "play";
function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2,height,width,20);


   for (var k = 0; k <=width; k = k + 80) {
     divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
   }


    for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,75));
    }

    for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,175));
    }

     for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,275));
    }

     for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,375));
    }   
}

function draw() {
  background("black");
  textSize(20)
  text("Score : "+score,20,30);

  if (particle != null) {
    particle.display();
    if(particle.body.position.y > 760 && particle.body.position.x > 0 && particle.body.position.x < 800){
      if(particle.body.position.x <= 240){
        score += 500;
        particle = null;
      }
      else if(particle.body.position.x < 600){
        score += 100;
        particle = null;
      }
      else{
        score += 200;
        particle = null;
      }
      count ++;
    }
  }

  if(count >= 5) {
    gameState = "end";
    textSize(60);
  fill("red")
  text("GAME OVER",200,250);
  textSize(30);
  fill("white");
  text("Your Score: " + score, 250,350);
  }

  Engine.update(engine);
 
  
   for (var i = 0; i < plinkos.length; i++) {
     
     plinkos[i].display();
     
   }
   if(frameCount%60===0){
     particles.push(new Particle(random(width/2-30, width/2+30), 10,10));
     score++;
   }
 
  for (var j = 0; j < particles.length; j++) {
   
     particles[j].display();
   }
   for (var k = 0; k < divisions.length; k++) {
     
     divisions[k].display();
   }
}

function mousePressed(){
  if(gameState !== "end"){
    count++;
    particle = new Particle (mouseX,10,10,10);
  }
}