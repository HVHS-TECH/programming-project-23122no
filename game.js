/*******************************************************/
// P5.play: game.js
// Run a space invaders style game
// Written by Nina
/*******************************************************/

// Define variables
let bulletSpeed = 10;
let playerSpeed = 4;
let enemySpeed = 0.25;

let enemyRound = 2;
let bulletAmount = 1;
let gameRunning = true;
let score = 0;

// Define constants
const MAXBULLETS = 3;

/*******************************************************/
// preload()
/*******************************************************/
function preload() {
    backgroundImage = loadImage("images/background.png");
    playerImage = loadImage("images/player_image.png");
}

/*******************************************************/
// setup()
/*******************************************************/
function setup() {
    console.log("setup: ");

    // Create a canvas
    cnv = new Canvas(windowWidth, windowHeight);

    // Define groups
    bulletsGroup = new Group;
    walls = new Group;
    enemyGroup = new Group;

    playerSpeedEnemyGroup = new Group;
    bulletSpeedEnemyGroup = new Group;
    doublePointEnemyGroup = new Group;

    // Update variables
    gameRunning = true;
    score = 0;

    // Set enemy sizing to be proportional to the window size
    enemySpeed = windowHeight / 2000;
    playerSpeed = windowWidth / 300;
    bulletSpeed = windowHeight / 100;

    // Add the game components
    addPlayer();
    addEnemies();
    addWalls();

    // Trigger respective functions when collisions occur with bullets
    bulletsGroup.collides(walls, wallsHit);
    bulletsGroup.collides(enemyGroup, enemyHit);

    // Hide the end screen
    ended.style.display = "none";
}

/*******************************************************/
// addPlayer()
/*******************************************************/
function addPlayer() {
    // Create a new sprite to be the player in the middle bottom of the screen
    playerSize = windowHeight / 25
    player = new Sprite(windowWidth / 2, windowHeight - 200, playerSize, "d");
    //player.color = "blue"
    player.strokeWeight = 2;
    player.img = (playerImage);
    playerImage.resize(playerSize, playerSize);
}

/*******************************************************/
// addEnemies()
/*******************************************************/
function addEnemies() {

    const ENEMYWIDTH = windowWidth / 25;
    const ENEMYHEIGHT = windowHeight / 20;

    let enemyNumber = 0;

    let playerSpeedEnemyNumber = floor(random(0, 30));
    let bulletSpeedEnemyNumber = floor(random(0, 30));

    let doublePointEnemyNumbers = new Set();

    while (doublePointEnemyNumbers.size < 5) {
        doublePointEnemyNumbers.add(floor(random(0, 30)));
    }

    while (doublePointEnemyNumbers.has(playerSpeedEnemyNumber || bulletSpeedEnemyNumber) ||
        playerSpeedEnemyNumber == bulletSpeedEnemyNumber){

        playerSpeedEnemyNumber = floor(random(0, 30));
        bulletSpeedEnemyNumber = floor(random(0, 30));

    }

    // Create a 10 by 3 grid of enemies
    for (i = 1; i < 11; i++) {
        for (n = 1; n < 4; n++) {

            enemy = new Sprite(
                i * (2 * ENEMYWIDTH) + windowWidth / 2 - (ENEMYWIDTH * 11),
                n * (2 * ENEMYHEIGHT),
                ENEMYWIDTH,
                ENEMYHEIGHT,
                "k"
            );
            enemy.color = "#5ea057"

            if (enemyNumber == playerSpeedEnemyNumber) {
                playerSpeedEnemyGroup.add(enemy);
                enemy.color = "#c1f0bc"
            } else if (enemyNumber == bulletSpeedEnemyNumber) {
                bulletSpeedEnemyGroup.add(enemy);
                enemy.color = "#174e11"
            } else if (doublePointEnemyNumbers.has(enemyNumber)) {
                doublePointEnemyGroup.add(enemy);
                enemy.color = "white"
            }

            enemyGroup.add(enemy);
            enemyNumber++;
        }
    }

    enemyGroup.vel.y = enemySpeed;
    //enemyGroup.vel.x = enemySpeed * 1.5;

    enemyGroup.strokeWeight = 2;

    // Check for collisions between enemies and player, lose the game if this occurs
    player.collides(enemyGroup, loseGame);
}

/*******************************************************/
// addWalls()
/*******************************************************/

