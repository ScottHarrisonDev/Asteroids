function Missile() {

	this.heading = 0;
	this.pos = createVector(player.pos.x, player.pos.y);
	this.radius = 3;

	this.show = function() {
		push();
		fill(255);
		translate(this.pos.x, this.pos.y);
		ellipse(0, 0, this.radius*2, this.radius*2);
		pop();
	}

	this.move = function() {
		var force = p5.Vector.fromAngle(this.heading);
		force.mult(5);
		this.pos.add(force);
		if (
			this.pos.x > width ||
			this.pos.y > height ||
			this.pos.x < 0 ||
			this.pos.y < 0
		) {
			player.missiles.shift();
		}
	}

}