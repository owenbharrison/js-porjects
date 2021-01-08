var database, currentUser, currentGame;
var canvas, chatbox;

var asteroidsGame = {ships:{},asteroids:[],stage:0};

var gameReady = false;

function setup(){
  canvas = createCanvas(600, 600).parent("#game-container");
  canvas.elt.addEventListener("keydown", e=>keys[e.keyCode]=!0);
  canvas.elt.addEventListener("keyup", e=>keys[e.keyCode]=!1);
  chatbox = createInput().position(5, 5).parent("#game-container");
  chatbox.input(e=>{
    database.ref("users/"+currentUser.uid+"/message").set(e.srcElement.value);
  });
  var firebaseConfig = {
    apiKey: "AIzaSyBS4143au1xcS5KAeHjz3fpm5hyjD3Az2A",
    authDomain: "onlinegame-4f4f4.firebaseapp.com",
    databaseURL: "https://onlinegame-4f4f4.firebaseio.com",
    projectId: "onlinegame-4f4f4",
    storageBucket: "onlinegame-4f4f4.appspot.com",
    messagingSenderId: "379297884324",
    appId: "1:379297884324:web:2cbb5f397803b37c0f5e31"
  };
  firebase.initializeApp(firebaseConfig);

  firebase.auth().onAuthStateChanged(user=>{
    if(user){
      currentUser = user;
      chatbox.show();
    }
    else{
      currentUser = null;
      chatbox.hide();
    }
  });
  database = firebase.database();
  database.ref().on('value', dataUpdated, e=>console.log(e));
}

function draw(){
  if(firebase.auth().currentUser){
    select("#userDisplay").html("Signed In As: "+firebase.auth().currentUser.email);
  }else{
    select("#userDisplay").html("Not Signed In");
  }
  if(gameReady&&currentUser){
    if(currentGame=="asteroids"){
      asteroidsDatabaseShow(asteroidsGame.ships, asteroidsGame.asteroids, asteroidsGame.stage);
      asteroidsDatabaseUpdate(asteroidsGame.ships[currentUser.uid], asteroidsGame.asteroids, asteroidsGame.stage);
    }
  }
}

function dataUpdated(rawdata){
  var data = rawdata.val();
  Object.keys(data.users).forEach(uid=>{
    if(currentUser&&currentUser.uid==uid){
      currentGame = data.users[uid].currentGame;
    }
  });
  if(currentGame=="asteroids"){
    var {playerdata, gamedata} = data.games.asteroids;
    Object.keys(playerdata).forEach(uid=>{
      asteroidsGame.ships[uid] = new Ship(playerdata[uid]);
      asteroidsGame.ships[uid].info = data.users[uid];
    });
    for(var j=0;j<gamedata.asteroids.length;j++){
      asteroidsGame.asteroids[j] = new Asteroid(gamedata.asteroids[j]);
    }
    asteroidsGame.stage = gamedata.stage;
  }
  gameReady = true;
}

function signUp(){
  var email = prompt("Sign Up\nEnter Email:");
  var password = prompt("Sign Up\nEnter Pass:");
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(err=>{
    if(err.code=="auth/email-already-in-use"){
      var ask = confirm("This email is already has an account.\nIf it is your account, press \"Ok\"\nIf not, press \"Cancel\" to make an account.");
      ask?logIn():signUp();
    }
  }).then(data=>{
    var info = {};
    info.name = prompt("What would you like your username to be?");
    info.message = "";
    var coltest = /(\d+),(\d+),(\d+)/;
    while(!coltest.test(info.col)){
      info.col=prompt("What color do you want your player to be? hint: r,g,b");
    }
    info.col = JSON.parse(info.col.replace(coltest, '{"r":"$1","g":"$2","b":"$3"}'));
    info.currentGame = "asteroids";
    database.ref("users/"+data.user.uid).set(info);
    database.ref("games/asteroids/playerdata/"+data.user.uid).set(new Ship(info).toRawData());
  });
}

function logIn(){
  var email = prompt("Log In\nEnter Email:");
  var password = prompt("Log In\nEnter Pass:");
  firebase.auth().signInWithEmailAndPassword(email, password).catch(e=>console.log(e.message));
}

function signOut(){
  firebase.auth().signOut();
}
