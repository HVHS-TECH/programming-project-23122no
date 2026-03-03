/*******************************************************/
// P5.play: game.js
// Run a space invaders style game
// Written by Nina
/*******************************************************/

let ENEMYWIDTH = 60;
let ENEMYHEIGHT = 40;

let VERTICALENEMYGAP = ENEMYHEIGHT;
let HORIZONTALENEMYGAP = ENEMYWIDTH;

let enemySpeed = 0.25;

let PLAYERSPEED = 6;

let BULLETSPEED = 8;

/*******************************************************/
// setup()
/*******************************************************/
function setup() {
	console.log("setup: ");
	cnv = new Canvas(windowWidth, windowHeight);

    bulletsGroup = new Group;
    enemyGroup = new Group;

    addPlayer();
    addEnemies();
    addWalls();

}

/*******************************************************/
// addEnemies()
/*******************************************************/
function addEnemies() {


    for (i = 1; i < 11; i++) {
        for (n = 0; n < 3; n++) {
            enemy = new Sprite(
                i*(ENEMYWIDTH + HORIZONTALENEMYGAP) + windowWidth/2 - (ENEMYWIDTH * 6 + HORIZONTALENEMYGAP * 4 + HORIZONTALENEMYGAP), 
                n*(ENEMYWIDTH + VERTICALENEMYGAP),
                ENEMYWIDTH, 
                ENEMYHEIGHT, 
                "k"
            );
            
            enemy.color = "green";
            enemyGroup.add(enemy);
        }
    }
     
    enemyGroup.vel.y = enemySpeed;
    enemyGroup.bounciness = 0;

    player.collides(enemyGroup, loseGame);

}

/*******************************************************/
// addPlayer()
/*******************************************************/
function addPlayer() {
	player = new Sprite(windowWidth/2, windowHeight/2 + 300, 25, "d");
    player.color = "blue"
}

/*******************************************************/
// loseGame()
/*******************************************************/
function loseGame() {
	console.log("you lost");
}

/*******************************************************/
// fireBullet()
/*******************************************************/
function fireBullet() {
    bullet = new Sprite(player.x, player.y, 10, "d");
    bullet.vel.y = -BULLETSPEED;
    bulletsGroup.add(bullet);
    bulletsGroup.collides(enemyGroup, enemyHit);
    bulletsGroup.collides(walls, wallsHit);
}

/*******************************************************/
// enemyHit()
/*******************************************************/
function enemyHit(_bullet, _enemy) {
    console.log("enemyHit");
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

    walls = new Group;

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

    if (enemy.y > windowHeight - 50) {
        loseGame();
    }

    if (kb.pressed ("space") && bulletsGroup.length < 3) {
        fireBullet();
    }

    if (enemyGroup.length = 0) {
        console.log("win");
    }

    player.vel.y = 0;
    player.y = windowHeight/2 + 300

    bulletsGroup.vel.x = 0;
 
}


/*******************************************************/
//  END OF APP
/*******************************************************/