var database;
var gameState = 0;
var playerCount;
var allPlayers;
var form, game, player;
var car1, car2, car3, car4;
var cars;
var car1_img, car2_img, car3_img, car4_img;
var gold_img, silver_img, bronze_img;
var track_img;
var finishedPlayers = 0;
var reachedFinishPoint;

function preload(){
  car1_img = loadImage("images/car1.png");
  car2_img = loadImage("images/car2.png");
  car3_img = loadImage("images/car3.png");
  car4_img = loadImage("images/car4.png");
  track_img = loadImage("images/track.jpg");
  gold_img = loadImage("images/gold.png");
  silver_img = loadImage("images/silver.png");
  bronze_img = loadImage("images/bronze.png");
}
function setup(){
    createCanvas(displayWidth - 10, displayHeight - 30);
    database = firebase.database();
    game = new Game();
    game.getState();
    game.start();
}

function draw(){
  if(playerCount === 4 && finishedPlayers === 0){
     game.update(1);
  }
  if(gameState === 1){
     clear(); 
     game.play();
  }
  if(finishedPlayers === 4){
     gameState = 2;
  }
  if(gameState === 2){
    game.displayRank();
  }
}