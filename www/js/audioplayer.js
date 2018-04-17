function AudioPlayer(listener) {
    this.listener;
    this.tracks;
    this.init(listener);
}

AudioPlayer.prototype.init = function(listener) {
    this.listener = listener;
    this.tracks = new Map();
}

AudioPlayer.prototype.addTrack = function(key, volume, loop, source) {
    var sound = new Sound(this.listener);
    sound.init(volume, loop, source);

    this.tracks.set(key, sound);
}

AudioPlayer.prototype.play = function(key) {
    this.tracks.get(key).play();
}

AudioPlayer.prototype.stop = function(key) {
    this.tracks.get(key).stop();
}
