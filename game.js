/*******************************************************/
// P5.play: game.js
// Run a space invaders style game
// Written by Nina
/*******************************************************/

// Define constants

let ENEMYWIDTH = 50;
let ENEMYHEIGHT = 40;

let VERTICALENEMYGAP = ENEMYHEIGHT ;
let HORIZONTALENEMYGAP = ENEMYWIDTH;

let PLAYERSPEED = 8;
let BULLETSPEED = 10;

// Define variables

let enemySpeed = 5;
let score = 0;

/*******************************************************/
// setup()
/*******************************************************/
function setup() {
	console.log("setup: ");

    // Create a canvas
	cnv = new Canvas(windowWidth, windowHeight);

    // Define groups
    bulletsGroup = new Group;
    enemyGroup = new Group;
    walls = new Group;

    // Trigger respective functions when collisions occur
    bulletsGroup.collides(enemyGroup, enemyHit);
    bulletsGroup.collides(walls, wallsHit);

    // Add the game components
    addPlayer();
    addEnemies();
    addWalls();

}

/*******************************************************/
// addEnemies()
/*******************************************************/
function addEnemies() {

    lose.display = "none";

    for (i = 1; i < 11; i++) {
        for (n = 1; n < 4; n++) {
            enemy = new Sprite(
                i*(ENEMYWIDTH + HORIZONTALENEMYGAP) + windowWidth/2 - (ENEMYWIDTH * 6 + HORIZONTALENEMYGAP * 4 + HORIZONTALENEMYGAP), 
                n*(ENEMYWIDTH + VERTICALENEMYGAP),
                ENEMYWIDTH, 
                ENEMYHEIGHT, 
                "k"
            );
            
            enemy.color = "green";
            enemy.strokeWeight = 2;
            enemyGroup.add(enemy);
        }
    }

    console.log("Enemies added = " + enemyGroup.length);
     
    enemyGroup.vel.y = enemySpeed;
    //enemyGroup.vel.x = enemySpeed/2;

    player.collides(enemyGroup, loseGame);

}

/*******************************************************/
// addPlayer()
/*******************************************************/
function addPlayer() {
	player = new Sprite(windowWidth/2, windowHeight - 200, 25, "d");
    player.color = "blue"
    player.strokeWeight= 2;
}

/*******************************************************/
// loseGame()
/*******************************************************/
function loseGame() {
	console.log("you lost");
    //window.location.href = "index.html";
    cnv.remove();
    lose.textContent = "You lost! You killed " + score + " enemies.";
}

/*******************************************************/
// fireBullet()
/*******************************************************/
function fireBullet() {
    bullet = new Sprite(player.x, player.y, 10, "d");
    bullet.vel.y = -BULLETSPEED;
    bullet.color = "yellow";
    bullet.strokeWeight = 2;
    bulletsGroup.add(bullet);
}

/*******************************************************/
// enemyHit()
/*******************************************************/
function enemyHit(_bullet, _enemy) {
    console.log("enemyHit");
    score++;
    console.log(score);
    _bullet.remove();
    _enemy.remove();
}

/*******************************************************/
// wallsHit()
/*******************************************************/
function wallsHit(_bullet) {
    _bullet.remove();
}


/*******************************************************/
// addWalls()
/*******************************************************/

function addWalls() {

	wallLH  = new Sprite(0, height/2, 40, height, 's');
    wallLH.color = "white";
    walls.add(wallLH);


	wallRH  = new Sprite(width, height/2, 40, height, 's');
    wallRH.color = "white";
    walls.add(wallRH);

	wallTop  = new Sprite(width/2, 0, width, 40, 's');
    wallTop.color = "white";
    walls.add(wallTop);

	wallBot  = new Sprite(width/2, height, width, 40, 's');
    wallBot.color = "white";
    walls.add(wallBot);

    walls.strokeWeight = 0;
    walls.bounciness = 0;

}

/*******************************************************/
// draw()
/*******************************************************/
function draw() {
	background('lightblue');

    if (kb.pressing('left')) {

		player.velocity.x = -PLAYERSPEED;

	} else if (kb.pressing ('right')) {
		
		player.velocity.x = PLAYERSPEED;
	};

	if (kb.released('left')) {

		player.velocity.x = 0;
	
	} else if (kb.released('right')) {

		player.velocity.x = 0;

	}

    if (enemy.y >= windowHeight) {
        loseGame();
    }

    /*******************
    if (enemy.x > windowWidth - 100) {
        enemyGroup.vel.x = -enemySpeed;
    }

    if (enemy.x > 100) {
        enemyGroup.vel.x = enemySpeed;
    }
    *******************/

    if (kb.pressed ("space") && bulletsGroup.length < 3) {
        fireBullet();
    }

    if (enemyGroup.length <= 0) {
        enemySpeed = enemySpeed  + 0.25;
        addEnemies();
    }

    player.vel.y = 0;
    player.y = windowHeight - 200;

    bulletsGroup.vel.x = 0;
    bulletsGroup.vel.y = -BULLETSPEED;

    textSize(64);
    fill("blue");
    textFont("Arial");
    text(score, 50, windowHeight - 50);
 
}


/*******************************************************/
//  END OF APP
/*******************************************************/