var player;
var asteroidLimit = 5;
var asteroids = [];

// User Defined Functions
function checkAsteroidsAreDead(asteroid) {
	return typeof asteroid === 'undefined';
}

function gameOver() {
	alert('game over');
	resetGame();
}

function winner() {
	alert('you win!');
	resetGame();
}

function resetGame() {
	player.reset();
	player.lives = 3;
	asteroids = [];
	player.missiles = [];
	generateAsteroids();
}

function generateAsteroids() {
	for (var i = 0; i < asteroidLimit; i++) {
		var asteroid = new Asteroid(i);
		asteroids.push(asteroid);
	}
}
// End User Defined Functions

function setup() {
	createCanvas(700, 450);
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
	if (player.lives === 0) {
		gameOver();
	}
	if (asteroids.every(checkAsteroidsAreDead)) {
		alert('you win');
		winner();
	}
	push();
	fill(255);
	textSize(24);
	text(player.lives, 40, 40);
	pop();
}

function keyPressed() {
	if (keyCode === 32) {
		player.shoot();
	}
}