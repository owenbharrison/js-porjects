class Agar{

}

class Food{

}



function asteroidsDatabaseShow(ships, asteroids, stage){

}

function asteroidsDatabaseUpdate(ship, asteroids, stage){
  database.ref("games/asteroids/gamedata/stage").set(stage);
  database.ref("games/asteroids/gamedata/asteroids").set(asteroids.map(a=>a.toRawData()));
  database.ref("games/asteroids/playerdata/"+currentUser.uid).set(ship.toRawData());
}
