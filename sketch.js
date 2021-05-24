var balloon,balloonImage1,balloonImage2;
// create database and position variable here
var database, pos;

function preload(){

  bg =loadImage("cityImage.png");
  balloonImage1=loadAnimation("hotairballoon1.png");
  balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
  "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
  "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
}

//Function to set initial environment
function setup() {
  database = firebase.database();
  createCanvas(1500,700);

  var dbref = database.ref("balloon/pos");
  dbref.on("value", readData);

  balloon=createSprite(250,450,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;

  textSize(20); 
}

function readData(data) {

  pos = data.val();

}

// function to display UI
function draw() {
  background(bg);

  if (pos !== undefined) {

    balloon.x = pos.x;
    balloon.y = pos.y;

  }

  if(keyDown(LEFT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in left direction
    updatePos(-2, 0);
  }
  else if(keyDown(RIGHT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in right direction
    updatePos(2, 0);
  }
  else if(keyDown(UP_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in up direction
    updatePos(0, -2);
  }
  else if(keyDown(DOWN_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in down direction
    updatePos(0, 2);
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}

function updatePos(x,y) {

  database.ref("balloon/pos").update({

    'x': pos.x + x,
    'y': pos.y + y

  });

}
