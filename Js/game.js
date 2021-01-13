class Game{
    constructor(){}
    
  getState(){
   var gameStateRef = database.ref('gameState');
   gameStateRef.on('value', (data) => {
   gameState = data.val();
   });
  }

  update(state){
   database.ref('/').update({
    gameState: state
   });
  }
   async start(){
     if(gameState === 0){
        player = new Player();
        var playerCountRef = await database.ref('playerCount').once('value');
        if(playerCountRef.exists()){
           playerCount = playerCountRef.val();
           player.getCount();
        }
        form = new Form();
        form.display();
     }

     car1 = createSprite(100, 200);
     car1.addImage(car1_img);
     car2 = createSprite(300, 200);
     car2.addImage(car2_img);
     car3 = createSprite(500, 200);
     car3.addImage(car3_img);
     car4 = createSprite(700, 200);
     car4.addImage(car4_img);
     cars = [car1, car2, car3, car4]

     reachedFinishPoint = false;
   }

   play(){
    form.hide();
    Player.getPlayerInfo();
    player.getFinishedPlayers();
    if(allPlayers !== undefined){
       background(90);
       image(track_img, 0, -displayHeight*4, displayWidth, displayHeight*5);
       var index = 0;
       var x = 190;
       var y;
       for(var plr in allPlayers){
         index = index + 1;
         x = x + 220;
         y = displayHeight - allPlayers[plr].distance;
         cars[index - 1].x = x;
         cars[index - 1].y = y;
         if(index === player.index){
            stroke(10);
            fill("red");
            ellipse(x, y, 80, 80);
            camera.position.x = displayWidth/2
            camera.position.y = cars[index - 1].y;
         }
         textSize(30);
         textAlign(CENTER);
         fill("yellow");
         text(allPlayers [plr].name, cars[index - 1].x, cars[index - 1].y + 80);
       }
    }

   if(keyDown(UP_ARROW) && player.index !== null && reachedFinishPoint !== true){
      player.distance += 10
      player.update();
   }

   if(player.distance > 4300 && reachedFinishPoint === false){
      reachedFinishPoint = true;
      Player.updateFinishedPlayers();
      player.rank = finishedPlayers;
      player.update();
   }
   drawSprites();
  }

 displayRank(){
   camera.position.x = 0;
   camera.position.y = 0;
   Player.getPlayerInfo();

   imageMode(CENTER);
   image(bronze_img, -displayWidth/4, displayHeight/9-100, 200, 240);
   image(silver_img, displayWidth/4, displayHeight/10-100, 225, 270)
   image(gold_img, 0, -100, 250, 300);
   textAlign(CENTER);
   textSize(50);
   fill("yellow");

   for(var plr in allPlayers){
      if(allPlayers[plr].rank === 1){
         text("1st: " + allPlayers[plr].name, 0, 85);
      }else if(allPlayers[plr].rank === 2){
       text("2nd: " + allPlayers[plr].name, displayWidth/4, displayHeight/10+75);
      }else if(allPlayers[plr].rank === 3){
       text("3rd: " + allPlayers[plr].name, -displayWidth/4, displayHeight/9+72);
      }else{
       textSize(30);
       text("Better luck next time " + allPlayer[plr].name, 0, 255);
      }
   }
 }
}