function addWalls() {

    // Create walls around the outside of the screen

    const WALLSIZE = 20;

    wallLeft = new Sprite(0, height / 2, WALLSIZE, height, 's');
    wallLeft.color = "white";
    walls.add(wallLeft);

    wallRight = new Sprite(width, height / 2, WALLSIZE, height, 's');
    wallRight.color = "white";
    walls.add(wallRight);

    wallTop = new Sprite(width / 2, 0, width, WALLSIZE, 's');
    wallTop.color = "white";
    walls.add(wallTop);

    wallBottom = new Sprite(width / 2, height, width, WALLSIZE, 's');
    wallBottom.color = "white";
    walls.add(wallBottom);

    walls.strokeWeight = 0;

}

/*******************************************************/
// enemyHit()
/*******************************************************/
function enemyHit(_bullet, _enemy) {

    if (bulletSpeedEnemyGroup.includes(_enemy)) {
        bulletSpeed = bulletSpeed + windowHeight / 75;
    }

    if (playerSpeedEnemyGroup.includes(_enemy)) {
        playerSpeed = playerSpeed + windowHeight / 250;
    }

    if (doublePointEnemyGroup.includes(_enemy)) {
        console.log("hit double point");
        score = score + 2;
    } else {
        score++;
    }

    // Remove the enemy and bullet that collided with each other
    _bullet.remove();
    _enemy.remove();
}

/*******************************************************/
// wallsHit()
/*******************************************************/
function wallsHit(_bullet) {
    // Remove the button if it hits any of the walls
    _bullet.remove();
}

/*******************************************************/
// loseGame()
/*******************************************************/
function loseGame() {
    console.log("you lost");

    gameRunning = false;

    // Delete all sprites within the enemy and bullet groups
    enemyGroup.deleteAll();
    bulletsGroup.deleteAll();

    // Remove the player, walls and canvas
    player.remove();
    walls.remove();
    cnv.remove();


    // Show the end screen and update its text
    ended.style.display = "block";
    lose.textContent = "You killed " + score + " enemies.";
}

/*******************************************************/
// fireBullet()
/*******************************************************/
function fireBullet() {
    // Create a new bullet where the player is
    bullet = new Sprite(player.x, player.y, windowWidth / 80, "d");
    bulletsGroup.add(bullet);
    bulletsGroup.color = "yellow";
    bulletsGroup.strokeWeight = 2;
}

/*******************************************************/
// draw()
/*******************************************************/
function draw() {
    background(backgroundImage);

    // Allow the player to move using arrow keys

    if (kb.pressing('left')) {

        player.velocity.x = -playerSpeed;

    } else if (kb.pressing('right')) {

        player.velocity.x = playerSpeed;

    };

    if (kb.released('left')) {

        player.velocity.x = 0;

    } else if (kb.released('right')) {

        player.velocity.x = 0;

    };

    // Lose the game if an enemy reaches the bottom of the screen
    if ((enemyGroup.some(enemy => enemy.y > windowHeight)) || kb.pressed("k")) {
        loseGame();
    };

    // Fire a bullet if the user presses space and there are less than three bullets already
    if (kb.pressed("space") && bulletsGroup.length < MAXBULLETS) {
        fireBullet();
    }

    // If there are no enemies left and the game is running, add more enemies and increase speed
    if ((enemyGroup.length <= 0) && gameRunning) {
        enemySpeed = enemySpeed + windowHeight / 4000;;
        bulletsGroup.deleteAll();
        enemyRound++;
        addEnemies();
    }

    /**************************************************
    if (enemyGroup.some(enemy => enemy.x > windowWidth - windowWidth/15)) {
        enemyGroup.vel.x = -enemySpeed * 1.5;
    };

    if (enemyGroup.some(enemy => enemy.x < windowWidth/15)) {
        enemyGroup.vel.x = enemySpeed * 1.5;
    };
    **************************************************/

    // Prevent the player from changing from their position on the y axis
    player.vel.y = 0;
    player.y = windowHeight - windowHeight / 10;

    // Always move the bullets vertically upwards
    bulletsGroup.vel.x = 0;
    bulletsGroup.vel.y = -bulletSpeed;

    // Show the score in the bottom left corner
    textSize(windowWidth / 20);
    fill("blue");
    textFont("Arial");
    text(score, 50, windowHeight - 50);

    if (gameRunning == false && kb.pressed('r')) {
        setup();
    }

}

/*******************************************************/
//  END OF APP
/*******************************************************/