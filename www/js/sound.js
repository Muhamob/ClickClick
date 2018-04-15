function Sound(var listener) {
	var sound = new THREE.Audio(listener);
	var loader;
	
	var volume;
	var loop;
	var source;
}

Sound.prototype.play = function() {
	this.sound.play();
}

Sound.prototype.stop = function() {
	this.sound.stop();
}

Sound.prototype.init = function(var volume, var loop, var source) {
	this.setVolume(volume);
	this.setLoop(loop);
	this.setSource(source);

	this.loader = new THREE.AudioLoader();
	this.loader.load(source, function(buffer) {
		this.sound.setBuffer(buffer);
		this.sound.setLoop(loop);
		this.sound.setVolume(volume);
	});
}

Sound.prototype.setSound = function(var sound) {
	this.sound = sound;
}

Sound.prototype.setLoader = function(var loader) {
	this.loader = loader;
}

Sound.prototype.setVolume = function(var volume) {
	this.volume = volume;
}

Sound.prototype.setLoop = function(var loop) {
	this.loop = loop;
}

Sound.prototype.setSource = function(var source) {
	this.source = source; 
}

Sound.prototype.getSound = function() {
	return this.sound;
}

Sound.prototype.getLoader = function() {
	return this.loader;
}

Sound.prototype.getVolume = function() {
	return this.volume;
}

Sound.prototype.getLoop = function() {
	return this.loop;
}

Sound.prototype.getSource = function() {
	return this.source; 
}

