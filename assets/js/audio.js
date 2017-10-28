function Audio() {

	window.AudioContext = window.AudioContext||window.webkitAudioContext;
	this.audioPlayer = new AudioContext();

	this.gameOver = function() {
		var o = this.audioPlayer.createOscillator();
		var  g = this.audioPlayer.createGain();
		o.type = "sine";
		o.connect(g);
		o.frequency.value = 500;
		g.connect(this.audioPlayer.destination);
		o.start(0);
		setInterval(function(){
			if (o.frequency.value <= 100) {
				o.stop();
			} else {
				o.frequency.value -= 100;
			}
		}, 100);
	}

	this.winner = function() {
		var o = this.audioPlayer.createOscillator();
		var  g = this.audioPlayer.createGain();
		o.type = "sine";
		o.connect(g);
		o.frequency.value = 100;
		g.connect(this.audioPlayer.destination);
		o.start(0);
		setInterval(function(){
			if (o.frequency.value >= 500) {
				o.stop();
			} else {
				o.frequency.value += 100;
			}
		}, 100);
	}

	this.shoot = function() {
		var o = this.audioPlayer.createOscillator();
		var  g = this.audioPlayer.createGain();
		o.type = "sine";
		o.connect(g);
		o.frequency.value = 500;
		g.connect(this.audioPlayer.destination);
		o.start(0);
		setInterval(function(){
			if (o.frequency.value <= 100) {
				o.stop();
			} else {
				o.frequency.value -= 100;
			}
		}, 30);
	}

}