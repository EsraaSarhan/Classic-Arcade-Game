// Enemies
var Enemy = function(sprite, x, y, movement) {
    //Char constructor
    Char.call(this, sprite, x, y);
    // enemy movement
    this.movement = movement;
};
// Characters
var Char = function(sprite, x, y) {
    this.sprite = sprite;
    this.x = x;
    this.y = y;
};
//Player
var Player = function(sprite, x, y, movement) {
    Char.call(this, sprite, x, y);
    // This sets the player to move at 50px
    this.movement = 50;
};

Char.prototype.render = function() {
    // calling the context from canvas to draw the sprite image
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Enemy prototype to inherit Char.prototype's methods
Enemy.prototype = Object.create(Char.prototype);
Enemy.prototype.constructor = Enemy;

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
// Remember: canvas.width = 505 | canvas.height = 606;

Enemy.prototype.update = function(dt) {
// You should multiply any movement by the dt parameter
// which will ensure the game runs at the same speed for
// all computers.
    if (this.x < 500){
        this.x += this.movement * dt;
    }
    else {
        //resets x direction off screen.
        //calculate a reset for this.
        this.x = -2;
        this.y = Math.random() * 184 + 50;
    }
    // Method to check if enemy and player collided or not
    checkCollision();
};

Player.prototype = Object.create(Char.prototype);
Player.prototype.constructor = Player;

// Use this update method later
// Player.prototype.update = function(dt) {
// };

//Input handler for player
Player.prototype.handleInput = function(e) {

    if (e === 'left' && this.x > 0){
        this.x -= this.movement;
    }
    else if (e === 'right' && this.x < 400){
        this.x += this.movement;
    }
    else if (e === 'up'){
        if (this.y < 40){

        this.reset(); // reset player

        //increase level and scrore
        level++;
        score += level * 2;
        increaseLevel(level);
        //change data on screen
        displayData();
        }
        else {
            this.y -= this.movement;
        }
    }
    else if (e === 'down' && this.y < 400){
        this.y += this.movement;
    }
};

// Player reset back to original position
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 400;
};




// Checking for collision
var checkCollision = function() {
    //If the player reachs enemy proximity by 40px in all directions, execute the following
    for (var i = 0; i < allEnemies.length; i++) {
        if (Math.abs(player.x - allEnemies[i].x) <= 80) {
            if (Math.abs(player.y - allEnemies[i].y) <= 80) { //Math.abs(-x) = x
                player.reset();
                decreaseLevel();
                displayData(); 
               
            }
        }
    }
};

//increase level
var increaseLevel = function(level) {
    allEnemies.length = 0;

    // new set of enemies for loop
    for (var i = 0; i < level; i++) {
        var enemy = new Enemy('images/enemy-bug.png', 0, Math.random() * 184 + 50, Math.random() * 256);
        allEnemies.push(enemy);
    }
    // Adding more enemy after level 5
    if (level > 5) {
        var enemy = new Enemy('images/enemy-bug.png', 0, Math.random() * 184 + 50, Math.random() * 256);
        allEnemies.push(enemy);
    }
};
//decreasing level, score and enemies number
var decreaseLevel = function() {
    if (allEnemies.length >= 1) {
        level--; 
        score--; 
        allEnemies.pop(enemy);
    }
}

// Display level, score and number of enemies
var displayData = function() {
    document.getElementById('score').innerHTML = 'Your Score is: ' + score.toString();
    document.getElementById('level').innerHTML = 'Level: ' + level.toString();
    document.getElementById('enemies').innerHTML = 'Enemies: ' + allEnemies.length.toString();
};

// Enemies storage place
var allEnemies = [];

// Instantiate a new player
var player = new Player('images/char-pink-girl.png', 200, 400);

// set score = 0 at beginig of GAME
var score = 0;

//  set Level = 1 at beginig of GAME
var level = 1;

// Instantiate one enemy in the beginning
var enemy = new Enemy('images/enemy-bug.png', -2, Math.random() * 184 + 50, Math.random() * 256);
allEnemies.push(enemy);

//displayData
displayData();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
