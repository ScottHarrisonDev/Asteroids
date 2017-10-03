function Player() {

	this.radius = 7; // Distance from each point to center
	this.pos = createVector(width/2, height/2);
	this.heading = 0;
	this.rotateSpeed = 0.1;
	this.maxSpeed = 4;
	this.velocity = createVector(0, 0);
	this.missiles = [];
	this.lives = 3;

	this.show = function() {
		push();
		stroke(255);
		fill(0);
		translate(this.pos.x, this.pos.y);
		rotate(this.heading);
		triangle(
			-this.radius,
			this.radius,
			this.radius,
			this.radius,
			0,
			-this.radius
		);
		pop();
	}

	this.move = function() {
		this.pos.add(this.velocity);
		if (keyIsDown(UP_ARROW)) {
			this.power();
		}
		if (keyIsDown(LEFT_ARROW)) {
			this.heading -= this.rotateSpeed;
		}
		if (keyIsDown(RIGHT_ARROW)) {
			this.heading += this.rotateSpeed;
		}
		if (this.pos.x > width + this.radius) {
			this.pos.x = -this.radius;
		}
		if (this.pos.x < -this.radius) {
			this.pos.x = width + this.radius;
		}
		if (this.pos.y > height + this.radius) {
			this.pos.y = -this.radius;
		}
		if (this.pos.y < -this.radius) {
			this.pos.y = height + this.radius;
		}
	}

	this.power = function() {
		var force = p5.Vector.fromAngle(this.heading - (PI / 2));
		force.mult(0.5);
		this.velocity.add(force);
		this.velocity.limit(this.maxSpeed);
	}

	this.shoot = function() {
		var missile = new Missile();
		missile.heading = this.heading - (PI / 2);
		this.missiles.push(missile);
	}

	this.removeLife = function() {
		this.lives--;
		this.reset();
	}

	this.reset = function() {
		this.pos.x = width / 2;
		this.pos.y = height / 2;
		this.velocity = createVector(0,0);
		this.heading = 0;
	}

}