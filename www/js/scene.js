function Scene() {
    var scene;
    var camera;
    var renderer;
    var listener;
    var light;
}

Scene.prototype.init = function() {
    this.addScene();
	//this.addCell();

	this.animate();

	document.addEventListener('mousedown', mouseDown);
	document.addEventListener('mousemove', mouseMove);
	window.addEventListener('resize', resizeWindow);
}

Scene.prototype.setLight = function(skyColorHex=0xffffff, groundColorHex=0xffffff,
    intensity=1, position=(0, 100, 0)) {
    this.light = new THREE.HemisphereLight(skyColorHex, groundColorHex, intensity);
	this.light.position.set(position[0], position[1], position[2]); // maybe there is another method
	this.light.castShadow = true;
}

Scene.prototype.setSound = function() {
    // Not Implemented
    this.listener = new THREE.AudioListener();
	camera.add(listener);
    sound = new Sound(listener)
}

Scene.prototype.setCamera = function() {
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 100);
	this.camera.add(this.listener);
    this.camera.rotation.x = -1;
    this.camera.position.z = 10;
    this.camera.position.y = 55;
    this.camera.position.x = 30;
}

Scene.prototype.setFog = function() {
    this.scene.fog = new THREE.Fog(0xffffff, 0.003, 250);
}

Scene.prototype.setRenderer = function() {
    this.renderer = new THREE.WebGLRenderer({
		antialias: true,
		alpha: true
	});
	this.renderer.setSize(window.innerWidth, window.innerHeight);
}

Scene.prototype.addScene = function() {
    // init global variables
    this.scene = new THREE.Scene();
    this.listener = new THREE.AudioListener();
    this.setCamera();
    this.setRenderer();
    this.setLight();


    // sound with class from Bak, still not Implemented
    sound = new Sound(this.listener)
	//sound without classes
	//  listener = new THREE.AudioListener();
	// camera.add(listener);
    //
	// up_sound = new THREE.Audio(listener);
	// down_sound = new THREE.Audio(listener);
	// open_sound = new THREE.Audio(listener);
	// close_sound = new THREE.Audio(listener);
	// click_sound = new THREE.Audio(listener);
	// background_sound = new THREE.Audio(listener);
    //
	// up_audio_loader = new THREE.AudioLoader();
	// up_audio_loader.load('sounds/up.mp3', function(buffer) {
	// 	up_sound.setBuffer(buffer);
	// 	up_sound.setVolume(0.3);
	// });
    //
	// down_audio_loader = new THREE.AudioLoader();
	// down_audio_loader.load('sounds/down.mp3', function(buffer) {
	// 	down_sound.setBuffer(buffer);
	// 	down_sound.setVolume(0.3);
	// });
    //
	// background_audio_loader = new THREE.AudioLoader();
	// background_audio_loader.load('sounds/background.mp3', function(buffer) {
	// 	background_sound.setBuffer(buffer);
	// 	background_sound.setLoop(true);
	// 	background_sound.setVolume(0.5);
	// 	background_sound.play();
	// });
    //
	// open_audio_loader = new THREE.AudioLoader();
	// open_audio_loader.load('sounds/open.mp3', function(buffer) {
	// 	open_sound.setBuffer(buffer);
	// 	open_sound.setVolume(0.3);
	// });
    //
	// close_audio_loader = new THREE.AudioLoader();
	// close_audio_loader.load('sounds/close.mp3', function(buffer) {
	// 	close_sound.setBuffer(buffer);
	// 	close_sound.setVolume(0.3);
	// });
    //
	// click_audio_loader = new THREE.AudioLoader();
	// click_audio_loader.load('sounds/click.mp3', function(buffer) {
	// 	click_sound.setBuffer(buffer);
	// 	click_sound.setVolume(0.3);
	// });

	var container = document.getElementById('field');
	container.insertBefore(this.renderer.domElement, null);

	this.scene.add(this.light);
    this.scene.add(this.camera);
    this.scene.setFig();
}
