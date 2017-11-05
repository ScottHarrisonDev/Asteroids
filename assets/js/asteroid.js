function Asteroid(element) {

	this.element = element;
	this.x = random(0, width+1); // +1 as random() does not include max number
	this.y = random(0, height+1); // +1 as random() does not include max number
	this.radius = random([5, 20, 35, 50]);
	this.pos = createVector(this.x,this.y);
	this.velocity = createVector(random(-1,2), random(-1,2)).limit(1);
	this.isColliding = 0;
	this.points = floor(random(5, 15));
	this.offset = [];
	for (var i = 0; i < this.points; i++) {
		this.offset[i] = random(-this.radius * 0.1, this.radius * 0.1);
	}

	this.show = function() {
		push();
		stroke(255);
		translate(this.pos.x, this.pos.y);
		beginShape();
		for (var i = 0; i < this.points; i++) {
			var angle = map(i, 0, this.points, 0, TWO_PI);
			var r = this.radius + this.offset[i];
			var x = r * cos(angle);
			var y = r * sin(angle);
			vertex(x, y);
		}
		endShape(CLOSE);
		pop();
	}

	this.move = function() {
		this.pos.add(this.velocity);
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

	this.crash = function(target) {
		if (dist(this.pos.x,this.pos.y,target.pos.x, target.pos.y) < (target.radius + this.radius)) {
			if (this.isColliding === 0) {
				this.isColliding = 1;
				player.removeLife();
			}
		} else {
			this.isColliding = 0;
		}
	}

	this.hit = function(target) {
		if (dist(this.pos.x,this.pos.y,target.pos.x, target.pos.y) < (target.radius + this.radius)) {
			switch (this.radius) {
				case 50:
				case 35:
				case 20:
					this.split(this.radius-=15, this.points * 0.5);
				case 5:
					this.destroy();
					break;
			}
			player.points++;
			return true;
		}
		return false;
	}

	this.split = function(newRadius, newPoints) {
		for (var i = 0; i < 2; i++) {
			var asteroid = new Asteroid(asteroids.length);
			asteroid.radius = newRadius;
			asteroid.points = floor(random(5, 15));
			asteroid.pos = createVector(this.pos.x, this.pos.y);
			asteroid.velocity = createVector(random(this.velocity.x-1, this.velocity.x+1), random(this.velocity.y-1, this.velocity.y+1));
			asteroids.push(asteroid);
		}

	}

	this.destroy = function() {
		asteroids[this.element] = undefined;
	}

}