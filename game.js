/*******************************************************/
// P5.play: game.js
// Run a space invaders style game
// Written by Nina
/*******************************************************/

let ENEMYSIZE = 50;
let ENEMYGAP = 25;
let ENEMYCOLOUR = "green"
let ENEMYSPEED = 0.5;

let bulletShot = false;

/*******************************************************/
// setup()
/*******************************************************/
function setup() {
	console.log("setup: ");
	cnv = new Canvas(windowWidth, windowHeight);

    addPlayer();
    addEnemies();
    addWalls();

}

/*******************************************************/
// addEnemies()
/*******************************************************/
function addEnemies() {

	enemyGroup = new Group;

    for (i = 1; i < 11; i++) {
            for (n = 0; n < 3; n++) {
                enemy = new Sprite(i*(ENEMYSIZE + 25), n*(ENEMYSIZE + 25), ENEMYSIZE, ENEMYSIZE, "k");
                enemy.color = ENEMYCOLOUR;
                enemy.bounciness = 0;
                enemyGroup.add(enemy);
            }
    }
     
    enemyGroup.vel.y = ENEMYSPEED;

    player.collides(enemyGroup, loseGame);

}

/*******************************************************/
// addPlayer()
/*******************************************************/
function addPlayer() {
	player = new Sprite(windowWidth/2, windowHeight/2 + 300, 25, "k");
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
    bullet.bounciness = 0;
    bullet.vel.y = -5;
    bulletShot = true;
    bullet.collides(enemyGroup, bulletHit);
}

/*******************************************************/
// bulletHit()
/*******************************************************/
function bulletHit() {
    console.log("bullet hit");
}

/*******************************************************/
// addWalls()
/*******************************************************/

function addWalls() {

    walls = new Group;

	wallLH  = new Sprite(0, height/2, 40, height, 'k');
	wallLH.bounciness = 0;
    wallLH.color = "white";
    walls.add(wallLH);


	wallRH  = new Sprite(width, height/2, 40, height, 'k');
	wallRH.bounciness = 0;
    wallRH.color = "white";
    walls.add(wallRH);

	wallTop  = new Sprite(width/2, 0, width, 40, 'k');
	wallTop.bounciness = 0;
    wallTop.color = "white";
    walls.add(wallTop);

	wallBot  = new Sprite(width/2, height, width, 40, 'k');
	wallBot.bounciness = 0;
    wallBot.color = "white";
    walls.add(wallBot);

}

/*******************************************************/
// draw()
/*******************************************************/
function draw() {
	background('lightblue');

    if (kb.pressing('left')) {

		player.velocity.x = -5;

	} else if (kb.pressing ('right')) {
		
		player.velocity.x = 5;
	};

	if (kb.released('left')) {

		player.velocity.x = 0;
	
	} else if (kb.released('right')) {
		player.velocity.x = 0;
	}

    if (enemy.y > windowHeight - 50) {
        loseGame();
    }

    if (kb.pressed ("space") && bulletShot == false) {
        console.log("space pressed");
        fireBullet();
    }
 
}


/*******************************************************/
//  END OF APP
/*******************************************************/