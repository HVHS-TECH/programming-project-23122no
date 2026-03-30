/*******************************************************/
// P5.play: game.js
// Run a space invaders style game
// Written by Nina
/*******************************************************/

// Define variables
let bulletSpeed;
let playerSpeed;
let enemySpeed;

let gameRunning;
let enemyRound;
let score;

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

    // Reset variables
    gameRunning = true;
    enemyRound = 1;
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
    // Create a new sprite to be the player in the middle bottom of 
    // the screen
    playerSize = windowHeight / 25
    player = new Sprite(windowWidth / 2, windowHeight - 200, playerSize, "d");
    player.color = "#2c71ca"
    player.strokeWeight = 2;
}

/*******************************************************/
// addEnemies()
/*******************************************************/
function addEnemies() {

    // Define constants for enemy size based on window size
    const ENEMYWIDTH = windowWidth / 25;
    const ENEMYHEIGHT = windowHeight / 20;

    // Define variables
    let enemyNumber = 1;

    let playerSpeedEnemyNumber = floor(random(1, 30));
    let bulletSpeedEnemyNumber = floor(random(1, 30));

    // Create a set of numbers that will act as double point enemies
    let doublePointEnemyNumbers = new Set();

    // Add numbers into the set until there are 5
    while (doublePointEnemyNumbers.size < 5) {
        doublePointEnemyNumbers.add(floor(random(1, 30)));
    }

    // When any of the chosen numbers for enemies overlap, change the 
    // numbers until they are all unique
    while (doublePointEnemyNumbers.has(playerSpeedEnemyNumber) ||
        doublePointEnemyNumbers.has(bulletSpeedEnemyNumber) ||
        playerSpeedEnemyNumber == bulletSpeedEnemyNumber) {

        playerSpeedEnemyNumber = floor(random(1, 30));
        bulletSpeedEnemyNumber = floor(random(1, 30));
    }

    // Create a 10 by 3 grid of enemies
    // If the number of the enemy we're creating matches the number of the 
    // enemy that should have a powerup, then add it to the respective group
    for (i = 1; i < 11; i++) {
        for (n = 1; n < 4; n++) {
            enemy = new Sprite(
                i * (2 * ENEMYWIDTH) + windowWidth / 2 - (ENEMYWIDTH * 11),
                n * (2 * ENEMYHEIGHT),
                ENEMYWIDTH,
                ENEMYHEIGHT,
                "k"
            );

            if (enemyNumber == playerSpeedEnemyNumber) {
                playerSpeedEnemyGroup.add(enemy);
            } else if (enemyNumber == bulletSpeedEnemyNumber && enemyRound % 2 == 0) {
                bulletSpeedEnemyGroup.add(enemy);
            } else if (doublePointEnemyNumbers.has(enemyNumber)) {
                doublePointEnemyGroup.add(enemy);
            }

            enemyGroup.add(enemy);
            enemyNumber++;
        }
    }

    // Set the colours of the enemies depending on their type
    enemyGroup.color = "#5ea057"
    bulletSpeedEnemyGroup.color = "#276920"
    playerSpeedEnemyGroup.color = "#c1f0bc"
    doublePointEnemyGroup.color = "white"

    enemyGroup.strokeWeight = 2;

    // Move the enemies down the screen
    enemyGroup.vel.y = enemySpeed;

    // Check for collisions between enemies and player, lose the 
    // game if this occurs
    player.collides(enemyGroup, loseGame);
}

/*******************************************************/
// addWalls()
/*******************************************************/
function addWalls() {

    // Define the sizing of the walls
    const WALLWIDTH = windowWidth / 25;
    const WALLHEIGHT = windowHeight / 25;

    // Create walls around the outside of the screen and add them to a group

    wallLeft = new Sprite(0, height / 2, WALLWIDTH, height, 's');
    walls.add(wallLeft);

    wallRight = new Sprite(width, height / 2, WALLWIDTH, height, 's');
    walls.add(wallRight);

    wallTop = new Sprite(width / 2, 0, width, WALLHEIGHT, 's');
    walls.add(wallTop);

    wallBottom = new Sprite(width / 2, height, width, WALLHEIGHT, 's');
    walls.add(wallBottom);

    walls.strokeWeight = 0;
    walls.color = "white"
}

/*******************************************************/
// enemyHit()
/*******************************************************/
function enemyHit(_bullet, _enemy) {

    // If the enemy that was hit was the bullet speed powerup, speed up the bullets
    if (bulletSpeedEnemyGroup.includes(_enemy)) {
        bulletSpeed = bulletSpeed + windowHeight / 150;
    }

    // If the enemy that was hit was the player speed powerup, speed up the player
    if (playerSpeedEnemyGroup.includes(_enemy)) {
        playerSpeed = playerSpeed + windowHeight / 300;
    }

    // If the enemy that was hit was worth double points, add 2 to the score
    // Otherwise, add 1 to the score
    if (doublePointEnemyGroup.includes(_enemy)) {
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
    // Remove the bullet if it hits any of the walls
    _bullet.remove();
}

/*******************************************************/
// loseGame()
/*******************************************************/
function loseGame() {

    // Broadcast that the game has ended
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
    lose.textContent = "You reached round " + enemyRound + 
    " and earned " + score + " points.";
}

/*******************************************************/
// fireBullet()
/*******************************************************/
function fireBullet() {
    // Create a new bullet at the player's location
    bullet = new Sprite(player.x, player.y, windowWidth / 80, "d");
    bulletsGroup.add(bullet);
    bulletsGroup.color = "yellow";
    bulletsGroup.strokeWeight = 2;
}

/*******************************************************/
// writeScore()
/*******************************************************/
function writeScore() {
    textSize(windowWidth / 20);
    fill("white");
    textFont("Jua");
    text(score, windowWidth / 20, windowHeight - (windowHeight / 20));
}

/*******************************************************/
// draw()
/*******************************************************/
function draw() {
    background("lightblue");

    // Define constants
    const MAXBULLETS = 2;

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

    // Fire a bullet if the user presses space and there are less than 
    // three bullets already
    if (kb.pressed("space") && bulletsGroup.length < MAXBULLETS) {
        fireBullet();
    }

    // Lose the game if an enemy reaches the bottom of the screen
    if ((enemyGroup.some(enemy => enemy.y > windowHeight))) {
        loseGame();
    };

    // If the game isn't already running and the player presses r 
    // to restart, the game will start again
    if (gameRunning == false && kb.pressed('r')) {
        setup();
    }

    // If there are no enemies left and the game is running, add more 
    // enemies and increase their speed
    if ((enemyGroup.length <= 0) && gameRunning) {
        enemySpeed = enemySpeed + windowHeight / 4000;;
        bulletsGroup.deleteAll();
        enemyRound++;
        addEnemies();
    }

    // Prevent the player from changing from their position on the y axis
    player.y = windowHeight - windowHeight / 10;

    // Make sure the bullets vertically upwards
    bulletsGroup.vel.x = 0;
    bulletsGroup.vel.y = -bulletSpeed;

    // Show the score in the bottom left corner
    writeScore();

    allSprites.stroke = "#162d6d";
}

/*******************************************************/
//  END OF APP
/*******************************************************/