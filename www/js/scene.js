<<<<<<< HEAD
function Scene(heightNum, widthNum) {
    this.widthNum;
    this.heightNum;
    this.grid;
    this.active = false;
    this.init(heightNum, widthNum);
}

Scene.prototype = Object.create(WindowField.prototype); // WindowField inheritance
Scene.prototype.constructor = WindowField; // WindowField constructor

Scene.prototype.init = function(heightNum, widthNum) {
    WindowField.prototype.init.apply(this);
    this.widthNum = widthNum;
    this.heightNum = heightNum;
    this.addGrid();
    this.pushActors(this.grid.getCells());
}

Scene.prototype.pushActors = function(actors) {
    for (actor of actors) {
        this.actors.push(actor);
    }
}

Scene.prototype.addGrid = function(){
    this.grid = new Grid(this.heightNum, this.widthNum);
    var dx = this.grid.dx;
    for(var i = 0; i < this.grid.getCells().length; i++) {
        this.scene.add(this.grid.getCell(i).getMesh());
    }
    this.camera.position.x = dx * (this.widthNum - 1) / 2;
=======
function Scene(height, width) {
    this.scene;
    this.camera;
    this.renderer;
    this.listener;
    this.light;

    this.height = height;
    this.width = width;
    this.grid = new Grid(height, width);

    this.audioPlayer;
}

Scene.prototype.getRenderer = function(){
    return this.renderer;
}

Scene.prototype.getScene = function(){
    return this.scene;
}

Scene.prototype.getCamera = function() {
    return this.camera;
}

Scene.prototype.getGrid = function(){
    return this.grid;
}

Scene.prototype.getLight = function(){
    return this.light;
}

Scene.prototype.getListener = function(){
    return this.listener;
}

Scene.prototype.getAudioPlayer = function() {
    return this.audioPlayer;
}

Scene.prototype.init = function() {
    this.scene = new THREE.Scene();

    this.addRenderer();
    this.addCamera();
    this.addListener();
    this.addLight();
    this.addFog();
    this.addGrid();
    this.addAudioPlayer();

	var container = document.getElementById('field');
	container.insertBefore(this.renderer.domElement, null);
}

Scene.prototype.addMesh = function(mesh){
    this.scene.add(mesh);
}

Scene.prototype.addGrid = function(){
    var dx = this.grid.init();

    for(var i=0; i<this.grid.getCells().length; i++) {
        this.scene.add(this.grid.getCell(i).getMesh());
    }

    this.camera.position.x = dx*(this.width-1)/2;
}

Scene.prototype.addLight = function() {
    this.light = new THREE.HemisphereLight(0xffffff, 0xffffff, 1);
	this.light.position.set(0, 100, 0);
	this.light.castShadow = true;

    this.scene.add(this.light);
}

Scene.prototype.addListener = function() {
    this.listener = new THREE.AudioListener();
	this.camera.add(this.listener);
}

Scene.prototype.addAudioPlayer = function() {
    this.audioPlayer = new AudioPlayer(this.listener);
    //track = "background";
    this.audioPlayer.addTrack(TRACKS.BACKGROUND.KEY, TRACKS.BACKGROUND.VOLUME, TRACKS.BACKGROUND.LOOP, TRACKS.BACKGROUND.DIR);
    this.audioPlayer.addTrack(TRACKS.CLICK.KEY, TRACKS.CLICK.VOLUME, TRACKS.CLICK.LOOP, TRACKS.CLICK.DIR);
}

Scene.prototype.addCamera = function() {
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 100);
    this.camera.rotation.x = -1;
    this.camera.position.z = 10;
    this.camera.position.y = 55;
    this.camera.position.x = 30;

    this.scene.add(this.camera);
}

Scene.prototype.addFog = function() {
    this.scene.fog = new THREE.Fog(0xffffff, 0.003, 250);
}

Scene.prototype.addRenderer = function() {
    this.renderer = new THREE.WebGLRenderer({
		antialias: true,
		alpha: true
	});
	this.renderer.setSize(window.innerWidth, window.innerHeight);
}

Scene.prototype.render = function() {
    this.renderer.render(this.scene, this.camera);
}

Scene.prototype.letRefreshRotation = function() {
    for (var i = 0; i < this.grid.getCells().length; i++) {
    	this.grid.getCell(i).getMesh().rotation.x = 0;
    	this.grid.getCell(i).getMesh().rotation.y = 0;
    	this.grid.getCell(i).getMesh().rotation.z = 0;
        this.grid.getCell(i).getMesh().position.y = 0;
    }
}

Scene.prototype.letRefresh = function() {
	this.letRefreshRotation();

    for (var i = 0; i < this.grid.getGlows().length; i++) {
		this.scene.remove(this.grid.getGlow(i).getMesh());
	}

    this.grid.setGlows(new Array());
    this.grid.setOpenedCells(new Array());
>>>>>>> 4a6da7fd55ba298eb8dba9545568de5db70df53a
}
