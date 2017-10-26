var player;
var asteroidLimit = 5;
var asteroids = [];
var fontFamily;
var paused = false;

// User Defined Functions
function checkAsteroidsAreDead(asteroid) {
	return typeof asteroid === 'undefined';
}

function gameOver() {
	push();
	fill(255);
	textAlign(CENTER);
	text("Game Over", width / 2, height / 4);
	textSize(18);
	text("Press [space] to reset game", width / 2, height / 2);
	pop();
	paused = true;
}

function winner() {
	push();
	fill(255);
	textAlign(CENTER);
	text("You Won!", width / 2, height / 4);
	textSize(18);
	text("Press [space] to reset game", width / 2, height / 2);
	pop();
	paused = true;
}

function resetGame() {
	player.reset();
	player.lives = 3;
	asteroids = [];
	player.missiles = [];
	generateAsteroids();
	paused = false;
}

function generateAsteroids() {
	for (var i = 0; i < asteroidLimit; i++) {
		var asteroid = new Asteroid(i);
		asteroids.push(asteroid);
	}
}
// End User Defined Functions

function preload() {
	fontFamily = loadFont('assets/font/PressStart2P-Regular.ttf');
}

function setup() {
	createCanvas(window.innerWidth, window.innerHeight);
	textSize(24);
	textFont(fontFamily);
	player = new Player();
	generateAsteroids();
}

function draw() {
	background(0);
	for (var i = 0; i < player.missiles.length; i++) {
		player.missiles[i].show();
		player.missiles[i].move();
	}
	player.show();
	player.move();
	for (var i = 0; i < asteroids.length; i++) {
		if (typeof asteroids[i] !== 'undefined') {
			asteroids[i].show();
			asteroids[i].move();
			asteroids[i].crash(player);
			for (var ii = 0; ii < player.missiles.length; ii++) {
				if (typeof asteroids[i] !== 'undefined' && asteroids[i].hit(player.missiles[ii])) {
					player.missiles.splice(ii, 1);
				}
			}
		}
	}
	if (asteroids.every(checkAsteroidsAreDead) && player.lives > 0) {
		winner();
	}
	if (player.lives === 0) {
		gameOver();
	}
	if ( ! paused) {
		push();
		fill(255);
		text(player.lives, 40, 40);
		pop();
	} else {
		asteroids = [];
	}
}

function keyPressed() {
	if (keyCode === 32) {
		if (paused) {
			resetGame();
		} else {
			player.shoot();
		}
	}
}