function Sound(listener) {
	this.listener = listener;
	this.sound;
	this.loader;

	this.volume;
	this.loop;
	this.source;
}

Sound.prototype.play = function() {
	this.sound.play();
}

Sound.prototype.stop = function() {
	this.sound.stop();
}

Sound.prototype.init = function(volume, loop, source) {
	this.setVolume(volume);
	this.setLoop(loop);
	this.setSource(source);

	var sound = new THREE.Audio(this.listener);

	this.loader = new THREE.AudioLoader();
	this.loader.load(source, function(buffer) {
		sound.setBuffer(buffer);
		sound.setLoop(loop);
		sound.setVolume(volume);
	});

	this.sound = sound;
}

Sound.prototype.setSound = function(sound) {
	this.sound = sound;
}

Sound.prototype.setLoader = function(loader) {
	this.loader = loader;
}

Sound.prototype.setVolume = function(volume) {
	this.volume = volume;
}

Sound.prototype.setLoop = function(loop) {
	this.loop = loop;
}

Sound.prototype.setSource = function(source) {
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
