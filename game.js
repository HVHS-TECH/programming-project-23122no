/*******************************************************/
// P5.play: game.js
// Run a space invaders style game
// Written by Nina
/*******************************************************/

let ENEMYSIZE = 50;
let ENEMYGAP = 25;

//let ENEMYX = 1
let enemyY = ENEMYSIZE/2 + ENEMYGAP;
let ENEMYCOLOUR = "green"
let ENEMYSPEED = 0.5;

/*******************************************************/
// setup()
/*******************************************************/
function setup() {
	console.log("setup: ");
	cnv = new Canvas(windowWidth, windowHeight);

    addEnemies();

    addPlayer();


}

/*******************************************************/
// addEnemies()
/*******************************************************/
function addEnemies() {

    let enemyX = (windowWidth/2)// - (5*ENEMYSIZE + 4*ENEMYGAP + ENEMYGAP/2);
    console.log(enemyX);

	enemyGroup = new Group;

    for (i = 1; i < 11; i++) {
            for (n = 0; n < 3; n++) {
                enemy = new Sprite(i*(ENEMYSIZE + 25), enemyY, ENEMYSIZE, ENEMYSIZE, "k");
                enemy.color = ENEMYCOLOUR;
                enemyGroup.add(enemy);
                enemyY = enemyY + ENEMYSIZE + 25;
            }
        enemyX = enemyX + ENEMYSIZE + 25;
        enemyY = ENEMYSIZE/2 + 25;
    }

     
    enemyGroup.vel.y = ENEMYSPEED;

}

/*******************************************************/
// addPLayer()
/*******************************************************/
function addPlayer() {
	player = new Sprite(windowWidth/2, windowHeight/2 + 300, 20, "k");
    player.color = "blue"
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
        console.log("enemy reached");
    }

}


/*******************************************************/
//  END OF APP
/*******************************************************/