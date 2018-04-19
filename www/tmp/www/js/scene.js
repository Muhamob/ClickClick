function Scene() {
    this.scene;
    this.camera;
    this.renderer;
    this.listener;
    this.light;

    this.upSound;
    this.downSound;
    this.openSound;
    this.closeSound;
    this.clickSound;
    this.backgroundSound;

    this.grid;
}

Scene.prototype.getScene = function(){
    return this.scene();
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

Scene.prototype.init = function() {
    this.scene = new THREE.Scene();

    this.addRenderer();
    this.addCamera();
    this.addListener();
    this.addLight();
    this.addSound(this.listener);
    this.addFog();
    this.addGrid();


	var container = document.getElementById('field');
	container.insertBefore(this.renderer.domElement, null);
}

Scene.prototype.addMesh = function(mesh){
    this.scene.add(mesh);
}

Scene.prototype.addGrid = function(){
    this.grid = new Grid(4, 4);
    this.grid.init();
    for(var i=0; i<this.grid.getCells().length; i++) {
        //console.log(this.grid.getCell(i));
        this.scene.add(this.grid.getCell(i).getMesh());
    }
}

Scene.prototype.addLight = function() {
    this.light = new THREE.HemisphereLight(0xffffff, 0xffffff, 1);
	this.light.position.set(0, 100, 0); // maybe there is another method
	this.light.castShadow = true;

    this.scene.add(this.light);
}

Scene.prototype.addListener = function() {
    this.listener = new THREE.AudioListener();
	this.camera.add(this.listener);
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

Scene.prototype.addSound = function(listener) {
    this.upSound = new Sound(listener);
	this.downSound = new Sound(listener);
	this.openSound = new Sound(listener);
	this.closeSound = new Sound(listener);
	this.clickSound = new Sound(listener);
	this.backgroundSound = new Sound(listener);
}

Scene.prototype.render = function() {
    this.renderer.render(this.scene, this.camera);
}

Scene.prototype.resizeWindow = function() {
	this.renderer.setSize(window.innerWidth, window.innerHeight);
	this.camera.aspect = window.innerWidth / window.innerHeight;
	this.camera.updateProjectionMatrix();
}

Scene.prototype.letRefreshRotation = function() {
    for (var i = 0; i < this.grid.getCells().length; i++) {
    	this.grid.getCell(i).getMesh().rotation.x = 0;
    	this.grid.getCell(i).getMesh().rotation.y = 0;
    	this.grid.getCell(i).getMesh().rotation.z = 0;
    }
}

Scene.prototype.letRefresh = function() {
	this.letRefreshRotation();

	for (var i = 0; i < this.grid.getStaticGlows().length; i++) {
		this.scene.remove(this.grid.getStaticGlow(i));
	}

	//this.grid.getStaticGlows().length = 0;
	//this.grid.getStaticGlows() = new Array();
    this.grid.setStaticGlows(new Array());
    this.grid.setOpenedCells(new Array());
	//this.grid.getOpenedCells().length = 0;
	//this.grid.getOpenedCells() = new Array();
}
